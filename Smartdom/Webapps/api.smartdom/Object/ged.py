import requests
import os
import uuid
import time
import base64
from .sql import sql
from .users import user

class folder:
    def __init__(self, usr_id = -1, ged_id = -1):
        self.usr_id = str(usr_id)
        self.ged_id = str(ged_id)


    def new(self, name, folder_id):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        if folder_id is not None and not folder.exist(folder_id):
            return [False, "folder_id does not exist", 400]
        if not self.is_proprietary(folder_id) and folder_id is not None:
            return [False, "Invalid rights", 403]
        succes = sql.input("INSERT INTO `ged_folder` (`id`,`ged_id`, `user_id`, `name`, `inside`, `date`) VALUES (%s, %s, %s, %s, %s, %s)", \
        (id, self.ged_id, self.usr_id, name, folder_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {}, None]

    def share(self, email, folder_id, access):
        if not self.is_proprietary(folder_id) and not self.is_sharer(folder_id):
            return [False, "Can't share this file, invalid rights", 403]
        if "administrate" not in access or "share" not in access or "edit" not in access or "read" not in access:
            return [False, "Invalid access, should contain 'share', 'edit', 'read', 'administrate'", 400]
        if not isinstance(access["administrate"], bool) or not isinstance(access["edit"], bool) or not isinstance(access["read"], bool) or not isinstance(access["administrate"], bool):
            return [False, "Value of index contained in access should be boolean", 400]
        if access["administrate"]:
            access["edit"] = True
        if access["edit"]:
            access["read"] = True
        user_id = user.fromemail(email)
        table = "ged_share_folder"
        if not user_id:
            user_id = email
            table = "ged_share_folder_buff"
        elif user_id == self.usr_id:
            return [False, "Can't share to yourself", 401]
        share_id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        sql.input("UPDATE  `" + table + "` SET active = 0 WHERE user_id = %s AND folder_id = %s", (user_id, folder_id))
        succes = sql.input("INSERT INTO `" + table + "` (`id`, `ged_id`, `user_id`, `folder_id`, `can_administrate`, `can_share`, `can_edit`, `can_read`, `date`, `shared_by`, `active`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", \
        (share_id, self.ged_id, user_id, folder_id, access["administrate"], access["share"], access["edit"], access["read"], date, self.usr_id, True))
        if not succes:
            return [False, "data input error", 500]
        return [True, {}, None]

    def exist(folder_id):
        res = sql.get("SELECT `id` FROM `ged_folder` WHERE id = %s", \
        (folder_id, ))
        return True if len(res) > 0 else False

    def sharedcontent(self, folder_id = None, name = None, date = None):
        ret = {"id": folder_id, "name": name, "date": date, "Content": {"files": [], "folders": []}}
        if folder_id is not None:
            if not self.is_reader(folder_id):
                return {}
            res = sql.get("SELECT ged_folder.id, ged_folder.name, ged_folder.date, user.`email`, user.`id` FROM `ged_folder` INNER JOIN `user` ON `ged_folder`.`user_id` = `user`.id WHERE ged_folder.id = %s", \
            (folder_id, ))
            if len(res) != 0:
                ret = {"id": res[0][0], "name": res[0][1], "date": res[0][2], "proprietary": res[0][3], "sharing_date": None, "Content": {"files": [], "folders": []},
                "rights": {
                        "read": self.is_reader(res[0][0]),
                        "edit": self.is_editor(res[0][0]),
                        "share": self.is_sharer(res[0][0]),
                        "administrate": self.is_admin(res[0][0])
                        }
                }
            files = sql.get("SELECT `id`, `name`, `type`, `date` FROM `ged_file` WHERE inside = %s", \
            (folder_id, ))
            for i2 in files:
                ret["Content"]["files"].append({
                "id": i2[0], "name": i2[1], "type": i2[2], "date": i2[3],
                "rights": {
                        "read": file(self.usr_id).is_reader(i2[0]),
                        "edit": file(self.usr_id).is_editor(i2[0]),
                        "share": file(self.usr_id).is_sharer(i2[0]),
                        "administrate": file(self.usr_id).is_admin(i2[0])
                        }
                })
            folders = sql.get("SELECT `id`, `name`, `date` FROM `ged_folder` WHERE inside = %s", \
            (folder_id, ))
            for i2 in folders:
                ret["Content"]["folders"].append({
                "id": i2[0], "name": i2[1], "date": i2[2],
                "rights": {
                        "read": self.is_reader(i2[0]),
                        "edit": self.is_editor(i2[0]),
                        "share": self.is_sharer(i2[0]),
                        "administrate": self.is_admin(i2[0])
                        }
                })
            return ret
        else:
            files = sql.get("SELECT ged_file.`id`, `name`, ged_file.type, ged_file.`date`, user.`email`, ged_share_file.`date` FROM `ged_share_file` INNER JOIN `ged_file` ON `ged_share_file`.`file_id` = `ged_file`.`id` INNER JOIN `user` ON `ged_file`.`user_id` = `user`.id WHERE active IS TRUE AND ged_share_file.user_id = %s", \
            (self.usr_id, ))
            for i2 in files:
                ret["Content"]["files"].append({
                "id": i2[0], "name": i2[1], "type": i2[2], "date": i2[3], "proprietary": i2[4], "sharing_date": i2[5],
                "rights": {
                        "read": file(self.usr_id).is_reader(i2[0]),
                        "edit": file(self.usr_id).is_editor(i2[0]),
                        "share": file(self.usr_id).is_sharer(i2[0]),
                        "administrate": file(self.usr_id).is_admin(i2[0])
                        }
                })
            folders = sql.get("SELECT ged_folder.`id`, `name`, ged_folder.`date`, user.`email`, ged_share_folder.`date` FROM `ged_share_folder` INNER JOIN `ged_folder` ON `ged_share_folder`.`folder_id` = `ged_folder`.`id` INNER JOIN `user` ON `ged_folder`.`user_id` = `user`.id WHERE active IS TRUE AND ged_share_folder.user_id = %s", \
            (self.usr_id, ))
            for i2 in folders:
                ret["Content"]["folders"].append({
                "id": i2[0], "name": i2[1], "date": i2[2], "proprietary": i2[3], "sharing_date": i2[4],
                "rights": {
                            "read": self.is_reader(i2[0]),
                            "edit": self.is_editor(i2[0]),
                            "share": self.is_sharer(i2[0]),
                            "administrate": self.is_admin(i2[0])
                          }
                })
        return ret

    def content(self, folder_id = None, name = None, date = None):
        res = {"id": folder_id, "name": name, "date": date, "Content": {"files": [], "folders": []}}
        if folder_id is not None and name is None:
            folder = sql.get("SELECT `name`, `date` FROM `ged_folder` WHERE id = %s AND user_id = %s", \
            (folder_id, self.usr_id))
            res["name"] = folder[0][0]
            res["date"] = folder[0][1]
        if folder_id is not None:
            files = sql.get("SELECT `id`, `name`, `type`, `date` FROM `ged_file` WHERE inside = %s AND user_id = %s", \
            (folder_id, self.usr_id))
        else:
            files = sql.get("SELECT `id`, `name`, `type`, `date` FROM `ged_file` WHERE inside IS NULL AND user_id = %s", \
            (self.usr_id,))
        for i2 in files:
            res["Content"]["files"].append({
            "id": i2[0], "name": i2[1], "type": i2[2], "date": i2[3]
            })
        if folder_id is not None:
            folders = sql.get("SELECT `id`, `name`, `date` FROM `ged_folder` WHERE inside = %s AND user_id = %s", \
            (folder_id, self.usr_id))
        else:
            folders = sql.get("SELECT `id`, `name`, `date` FROM `ged_folder` WHERE inside IS NULL AND user_id = %s", \
            (self.usr_id, ))
        for i2 in folders:
            res["Content"]["folders"].append(self.content(i2[0], i2[1], i2[2]))
        return res

    def is_proprietary(self, id_folder, user_id = None):
        user_id = self.usr_id if user_id is None else user_id
        res = sql.get("SELECT `id` FROM `ged_folder` WHERE id = %s AND user_id = %s", (id_folder, user_id))
        return True if len(res) > 0 else False

    def is_admin(self, id_folder):
        ret = False
        for i in ged.vpath(id_folder):
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_administrate IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = True
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_administrate IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = False
        return ret

    def is_sharer(self, id_folder):
        ret = False
        for i in ged.vpath(id_folder):
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_share IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = True
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_share IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = False
        return ret

    def is_editor(self, id_folder):
        ret = False
        for i in ged.vpath(id_folder):
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_edit IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = True
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_edit IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = False
        return ret

    def is_reader(self, id_folder):
        ret = False
        for i in ged.vpath(id_folder):
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_read IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = True
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_read IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = False
        return ret

class file:
    def __init__(self, usr_id = -1, ged_id = -1):
        self.usr_id = str(usr_id)
        self.ged_id = str(ged_id)


    def new(self, file, folder_id):
        file_id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        name, ext = os.path.splitext(file.filename)
        if ext not in ('.pdf', ):
            return [False, "File extension not allowed.", 401]
        if folder_id is not None and not folder.exist(folder_id):
            return [False, "folder_id does not exist", 400]
        if not folder(self.usr_id).is_proprietary(folder_id) and folder_id is not None:
            return [False, "Invalid rights", 403]
        file.save(self.path(file_id))
        succes = sql.input("INSERT INTO `ged_file` (`id`, `ged_id`, `user_id`, `name`, `type`, `inside`, `date`) VALUES (%s, %s, %s, %s, %s, %s, %s)", \
        (file_id, self.ged_id, self.usr_id, name, ext[1:], folder_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"file_id": file_id}, None]

    def share(self, email, file_id, access):
        if not self.is_proprietary(file_id) and not self.is_sharer(file_id):
            return [False, "Can't share this file, invalid rights", 403]
        if "administrate" not in access or "share" not in access or "edit" not in access or "read" not in access:
            return [False, "Invalid access, should contain 'share', 'edit', 'read', 'administrate'", 400]
        if not isinstance(access["administrate"], bool) or not isinstance(access["edit"], bool) or not isinstance(access["read"], bool) or not isinstance(access["administrate"], bool):
            return [False, "Value of index contained in access should be boolean", 400]
        if access["administrate"]:
            access["edit"] = True
        if access["edit"]:
            access["read"] = True
        user_id = user.fromemail(email)
        table = "ged_share_file"
        if not user_id:
            user_id = email
            table = "ged_share_file_buff"
        elif user_id == self.usr_id:
            return [False, "Can't share to yourself", 401]
        share_id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        sql.input("UPDATE  `" + table + "` SET active = 0 WHERE user_id = %s AND file_id = %s", (user_id, file_id))
        succes = sql.input("INSERT INTO `" + table + "` (`id`, `ged_id`, `user_id`, `file_id`, `can_administrate`, `can_share`, `can_edit`, `can_read`, `date`, `shared_by`, active) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", \
        (share_id, self.ged_id, user_id, file_id, access["administrate"], access["share"], access["edit"], access["read"], date, self.usr_id, True))
        if not succes:
            return [False, "data input error", 500]
        return [True, {}, None]

    def path(self, file_id, user_id = None):
        if user_id is None:
            user_id = self.usr_id
        save_path = "/home/ged/{user_id}".format(user_id=user_id)
        if not os.path.exists(save_path):
            os.makedirs(save_path)
        file_path = "{path}/{file}".format(path=save_path, file=file_id)
        return file_path

    def exist(file_id):
        res = sql.get("SELECT `id` FROM `ged_file` WHERE id = %s", \
        (file_id, ))
        return True if len(res) > 0 else False

    def content(self, file_id):
        ret = {}
        if self.is_proprietary(file_id):
            res = sql.get("SELECT `id`, `name`, `date`, `type`, `inside`, `user_id` FROM `ged_file` WHERE id = %s",
            (file_id,))
            if len(res) != 0:
                with open(self.path(file_id, res[0][5]), 'rb') as f:
                    data = f.read()
                data =  base64.encodestring(data).decode("utf-8")
                ret = {
                         "name": res[0][1],
                         "date": res[0][2],
                         "type": res[0][3],
                         "inside": res[0][4],
                         "Content": {
                                    "Encode": "base64",
                                    "Data": data
                                  }
                       }
            return [True, ret, None]
        elif self.is_reader(file_id):
            res = sql.get("SELECT ged_file.`id`, `name`, ged_file.type, ged_file.`date`, user.`email`, ged_share_file.`date`, user.`id` FROM `ged_share_file` INNER JOIN `ged_file` ON `ged_share_file`.`file_id` = `ged_file`.`id` INNER JOIN `user` ON `ged_file`.`user_id` = `user`.id WHERE active IS TRUE AND ged_share_file.file_id = %s", \
            (file_id, ))
            if len(res) != 0:
                with open(self.path(file_id, res[0][6]), 'rb') as f:
                    data = f.read()
                data =  base64.encodestring(data).decode("utf-8")
                ret = {
                "id": res[0][0], "name": res[0][1], "type": res[0][2], "date": res[0][3], "proprietary": res[0][4], "sharing_date": res[0][5],
                "Content": {"Encode": "base64", "Data": data},
                "rights": {
                        "read": file(self.usr_id).is_reader(res[0][0]),
                        "edit": file(self.usr_id).is_editor(res[0][0]),
                        "share": file(self.usr_id).is_sharer(res[0][0]),
                        "administrate": file(self.usr_id).is_admin(res[0][0])
                        }
                }
            else:
                res = sql.get("SELECT ged_file.id, ged_file.name, ged_file.type, ged_file.date, user.`email`, user.`id` FROM `ged_file` INNER JOIN `user` ON `ged_file`.`user_id` = `user`.id WHERE ged_file.id = %s", \
                (file_id, ))
                if len(res) != 0:
                    with open(self.path(file_id, res[0][5]), 'rb') as f:
                        data = f.read()
                    data =  base64.encodestring(data).decode("utf-8")
                    ret = {
                    "id": res[0][0], "name": res[0][1], "type": res[0][2], "date": res[0][3], "proprietary": res[0][4], "sharing_date": None,
                    "Content": {"Encode": "base64", "Data": data},
                    "rights": {
                            "read": file(self.usr_id).is_reader(res[0][0]),
                            "edit": file(self.usr_id).is_editor(res[0][0]),
                            "share": file(self.usr_id).is_sharer(res[0][0]),
                            "administrate": file(self.usr_id).is_admin(res[0][0])
                            }
                    }
                else:
                    return [False, "error", 500]
            return [True, ret, None]
        return [False, "Invalid rights", 403]

    def is_proprietary(self, id_file, user_id = None):
        user_id = self.usr_id if user_id is None else user_id
        res = sql.get("SELECT `id` FROM `ged_file` WHERE id = %s AND user_id = %s", (id_file, user_id))
        return True if len(res) > 0 else False

    def is_admin(self, id_file):
        ret = False
        for i in ged.vpath(id_file):
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_administrate IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = True
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_administrate IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = False
        res = sql.get("SELECT `id` FROM `ged_share_file` WHERE file_id = %s AND user_id = %s AND can_administrate IS TRUE AND active IS TRUE", (id_file, self.usr_id))
        if len(res):
            ret = True
        res = sql.get("SELECT `id` FROM `ged_share_file` WHERE file_id = %s AND user_id = %s AND can_administrate IS FALSE AND active IS TRUE", (id_file, self.usr_id))
        if len(res):
            ret = False
        return ret

    def is_sharer(self, id_file):
        ret = False
        for i in ged.vpath(id_file):
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_share IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = True
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_share IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = False
        res = sql.get("SELECT `id` FROM `ged_share_file` WHERE file_id = %s AND user_id = %s AND can_share IS TRUE AND active IS TRUE", (id_file, self.usr_id))
        if len(res):
            ret = True
        res = sql.get("SELECT `id` FROM `ged_share_file` WHERE file_id = %s AND user_id = %s AND can_share IS FALSE AND active IS TRUE", (id_file, self.usr_id))
        if len(res):
            ret = False
        return ret

    def is_editor(self, id_file):
        ret = False
        for i in ged.vpath(id_file):
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_edit IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = True
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_edit IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = False
        res = sql.get("SELECT `id` FROM `ged_share_file` WHERE file_id = %s AND user_id = %s AND can_edit IS TRUE AND active IS TRUE", (id_file, self.usr_id))
        if len(res):
            ret = True
        res = sql.get("SELECT `id` FROM `ged_share_file` WHERE file_id = %s AND user_id = %s AND can_edit IS FALSE AND active IS TRUE", (id_file, self.usr_id))
        if len(res):
            ret = False
        return ret

    def is_reader(self, id_file):
        ret = False
        for i in ged.vpath(id_file):
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_read IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = True
            res = sql.get("SELECT `id` FROM `ged_share_folder` WHERE folder_id = %s AND user_id = %s AND can_read IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                ret = False
        res = sql.get("SELECT `id` FROM `ged_share_file` WHERE file_id = %s AND user_id = %s AND can_read IS TRUE AND active IS TRUE", (id_file, self.usr_id))
        if len(res):
            ret = True
        res = sql.get("SELECT `id` FROM `ged_share_file` WHERE file_id = %s AND user_id = %s AND can_read IS FALSE AND active IS TRUE", (id_file, self.usr_id))
        if len(res):
            ret = False
        return ret


class ged:

    def vpath(id_doc):
        res = []
        if not folder.exist(id_doc):
            id_doc = sql.get("SELECT `inside` FROM `ged_file` WHERE id = %s", (id_doc, ))[0][0]
        while id_doc is not None:
            res.append(id_doc)
            id_doc = sql.get("SELECT `inside` FROM `ged_folder` WHERE id = %s", (id_doc, ))[0][0]
        return res

    def is_inside(id_doc, id_folder):
        path = ged.vpath(id_doc)[:-1]
        return id_folder in path

    def __init__(self, usr_id = -1, ged_id = -1):
        self.usr_id = str(usr_id)
        self.ged_id = str(ged_id)

    def create(self, name):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        succes = sql.input("INSERT INTO `ged` (`id`, `name`, `user_id`, `date`) VALUES (%s, %s, %s, %s)", \
          (id, name, self.usr_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": res[0][0]}, None]

    def check_exist(self):
        res = sql.get("SELECT `id` FROM `ged` WHERE id = %s", (self.ged_id, ))
        if len(res) != 1:
            return [False, "Invalid Ged ID", 404]
        return [True, {"id": res[0][0]}, None]

    def infos(self):
        res = sql.get("SELECT `ged`.`name`, `user`.`email`, `ged`.`date` FROM `ged` INNER JOIN user ON `ged`.user_id = `user`.id WHERE `ged`.id = %s", (self.ged_id, ))
        if len(res) != 1:
            return [False, "Invalid Ged ID", 404]
        return [True, {"name": res[0][0], "admin": res[0][1], "date": res[0][2]}, None]

    def check_user(self):
        res = sql.get("SELECT `id` FROM `ged_user` WHERE ged_id = %s AND user_id = %s", (self.ged_id, self.usr_id, ))
        if len(res) != 1:
            return [False, "User hasn't access to this ged", 404]
        return [True, {"access_id": res[0][0]}, None]

    def create_user(self, email, role):
        if role not in ["admin", "user"]:
            return [False, "role is not correct 'admin' or 'user'", 400]
        role = {"admin": 1, "user": 0}[role]
        user_id = user.fromemail(email)
        table = "ged_user"
        if not user_id:
            user_id = email
            table = "ged_user_buff"
        elif user_id == self.usr_id:
            return [False, "Can't share to yourself", 401]
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        succes = sql.input("INSERT INTO `" + table + "` (`id`, `ged_id`, `user_id`, `role`, `shared_by`, `date`) VALUES (%s, %s, %s, %s, %s, %s)", \
          (id, self.ged_id, user_id, role, self.usr_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": res[0][0]}, None]

    def get(self, doc_id):
        ret = None
        fol = folder(self.usr_id, self.ged_id)
        fil = file(self.usr_id, self.ged_id)
        if doc_id is None:
            return [True, {"Proprietary": fol.content(doc_id), "Shared": fol.sharedcontent(doc_id)}, None]
        elif folder.exist(doc_id):
            if fol.is_proprietary(doc_id):
                return [True, fol.content(doc_id), None]
            else:
                return [True, fol.sharedcontent(doc_id), None]
        elif file.exist(doc_id):
            return fil.content(doc_id)
        return [False, "document doesn't exist", 404]

    def share(self, doc_id, email, access):
        if folder.exist(doc_id):
            fol = folder(self.usr_id, self.ged_id)
            ret = fol.share(email, doc_id, access)
        elif file.exist(doc_id):
            fil = file(self.usr_id, self.ged_id)
            ret = fil.share(email, doc_id, access)
        else:
            ret = [False, "Doc_id isn't a valid file_id or folder_id", 404]
        return ret
