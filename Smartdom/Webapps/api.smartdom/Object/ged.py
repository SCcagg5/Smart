import requests
import os
import uuid
import time
import base64
from .sql import sql
from .users import user

class folder:
    def __init__(self, usr_id = -1):
        self.usr_id = str(usr_id)

    def new(self, name, folder_id):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        if folder_id is not None and not self.exist(folder_id):
            return [False, "folder_id does not exist", 400]
        if not self.is_proprietary(folder_id) and folder_id is not None:
            return [False, "Invalid rights", 403]
        succes = sql.input("INSERT INTO `folder` (`id`,`user_id`, `name`, `inside`, `date`) VALUES (%s, %s, %s, %s, %s)", \
        (id, self.usr_id, name, folder_id, date))
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
            acces["read"] = true
        user_id = user.fromemail(email)
        table = "share_folder"
        if not user_id:
            user_id = email
            table = "share_folder_buff"
        elif user_id == self.user_id:
            return [False, "Can't share to yourself", 401]
        share_id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        sql.input("UPDATE  `" + table + "` SET active = 0 WHERE user_id = %s AND folder_id = %s", (user_id, folder_id))
        succes = sql.input("INSERT INTO `" + table + "` (`id`,`user_id`, `folder_id`, `can_administrate`, `can_share`, `can_edit`, `can_read`, `date`, `shared_by`, `active`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", \
        (share_id, user_id, folder_id, access["administrate"], access["share"], access["edit"], access["read"], date, self.usr_id, True))
        if not succes:
            return [False, "data input error", 500]
        return [True, {}, None]

    def exist(self, folder_id):
        res = sql.get("SELECT `id` FROM `folder` WHERE id = %s", \
        (folder_id, ))
        return True if len(res) > 0 else False

    def sharedcontent(self, folder_id = None, name = None, date = None):
        res = {"id": folder_id, "name": name, "date": date, "Content": {"files": [], "folders": []}}
        if folder_id is not None:
            res["rights"] = {
                             "read": self.is_reader(folder_id),
                             "edit": self.is_editor(folder_id),
                             "share": self.is_sharer(folder_id),
                             "administrate": self.is_admin(folder_id)
                             }
            if not self.is_reader(folder_id):
                return res
            files = sql.get("SELECT `id`, `name`, `type`, `date` FROM `file` WHERE inside = %s", \
            (folder_id, ))
            for i2 in files:
                res["Content"]["files"].append({
                "id": i2[0], "name": i2[1], "type": i2[2], "date": i2[3],
                "rights": {
                        "read": file(self.usr_id).is_reader(i2[0]),
                        "edit": file(self.usr_id).is_editor(i2[0]),
                        "share": file(self.usr_id).is_sharer(i2[0]),
                        "administrate": file(self.usr_id).is_admin(i2[0])
                        }
                })
            folders = sql.get("SELECT `id`, `name`, `date` FROM `folder` WHERE inside = %s", \
            (folder_id, ))
            for i2 in folders:
                res["Content"]["folders"].append(self.sharedcontent(i2[0], i2[1], i2[2]))
        else:
            files = sql.get("SELECT file.`id`, `name`, file.`date`, user.`email`, share_file.`date` FROM `file` INNER JOIN `share_file` ON `share_file`.user_id = %s LEFT JOIN `user` ON user.id = %s WHERE active IS TRUE", \
            (self.usr_id, self.usr_id))
            for i2 in files:
                res["Content"]["files"].append({
                "id": i2[0], "name": i2[1], "type": i2[2], "date": i2[3], "proprietary": i2[4], "sharing_date": i2[5],
                "rights": {
                        "read": file(self.usr_id).is_reader(i2[0]),
                        "edit": file(self.usr_id).is_editor(i2[0]),
                        "share": file(self.usr_id).is_sharer(i2[0]),
                        "administrate": file(self.usr_id).is_admin(i2[0])
                        }
                })
            folders = sql.get("SELECT folder.`id`, `name`, folder.`date`, user.`email`, share_folder.`date` FROM `folder` INNER JOIN `share_folder` ON `share_folder`.user_id = %s LEFT JOIN `user` ON user.id = %s WHERE active IS TRUE", \
            (self.usr_id, self.usr_id))
            for i2 in folders:
                res["Content"]["folders"].append({
                "id": i2[0], "name": i2[1], "date": i2[2], "proprietary": i2[3], "sharing_date": i2[4],
                "rights": {
                            "read": self.is_reader(i2[0]),
                            "edit": self.is_editor(i2[0]),
                            "share": self.is_sharer(i2[0]),
                            "administrate": self.is_admin(i2[0])
                          }
                })
        return res

    def content(self, folder_id = None, name = None, date = None):
        res = {"id": folder_id, "name": name, "date": date, "Content": {"files": [], "folders": []}}
        if folder_id is not None and name is None:
            folder = sql.get("SELECT `name`, `date` FROM `folder` WHERE id = %s AND user_id = %s", \
            (folder_id, self.usr_id))
            res["name"] = folder[0][0]
            res["date"] = folder[0][1]
        if folder_id is not None:
            files = sql.get("SELECT `id`, `name`, `type`, `date` FROM `file` WHERE inside = %s AND user_id = %s", \
            (folder_id, self.usr_id))
        else:
            files = sql.get("SELECT `id`, `name`, `type`, `date` FROM `file` WHERE inside IS NULL AND user_id = %s", \
            (self.usr_id,))
        for i2 in files:
            res["Content"]["files"].append({
            "id": i2[0], "name": i2[1], "type": i2[2], "date": i2[3]
            })
        if folder_id is not None:
            folders = sql.get("SELECT `id`, `name`, `date` FROM `folder` WHERE inside = %s AND user_id = %s", \
            (folder_id, self.usr_id))
        else:
            folders = sql.get("SELECT `id`, `name`, `date` FROM `folder` WHERE inside IS NULL AND user_id = %s", \
            (self.usr_id, ))
        for i2 in folders:
            res["Content"]["folders"].append(self.content(i2[0], i2[1], i2[2]))
        return res

    def is_proprietary(self, id_folder, user_id = None):
        user_id = self.usr_id if user_id is None else user_id
        res = sql.get("SELECT `id` FROM `folder` WHERE id = %s AND user_id = %s", (id_folder, user_id))
        return True if len(res) > 0 else False

    def is_admin(self, id_folder):
        res = False
        for i in ged.vpath(id_folder):
            res = sql.get("SELECT `id` FROM `share_folder` WHERE folder_id = %s AND user_id = %s AND can_administrate IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = True
            res = sql.get("SELECT `id` FROM `share_folder` WHERE folder_id = %s AND user_id = %s AND can_administrate IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = False
        return res

    def is_sharer(self, id_folder):
        res = False
        for i in ged.vpath(id_folder):
            res = sql.get("SELECT `id` FROM `share_folder` WHERE folder_id = %s AND user_id = %s AND can_share IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = True
            res = sql.get("SELECT `id` FROM `share_folder` WHERE folder_id = %s AND user_id = %s AND can_share IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = False
        return res

    def is_editor(self, id_folder):
        res = False
        for i in ged.vpath(id_folder):
            res = sql.get("SELECT `id` FROM `share_folder` WHERE folder_id = %s AND user_id = %s AND can_edit IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = True
            res = sql.get("SELECT `id` FROM `share_folder` WHERE folder_id = %s AND user_id = %s AND can_edit IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = False
        return res

    def is_reader(self, id_folder):
        res = False
        for i in ged.vpath(id_folder):
            res = sql.get("SELECT `id` FROM `share_folder` WHERE folder_id = %s AND user_id = %s AND can_read IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = True
            res = sql.get("SELECT `id` FROM `share_folder` WHERE folder_id = %s AND user_id = %s AND can_read IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = False
        return res

class file:
    def __init__(self, usr_id = -1):
        self.usr_id = str(usr_id)

    def new(self, file, folder_id):
        file_id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        name, ext = os.path.splitext(file.filename)
        if ext not in ('.pdf', ):
            return [False, "File extension not allowed.", 401]
        if folder_id is not None and not folder(self.usr_id).exist(folder_id):
            return [False, "folder_id does not exist", 400]
        if not self.is_proprietary(folder_id) and folder_id is not None:
            return [False, "Invalid rights", 403]
        file.save(self.path(file_id))
        succes = sql.input("INSERT INTO `file` (`id`,`user_id`, `name`, `type`, `inside`, `date`) VALUES (%s, %s, %s, %s, %s, %s)", \
        (file_id, self.usr_id, name, ext[1:], folder_id, date))
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
            acces["read"] = true
        user_id = user.fromemail(email)
        table = "share_file"
        if not user_id:
            user_id = email
            table = "share_file_buff"
        elif user_id == self.user_id:
            return [False, "Can't share to yourself", 401]
        share_id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        sql.input("UPDATE  `" + table + "` SET active = 0 WHERE user_id = %s AND file_id = %s", (user_id, file_id))
        succes = sql.input("INSERT INTO `" + table + "` (`id`,`user_id`, `file_id`, `can_administrate`, `can_share`, `can_edit`, `can_read`, `date`, `shared_by`, active) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", \
        (share_id, user_id, file_id, access["administrate"], access["share"], access["edit"], access["read"], date, self.usr_id, True))
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

    def exist(self, file_id):
        res = sql.get("SELECT `id` FROM `file` WHERE id = %s", \
        (file_id, ))
        return True if len(res) > 0 else False

    def content(self, file_id):
        ret = None
        if not self.is_proprietary(file_id) and not self.is_reader(file_id):
            return [False, "Invalid rights", 403]
        res = sql.get("SELECT `id`, `name`, `date`, `type`, `inside` FROM `file` WHERE id = %s AND user_id = %s",
        (file_id, self.usr_id,))
        if len(res) != 0:
            with open(self.path(file_id), 'rb') as f:
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
        return ret

    def is_proprietary(self, id_file, user_id = None):
        user_id = self.usr_id if user_id is None else user_id
        res = sql.get("SELECT `id` FROM `file` WHERE id = %s AND user_id = %s", (id_file, user_id))
        return True if len(res) > 0 else False

    def is_admin(self, id_file):
        res = False
        for i in ged.vpath(id_file):
            res = sql.get("SELECT `id` FROM `share_file` WHERE file_id = %s AND user_id = %s AND can_administrate IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = True
            res = sql.get("SELECT `id` FROM `share_file` WHERE file_id = %s AND user_id = %s AND can_administrate IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = False
        return res

    def is_sharer(self, id_file):
        res = False
        for i in ged.vpath(id_file):
            res = sql.get("SELECT `id` FROM `share_file` WHERE file_id = %s AND user_id = %s AND can_share IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = True
            res = sql.get("SELECT `id` FROM `share_file` WHERE file_id = %s AND user_id = %s AND can_share IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = False
        return res

    def is_editor(self, id_file):
        res = False
        for i in ged.vpath(id_file):
            res = sql.get("SELECT `id` FROM `share_file` WHERE file_id = %s AND user_id = %s AND can_edit IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = True
            res = sql.get("SELECT `id` FROM `share_file` WHERE file_id = %s AND user_id = %s AND can_edit IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = False
        return res

    def is_reader(self, id_file):
        res = False
        for i in ged.vpath(id_file):
            res = sql.get("SELECT `id` FROM `share_file` WHERE file_id = %s AND user_id = %s AND can_read IS TRUE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = True
            res = sql.get("SELECT `id` FROM `share_file` WHERE file_id = %s AND user_id = %s AND can_read IS FALSE AND active IS TRUE", (i, self.usr_id))
            if len(res):
                res = False
        return res


class ged:

    def vpath(id_doc):
        res = []
        if not self.exist(id_doc):
            id_doc = sql.get("SELECT `inside` FROM `file` WHERE id = %s", (id_doc, ))
        while id_doc is not None:
            res.append(id_doc)
            id_doc = sql.get("SELECT `inside` FROM `folder` WHERE id = %s", (id_doc, ))
        return res

    def is_inside(id_doc, id_folder):
        path = ged.vpath(id_doc)[:-1]
        return id_folder in path

    def __init__(self, usr_id = -1):
        self.usr_id = str(usr_id)

    def get(self, doc_id):
        ret = None
        if doc_id is None:
            ret = {"Proprietary": folder(self.usr_id).content(doc_id), "Shared": folder(self.usr_id).sharedcontent(doc_id)}
        elif folder(self.usr_id).exist(doc_id):
            if folder(self.usr_id).is_proprietary(doc_id):
                ret = folder(self.usr_id).content(doc_id)
            else:
                ret = folder(self.usr_id).sharedcontent(doc_id)
        elif file(self.usr_id).exist(doc_id):
            ret = file(self.usr_id).content(doc_id)
        return [True, ret, None]

    def share(self, doc_id, email, access):
        if folder(self.usr_id).exist(doc_id):
            ret = folder(self.usr_id).share(email, doc_id, access)
        elif file(self.usr_id).exist(doc_id):
            ret = file(self.usr_id).share(email, doc_id, access)
        else:
            ret = [False, "Doc_id isn't a valid file_id or folder_id", 404]
        return ret
