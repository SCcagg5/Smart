import requests
import os
import uuid
import time
from .sql import sql

class folder:
    def __init__(self, usr_id = -1):
        self.usr_id = str(usr_id)

    def new(self, name, folder_id):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        if folder_id is not None and not self.folderexist(folder_id):
            return [False, "folder_id does not exist", 400]
        succes = sql.input("INSERT INTO `folder` (`id`,`user_id`, `name`, `inside`, `date`) VALUES (%s, %s, %s, %s, %s)", \
        (id, self.usr_id, name, folder_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {}, None]

    def folderexist(self, folder_id):
        res = sql.get("SELECT `id` FROM `folder` WHERE id = %s", \
        (folder_id, ))
        return True if len(res) > 0 else False


class file:
    def __init__(self, usr_id = -1):
        self.usr_id = str(usr_id)

    def new(self, file, folder_id):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        name, ext = os.path.splitext(file.filename)
        if ext not in ('.pdf', ):
            return [False, "File extension not allowed.", 401]
        if folder_id is not None and not folder(self.usr_id).folderexist(folder_id):
            return [False, "folder_id does not exist", 400]
        save_path = "/home/ged/{user_id}/".format(user_id=self.usr_id)
        if not os.path.exists(save_path):
            os.makedirs(save_path)
        file_path = "{path}/{file}{ext}".format(path=save_path, file=id, ext=ext)
        file.save(file_path)
        succes = sql.input("INSERT INTO `file` (`id`,`user_id`, `name`, `type`, `inside`, `date`) VALUES (%s, %s, %s, %s, %s, %s)", \
        (id, self.usr_id, name, ext[1:], folder_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": id}, None]

class ged:
    def __init__(self, usr_id = -1):
        self.usr_id = str(usr_id)

    def get(self, folder_id):
        if folder_id is not None:
            return [False, "Not done", 500]
        ret = self.__content(folder_id)
        return [True, ret, None]

    def __content(self, folder_id = None, name = None, date = None, i = 5):
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
            res["Content"]["folders"].append(self.__content(i2[0], i2[1], i2[2], i))
        return res
