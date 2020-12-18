import requests
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import smtplib
import os
import html
from datetime import datetime
import random
import string

smtp_user =     "system@smartdom.ch"
smtp_pass =     ""
smtp_server =   "mail.smartdom.ch"
smtp_port =   "465"
url = "https://api.smartdom.ch/"
adm_tok = ""

emails = [""]
ged_id = "896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9"
toshare = ["4376a4bb-d5ec-441f-8868-f9ce96077420", "a0bbcad0-ab99-460f-8c70-5bfa98cca144"]
rights = {"administrate": True, "share": True, "edit": True, "read": True}
path = "../Template/"



class Mailer():
    def __init__(self):
        """Open connection to the mail server"""
        self.sender = smtp_user
        self.password = smtp_pass
        self.server = smtplib.SMTP_SSL(smtp_server, smtp_port)
        self.server.login(self.sender, self.password)
        self.msg = MIMEMultipart()


    def new(self, email, password, oneclick, to_list=None):
        """Send a message to the recipient"""
        if to_list is None:
            to_list = [email]
        file = open(path + 'new_account.html',mode='r')
        email_html = file.read().split("</head>")
        file.close()
        header = email_html[0] + "</head>"
        body = email_html[1]
        self.html = header + body.format(email=html.escape(email), password=html.escape(password), oneclick=oneclick)
        self.to_list = to_list
        self.msg['Subject'] = "Welcome on smartdom"

        images = ["logoSmartDom.75a949e1-1_1.jpeg",
                  "Hero_image_app.png", "Working_with_team.png",
                  "App_Store_Badge_US_Black.png",
                  "Google_Play_Badge_US.png", "linkedin2x.png"]
        self.__attach(images)

        self.__send()
        return [True, {}, None]

    def __attach(self, images):
        for i in images:
            fp = open(path + "images/"+ i, 'rb')
            msgImage = MIMEImage(fp.read())
            fp.close()
            msgImage.add_header('Content-ID', '<' + i.split('.')[0] + '>')
            self.msg.attach(msgImage)

    def __send(self):
        self.message = ""
        self.msg['From'] = self.sender
        self.msg['To'] = ", ".join(self.to_list)
        self.msg.attach(MIMEText(self.html, 'html'))
        self.msg.attach(MIMEText(self.message, 'plain'))
        self.server.send_message(self.msg, self.msg['From'], self.to_list)
        print(f"Sent to {self.msg['To']}")
        self.__close()
        return


    def __close(self):
        """Close the server connection"""
        self.server.quit()


def send(headers, data, url):
    ret =  json.loads(requests.request("POST", url, headers=headers, data = json.dumps(data)).text.encode('utf8'))
    if not ret['succes']:
        print(ret['error'])
    return ret


def random_pass(length=10):
    letters = string.ascii_letters + string.digits
    result_str = [random.choice(letters) for i in range(length)]
    result_str[random.randint(0, length - 1)]= random.choice(string.punctuation)
    result_str[random.randint(0, length - 1)]= random.choice(string.punctuation)
    return ''.join(result_str)

def addemails(emails):
    for email in emails:
        password = random_pass()
        payload = {"pass":"password"}
        headers = {
          'Content-Type': 'application/json'
        }
        response = send(headers, payload, url + 'login/')
        headers['token'] = response['data']['token']


        payload = {
            "email": email,
            "password1": password,
            "password2": password
        }
        if send(headers, payload, url + 'signup/')['succes']:
            Mailer().new(email, password, "https://oalegal.smartdom.ch/login/?user=" + email.split('@')[0])
            print(f"{email} > {password}")
            headers['usrtoken'] = adm_tok
            payload = {
                "email": email,
                "role": "admin"
            }

            send(headers, payload, url + f'ged/{ged_id}/adduser')

            payload = {
                "to": email,
                "access": rights
            }
            for i in toshare:
                send(headers, payload, url + f"ged/{ged_id}/doc/{i}/share")

addemails(emails)
