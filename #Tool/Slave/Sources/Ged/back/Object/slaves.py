import requests
import json
import os

Master =   str(os.getenv('MASTER_URL', None))
Password = str(os.getenv('MASTER_PASS', None))

class slave:
    def __init__(self, token = None, usr_token = None):
        self.mastoken = None
        self.token = token
        self.usrtoken = usr_token
        self.url = Master + '/'

    def __connect(self):
        url = self.url + "slave"
        payload = {"pass": Password}
        headers = {'Content-Type': 'application/json'}
        res = requests.request("POST",
            url, headers=headers,
            data =json.dumps(payload))
        ret = response(json.loads(res.text.encode('utf8'))).ret()
        if not ret[0]:
            return [False, "Error from Master server", 500]
        self.mastoken = ret[1]['mastoken']
        return [True, None, None]

    def __send(self, url, data={}, type="GET", header={}, cookie = False):
        if self.mastoken is None:
            ret = self.__connect()
            if not ret[0]:
                return ret
        headers = {'Content-Type': 'application/json'}
        headers['mastoken'] = self.mastoken
        if self.token is not None:
            headers['token'] = self.token
        if self.usrtoken is not None:
            headers['usrtoken'] = self.usrtoken
        for i in header:
            headers[i] = header[i]
        if type == "GET":
            res = requests.request("GET", self.url + url, headers=headers)
        else:
            res = requests.request(type, self.url + url, headers=headers, data=json.dumps(data))
        ret = response(json.loads(res.text.encode('utf8'))).ret()
        if cookie and ret[0]:
            ret.append(ret[1])
        return ret

    def getauth(self, password):
        url = "slave/auth"
        payload = {"pass": password}
        return self.__send(url, payload, "POST", {}, True)

    def checkauth(self, token):
        url = "slave/auth"
        self.token = token
        return self.__send(url, {}, "GET")

    def signin(self, login, password):
        url = "slave/auth/user"
        payload = { "email": login, "password1": password}
        return self.__send(url, payload, "POST", {}, True)

    def signup(self, login, password1, password2):
        url = "slave/auth/user/new"
        payload = { "email": login, "password1": password1, "password2": password2}
        return self.__send(url, payload, "POST", {}, True)

    def authuser(self, token, usrtoken):
        url = "slave/auth/user"
        self.usrtoken = usrtoken
        return self.__send(url, {}, "GET")

    def check_user(self, service_id):
        url = f"slave/service/{service_id}/user"
        return self.__send(url, {}, "GET")

    def add_user(self, service_id):
        url = f"slave/service/{service_id}/user"
        return self.__send(url, {}, "POST")

    def getbyemail(self, email):
        url = f"slave/user/email/{email}"
        return self.__send(url, {}, "GET")


class response:
    def __init__(self, ret):
        self.data = [
                     ret['succes'],
                     ret['data'] if ret['succes'] else ret['error'],
                     ret['status']
                    ]

    def ret(self):
        return self.data
