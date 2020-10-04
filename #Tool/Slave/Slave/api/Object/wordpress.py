import subprocess
import uuid
import os

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
        commands = [
                    ["cp", self.path, self.projects + '/' + self.id, "-r"],
                    ["echo", conf, ">", self.projects + '/' + self.id + "/.env"],
                    ["echo", conf, ">", self.projects + '/' + self.id + "/sample.env"],
                    ["cd", self.projects + '/' + self.id, "&&", "docker-compose", "up", "-d"]
                   ]
        res = []
        for cmd in commands:
            c = " ".join(cmd)
            proc = subprocess.Popen([c], stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
            (out, err) = proc.communicate()
            res.append(out)
            if err != b'':
                return [False, "Command `"+ c + "` results in `" + err.decode('utf-8')[:-1] + "`", 500]
        return [True, {"url": self.id + "."  + api_id + "." + api_domain, "logs": res}, None]

    def __config(self):
        conf = "\'V_DB_NAME={name}\nV_DB_USER={db_user}\nV_DB_PASSWORD={db_pass}\nV_WP_TABLE_PREFIX={prefix}\nV_VIRTUAL_HOST={vhost}\nV_VIRTUAL_PORT=80\nV_LETSENCRYPT_EMAIL={email}\nID={id}\n\'".format(name=uuid.uuid4(),
                          db_user=uuid.uuid4(),
                          db_pass=uuid.uuid4(),
                          prefix="wp",
                          vhost=self.id + "."  + api_id + "." + api_domain,
                          email=email,
                          id=self.id)
        return conf
