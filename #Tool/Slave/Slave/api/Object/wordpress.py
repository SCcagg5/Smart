import subprocess
import uuid
import os
import time
import requests

api_domain =   str(os.getenv('API_DOMAIN', None))
api_id =       str(os.getenv('API_ID', None))
email =        str(os.getenv('LETSENCRYPT_EMAIL', None))

class wordpress:
    def __init__(self):
        self.path = "/home/base/wordpress"
        self.projects = "/home/project"

    def new(self, data):
        self.id = "smrt" + str(uuid.uuid4()).replace('-', '')
        conf = self.__config()
        url = self.id + "."  + api_id + "." + api_domain
        commands = [
                    ["cp", self.path, self.projects + '/' + self.id, "-r"],
                    ["echo", conf, ">", self.projects + '/' + self.id + "/.env"],
                    ["echo", conf, ">", self.projects + '/' + self.id + "/sample.env"],
                    ["cat", self.projects + '/' + self.id + "/docker-compose.template.yml", "|", 'sed -e "s/{{ID}}/' + self.id + '/g" >',  self.projects + '/' + self.id + "/docker-compose.yml" ],
                    ["cd", self.projects + '/' + self.id, "&&", "docker-compose", "up", "-d", "--build"]
                   ]
        res = []
        for cmd in commands:
            c = " ".join(cmd)
            proc = subprocess.Popen([c], stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding = 'ascii', shell=True)
            (out, err) = proc.communicate()
            out = out.split('\n')[:-1]
            res.append({"cmd": c, "out": None if len(out) == 0 else out})
            if proc.poll() != 0:
                return [False, "Command `"+ c + "` results in `" + (err.decode("utf-8") if isinstance(err, (bytes, bytearray)) else err)[:-1] + "`", 500]
        for _ in range(30):
            try:
                r = requests.get("https://" + url)
                if str(r.status_code) == "200":
                    break;
            except:
                pass
            time.sleep(3)
        return [True, {"url": "https://" + url, "logs": res}, None]

    def __config(self):
        conf = "\'V_DB_NAME={name}\nV_DB_USER={db_user}\nV_DB_PASSWORD={db_pass}\nV_WP_TABLE_PREFIX={prefix}\nV_VIRTUAL_HOST={vhost}\nV_VIRTUAL_PORT=80\nV_LETSENCRYPT_EMAIL={email}\nID={id}\n\'".format(name=uuid.uuid4(),
                          db_user=uuid.uuid4(),
                          db_pass=uuid.uuid4(),
                          prefix="wp",
                          vhost=self.id + "." + api_id + "." + api_domain,
                          email=email,
                          id=self.id)
        return conf
