import uuid
import time
from datetime import date
from .sql import sql
from .users import user

class contacter:
    def __init__(self, usr_id = -1, contacter_id = -1):
        self.usr_id = str(usr_id)
        self.contacter_id = str(contacter_id)

    def create(self, name):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        succes = sql.input("INSERT INTO `contacter` (`id`, `name`, `user_id`, `date`) VALUES (%s, %s, %s, %s)", \
          (id, name, self.usr_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": res[0][0]}, None]

    def check_exist(self):
        res = sql.get("SELECT `id` FROM `contacter` WHERE id = %s", (self.contacter_id, ))
        if len(res) != 1:
            return [False, "Invalid contacter ID", 404]
        return [True, {"id": res[0][0]}, None]

    def infos(self):
        res = sql.get("SELECT `contacter`.`name`, `user`.`email`, `contacter`.`date` FROM `contacter` INNER JOIN user ON `contacter`.user_id = `user`.id WHERE `contacter`.id = %s", (self.contacter_id, ))
        if len(res) != 1:
            return [False, "Invalid contacter ID", 404]
        return [True, {"name": res[0][0], "admin": res[0][1], "date": res[0][2]}, None]

    def check_user(self):
        res = sql.get("SELECT `id` FROM `contacter_user` WHERE contacter_id = %s AND user_id = %s", (self.contacter_id, self.usr_id, ))
        if len(res) != 1:
            return [False, "User hasn't access to this contacter", 404]
        return [True, {"access_id": res[0][0]}, None]

    def create_user(self, email, role):
        if role not in ["admin", "user"]:
            return [False, "role is not correct 'admin' or 'user'", 400]
        role = {"admin": 1, "user": 0}[role]
        user_id = user.fromemail(email)
        table = "contacter_user"
        if not user_id:
            user_id = email
            table = "contacter_user_buff"
        elif user_id == self.usr_id:
            return [False, "Can't share to yourself", 401]
        elif len(sql.get("SELECT `id` FROM `contacter_user` WHERE user_id = %s", (user_id, ))) != 0:
            return [False, "User already invited", 401]
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        succes = sql.input("INSERT INTO `" + table + "` (`id`, `contacter_id`, `user_id`, `role`, `shared_by`, `date`) VALUES (%s, %s, %s, %s, %s, %s)", \
          (id, self.contacter_id, user_id, role, self.usr_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": res[0][0]}, None]

    def update_formation(formations):
        if not isinstance(formations, dict):
            return [False, "Formations should be a array", 400]
        keep = ["start", "end", "name", "id", "description", "place"]
        tmp = []
        for i in keep:
            if i not in formations:
                return [False, "Invalid syntax", 400]
            else:
                tmp[i] = str(formations[i])
        if not isinstance(formations["start"], int) and formations["start"] < 0:
            return [False, "Invalid start time"]
        if not isinstance(formations["end"], int) and formations["end"] <= formations["start"] or formation["end"] == -1:
            return [False, "Invalid end time", 400]
        if formations["name"] is None and formations["id"] is None:
            return [False, "Name and Id cannot be Null", 400]
        if formations["name"] is not None and formations["id"] is not None:
            return [False, "Should provide a name OR an id, not both", 400]
        id = str(uuid.uuid4())
        succes = sql.input("INSERT INTO `contacter_user_form` (`id`, `contacter_id`, `user_id`, `start`, `end`, `place`, `formation_name`, `formation_id`, `description`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", \
          (id, self.contacter_id, self.usr_id, tmp["start"], tmp["end"], tmp["place"], formations["name"], formations["id"], formations["description"]))
        if not succes:
            return [False, "data input error", 500]
        return [True, {}, None]

    def remove_formation(id_formation):
        if not self.check_form(id_formation):
            return [False, "Invalid rights", 403]
        succes = sql.input("DELETE FROM `contacter_user_form` WHERE `contacter_user_form`.`id` = %s AND `contacter_user_form`.`user_id` = %s AND `contacter_user_form`.`contacter_id`",
         (id_formation, self.usr_id, self.contacter_id))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": id_folder}, None]

    def check_form(id_formation):
        res = sql.input("SELECT `id` FROM `contacter_user_form` WHERE `contacter_user_form`.`id` = %s AND `contacter_user_form`.`user_id` = %s AND `contacter_user_form`.`contacter_id`",
         (id_formation, self.usr_id, self.contacter_id))
        if len(res) > 0:
            return True
        return False
