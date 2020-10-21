import subprocess
import uuid
import os
import time
import requests
from .h_service import service

api_domain =   str(os.getenv('API_DOMAIN', None))
api_id =       str(os.getenv('API_ID', None))
email =        str(os.getenv('LETSENCRYPT_EMAIL', None))

class wordpress(service):
    def __init__(self, user_id, id = None):
        self.path = "../../Sources/wordpress"
        self.projects = "../../Project"
        self.id = id
        self.user_id = user_id

    def new(self, hostnames):
        self.id = "smrt" + str(uuid.uuid4()).replace('-', '')
        url = self.url()
        conf = self.__config(hostnames)
        res = self.try_create(hostnames)
        if not res[0]:
            return res
        commands = [
                    ["ls"],
                    ["cp", self.path, self.projects + '/' + self.id, "-r"],
                    ["echo", conf, ">", self.projects + '/' + self.id + "/.env"],
                    ["echo", conf, ">", self.projects + '/' + self.id + "/sample.env"],
                    ["cat", self.projects + '/' + self.id + "/docker-compose.template.yml", "|", 'sed -e "s/{{ID}}/' + self.id + '/g" >',  self.projects + '/' + self.id + "/docker-compose.yml" ],
                    ["cd", self.projects + '/' + self.id, "&&", "docker-compose", "up", "-d", "--build"]
                   ]
        test = ["cd", self.projects + '/' + self.id, "&&", "docker-compose", "up", "-d", "--build"]
        res = self.command(commands)
        if not res[0]:
            return res
        logs = res[1]
        res = self.suc_create()
        if not res[0]:
            return res
        return [True, {"url": ["https://" + url for url in self.host(hostnames)], "logs": logs}, None]

    def __config(self, hosts = []):
        hosts = self.host(hosts)
        print(hosts)
        conf = "\'V_DB_NAME={name}\nV_DB_USER={db_user}\nV_DB_PASSWORD={db_pass}\nV_WP_TABLE_PREFIX={prefix}\nV_VIRTUAL_HOST={vhost}\nV_VIRTUAL_PORT=80\nV_LETSENCRYPT_EMAIL={email}\nID={id}\n\'".format(name=uuid.uuid4(),
                          db_user=uuid.uuid4(),
                          db_pass=uuid.uuid4(),
                          prefix="wp",
                          vhost=",".join(hosts),
                          email=email,
                          id=self.id)
        return conf
