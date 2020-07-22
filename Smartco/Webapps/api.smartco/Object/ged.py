import requests
import os
import uuid
import time
import base64
from .sql import sql

class folder:
    def __init__(self, usr_id = -1):
        self.usr_id = str(usr_id)

    def new(self, name, folder_id):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        if folder_id is not None and not self.exist(folder_id):
            return [False, "folder_id does not exist", 400]
        succes = sql.input("INSERT INTO `folder` (`id`,`user_id`, `name`, `inside`, `date`) VALUES (%s, %s, %s, %s, %s)", \
        (id, self.usr_id, name, folder_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {}, None]

    def exist(self, folder_id):
        res = sql.get("SELECT `id` FROM `folder` WHERE id = %s", \
        (folder_id, ))
        return True if len(res) > 0 else False

    def content(self, folder_id = None, name = None, date = None, i = 5):
        res = {"id": folder_id, "name": name, "date": date, "Content": {"files": [], "folders": []}}
        i -= 1
        if i < 0:
            return res
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
        print(folders, folder_id, self.usr_id)
        for i2 in folders:
            res["Content"]["folders"].append(self.content(i2[0], i2[1], i2[2], i))
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
        file.save(self.path(file_id))
        succes = sql.input("INSERT INTO `file` (`id`,`user_id`, `name`, `type`, `inside`, `date`) VALUES (%s, %s, %s, %s, %s, %s)", \
        (file_id, self.usr_id, name, ext[1:], folder_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"file_id": file_id}, None]

    def path(self, file_id):
        save_path = "/home/ged/{user_id}".format(user_id=self.usr_id)
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

class ged:
    def __init__(self, usr_id = -1):
        self.usr_id = str(usr_id)

    def get(self, doc_id):
        ret = None
        if doc_id is None or folder(self.usr_id).exist(doc_id):
            ret = folder(self.usr_id).content(doc_id)
        elif file(self.usr_id).exist(doc_id):
            ret = file(self.usr_id).content(doc_id)
        return [True, ret, None]
