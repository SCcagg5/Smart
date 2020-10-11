import subprocess
import uuid
import os
import time
import requests
import uuid
from .sql import sql

api_domain =   str(os.getenv('API_DOMAIN', None))
api_id =       str(os.getenv('API_ID', None))
email =        str(os.getenv('LETSENCRYPT_EMAIL', None))

class service:
        def command(self, commands):
            res = []
            for cmd in commands:
                c = " ".join(cmd)
                proc = subprocess.Popen([c], stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding = 'ascii', shell=True)
                (out, err) = proc.communicate()
                out = out.split('\n')[:-1]
                res.append({"cmd": c, "out": None if len(out) == 0 else out})
                if proc.poll() != 0:
                    return [False, "Command `"+ c + "` results in `" + (err.decode("utf-8") if isinstance(err, (bytes, bytearray)) else err)[:-1] + "`", 500]
            return [True, {"logs": res}, 200]

        def try_create(self, hostnames):
            succes = sql.input("INSERT INTO `service` (`id`, `type`, `created`, `last_up`, `user`) VALUES (%s , %s, %s, NULL, %s)", \
            (self.id, self.__class__.__name__, self.time(), self.user_id))
            if not succes:
                return [False, "data input error", 500]
            for i in self.host(hostnames):
                id = str(uuid.uuid4())
                succes = sql.input("INSERT INTO `service_hostname` (`id`, `service_id`, `hostname`, `date`) VALUES (%s , %s, %s, %s)", \
                (id, self.id, str(i), self.time()))
                if not succes:
                    return [False, "data input error", 500]
            return [True, {}, 200]

        def suc_create(self):
            succes = sql.input("UPDATE `service` SET `last_up` = %s WHERE `service`.`id` = %s", \
            (self.time(), self.id))
            if not succes:
                return [False, "data input error", 500]
            return [True, {}, 200]

        def ping(self):
            https = False
            for _ in range(30):
                try:
                    r = requests.get("https://" + url)
                    if str(r.status_code) == "200":
                        https = True
                        break;
                except:
                    pass
                time.sleep(3)
            return [True, {"https" : https }, None]

        def url(self):
            return self.id + "."  + api_id + "." + api_domain

        def time(self):
            return str(int(round(time.time() * 1000)))

        def host(self, add_hosts = []):
            hosts = [self.id + "." + api_id + "." + api_domain]
            hosts.extend(add_hosts)
            return hosts
