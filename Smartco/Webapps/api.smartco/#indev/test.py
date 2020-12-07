# -*- coding: utf-8 -*-

# The fault subcode “mss:402” indicates that the user's Mobile ID PIN is blocked.
# Solution hint: “A new activation is required. Please visit the Mobile ID Portal of your Mobile Network
# Operator and follow the PIN forgotten link (#Faultcode user assistance URL#)”

# https://www.mobileid.ch/fr/login



import base64
import codecs
import hashlib
import shutil
import subprocess
import tempfile

import PyPDF2
from pkg_resources import resource_filename

class PDF(object):
    """A container for a PDF file to be signed and the signed version."""

    def __init__(self, in_filename, prepared=False):
        self.in_filename = in_filename
        """Filename of the PDF to be treated."""

        _out_fp, _out_filename = tempfile.mkstemp(suffix=".pdf")
        self.out_filename = _out_filename
        """Filename of the output, signed PDF."""

        shutil.copy(self.in_filename, self.out_filename)

        self.prepared = prepared
        """Is the PDF prepared with an empty signature?"""

    @staticmethod
    def _java_command():
        java_dir = resource_filename(__name__, 'empty_signer')
        return [
            'java',
            '-cp', '.:vendor/itextpdf-5.5.9.jar',
            '-Duser.dir={}'.format(java_dir),
            'EmptySigner',
        ]

    @classmethod
    def prepare_batch(cls, pdfs):
        """Add an empty signature to each of pdfs with only one java call."""
        pdfs_to_prepare = filter(lambda p: not p.prepared, pdfs)
        subprocess.check_call(
            cls._java_command() +
            [pdf.out_filename for pdf in pdfs_to_prepare]
        )
        for pdf in pdfs_to_prepare:
            pdf.prepared = True

    def prepare(self):
        """Add an empty signature to self.out_filename."""
        if not self.prepared:
            subprocess.check_call(
                self._java_command() + [self.out_filename],
            )
            self.prepared = True

    def digest(self):
        reader = PyPDF2.PdfFileReader(self.out_filename)
        sig_obj = None

        for generation, idnums in reader.xref.items():
            for idnum in idnums:
                if idnum == 0:
                    break
                pdf_obj = PyPDF2.generic.IndirectObject(idnum, generation,
                                                        reader).getObject()
                if (
                    isinstance(pdf_obj, PyPDF2.generic.DictionaryObject) and
                    pdf_obj.get('/Type') == '/Sig'
                ):
                    sig_obj = pdf_obj
                    break

        self.byte_range = sig_obj['/ByteRange']

        h = hashlib.sha256()
        with open(self.out_filename, 'rb') as fp:
            for start, length in (self.byte_range[:2], self.byte_range[2:]):
                fp.seek(start)
                h.update(fp.read(length))

        result = base64.b64encode(h.digest())
        return result

    def write_signature(self, signature):
        with open(self.out_filename, "rb+") as fp:
            fp.seek(self.byte_range[1] + 1)
            fp.write(codecs.encode(signature, 'hex'))

f = open("test.pdf", "rb")
data = f.read()
f.close()
pdf = PDF('test.pdf')
pdf.prepare()

import requests
import json
import base64, sys, hashlib
from time import sleep
import codecs

payload = 	{
	"SignRequest":{
		"@RequestID":"ais.smartco.ch",
		"@Profile":"http://ais.swisscom.ch/1.1",
		"OptionalInputs":{
			"ClaimedIdentity":{
				"Name":"ais-90days-trial-withRAservice:OnDemand-Advanced"
			},
			"SignatureType":"urn:ietf:rfc:3369",
			"AdditionalProfile":[
				"http://ais.swisscom.ch/1.0/profiles/ondemandcertificate",
				"urn:oasis:names:tc:dss:1.0:profiles:asynchronousprocessing"
			],
			"sc.CertificateRequest":{
				"sc.DistinguishedName":"cn=TEST Eliot Courtel, givenname=Eliot Courtel, surname=Eliot, c=CH, emailaddress=eliot.courtel@gmail.com",
				"sc.StepUpAuthorisation":{
					"sc.Phone":{
						"sc.MSISDN":"41795281046",
						"sc.Message":"Would you like to sign the document ?",
						"sc.Language":"EN"
					}
				}
			}
		},
		"InputDocuments":{
			"DocumentHash":{
				"@ID":"test.pdf",
				"dsig.DigestMethod":{
					"@Algorithm":"http://www.w3.org/2001/04/xmlenc#sha512"
				},
				"dsig.DigestValue": pdf.digest()
			}
		}
	}
}

r = requests.post('https://ais.swisscom.com/AIS-Server/rs/v1.0/sign',
                   cert=('./smartco.crt', './smartco.key'),
                   data=json.dumps(payload),
                   headers= {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8'
                   })
if r.status_code != 200:
    print("error")
sign = json.loads(r.text)['SignResponse']['OptionalOutputs']['async.ResponseID']

sleep(5)
while True:
    sleep(1)
    r = requests.post('https://ais.swisscom.com/AIS-Server/rs/v1.0/pending',
                       cert=('./smartco.crt', './smartco.key'),
                       data=json.dumps({
                            "async.PendingRequest": {
                                "@RequestID": "async.PendingRequest",
                                 "@Profile": "http://ais.swisscom.ch/1.1",
                                 "OptionalInputs": {
                                     "ClaimedIdentity": {
                                         "Name": "ais-90days-trial-withRAservice:OnDemand-Advanced"
                                     },
                                     "async.ResponseID": sign
                                     }
                                 }
                        }),
                       headers= {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json;charset=utf-8'
                       })
    r = json.loads(r.text)
    if r["SignResponse"]["Result"]["ResultMajor"] == "urn:oasis:names:tc:dss:1.0:resultmajor:Success":
        signature = base64.b64decode(r["SignResponse"]['SignatureObject']['Base64Signature']['$'])
        pdf.write_signature(signature)
        f = open(pdf.out_filename, "rb")
        data = f.read()
        f.close()
        print(base64.b64encode(data).decode())
        break;
    elif r["SignResponse"]["Result"]["ResultMajor"] == "http://ais.swisscom.ch/1.0/resultmajor/SubsystemError":
        print("pas ok")
        break;
    else:
        print("running")
