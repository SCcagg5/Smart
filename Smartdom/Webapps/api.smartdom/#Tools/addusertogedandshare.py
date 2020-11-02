import requests
import json

url = "https://api.smartdom.ch/"

adm_tok = ""

email = ""
password = ""

ged_id = "896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9"
toshare = []
rights = {"administrate": True, "share": True, "edit": True, "read": True}

def send(header, data, url):
    ret =  json.loads(requests.request("POST", url, headers=headers, data = json.dumps(data)).text.encode('utf8'))
    if not ret['succes']:
        print(ret['error'])
    return ret

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
send(headers, payload, url + 'signup/')


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

print(f"{email}:{password}")
