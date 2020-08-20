import requests
import os
import uuid
import time
import base64
import re
from fpdf import FPDF
from PyPDF2 import PdfFileWriter, PdfFileReader
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import io
from reportlab.lib.utils import ImageReader
from base64 import b64decode
from datetime import date
from .sql import sql
from .users import user
from .pdf import pdf
from .elastic import es, elastic

class PDF(FPDF):
    def load_resource(self, reason, filename):
        if reason == "image":
            if filename.startswith("http://") or filename.startswith("https://"):
                f = BytesIO(urlopen(filename).read())
            elif filename.startswith("data"):
                f = filename.split('base64,')[1]
                f = base64.b64decode(f)
                f = io.BytesIO(f)
            else:
                f = open(filename, "rb")
            return f
        else:
            self.error("Unknown resource loading reason \"%s\"" % reason)


    def sample_pdf(self,img,path):
        self.image(img,h=70,w=150,x=30,y=100,type="png")
        pdf.output(path, 'F')

class sign:
    def __init__(self, usr_id = -1, ged_id = -1):
        self.usr_id = str(usr_id)
        self.ged_id = str(ged_id)

    def new(self, base64):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        succes = sql.input("INSERT INTO `ged_sign` (`id`,`ged_id`, `user_id`, `base64`, `date`) VALUES (%s, %s, %s, %s, %s)", \
        (id, self.ged_id, self.usr_id, base64, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": id}, None]

    def get(self, id_sign):
        if not self.check_sign(id_sign):
            return [False, "Invalid rights", 403]
        res = sql.get("SELECT `base64` FROM `ged_sign` WHERE `ged_sign`.`id` = %s AND `ged_sign`.`user_id` = %s AND `ged_sign`.`ged_id` = %s",
         (id_sign, self.usr_id, self.ged_id))
        return [True, res[0][0], None]

    def getAll(self):
        ret = []
        res = sql.get("SELECT `id`, `date` FROM `ged_sign` WHERE `ged_sign`.`user_id` = %s AND `ged_sign`.`ged_id` = %s",
         (self.usr_id, self.ged_id))
        for i in res:
            ret.append({"id": i[0], "date": i[1]})
        return [True, ret, None]

    def delete(self, id_sign):
        if not self.check_sign(id_sign):
            return [False, "Invalid rights", 403]
        succes = sql.input("DELETE FROM `ged_sign` WHERE `ged_sign`.`id` = %s AND `ged_sign`.`user_id` = %s AND `ged_sign`.`ged_id` = %s",
         (id_sign, self.usr_id, self.ged_id))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": id_sign}, None]

    def check_sign(self, id_sign):
        res = sql.get("SELECT `id` FROM `ged_sign` WHERE `ged_sign`.`id` = %s AND `ged_sign`.`user_id` = %s AND `ged_sign`.`ged_id` = %s",
         (id_sign, self.usr_id, self.ged_id))
        if len(res) > 0:
            return True
        return False

    def sign_doc(self, id_sign, id_file, x, y, height, width):
        path = file().path(id_file , self.usr_id)
        if not self.check_sign(id_sign):
            return [False, "Invalid rights", 403]
        res = sql.get("SELECT `base64` FROM `ged_sign` WHERE `ged_sign`.`id` = %s AND `ged_sign`.`user_id` = %s AND `ged_sign`.`ged_id` = %s",
         (id_sign, self.usr_id, self.ged_id))
        signature = b64decode(res[0][0])
        packet = io.BytesIO()
        can = canvas.Canvas(packet, pagesize=letter)
        can.drawImage(ImageReader(io.BytesIO(signature)), x, y, height, width)
        can.save()

        packet.seek(0)
        new_pdf = PdfFileReader(packet)
        inputpdf = open(path, "rb")
        existing_pdf = PdfFileReader(inputpdf)
        output = PdfFileWriter()
        page = existing_pdf.getPage(0)
        page.mergePage(new_pdf.getPage(0))
        output.addPage(page)
        inputpdf.close()
        outputStream = open(path, "wb")
        output.write(outputStream)
        outputStream.close()
        return [True, {"p":path}, False]



class room:
    def __init__(self, usr_id = -1, ged_id = -1):
        self.usr_id = str(usr_id)
        self.ged_id = str(ged_id)

    def new(name, date_start, duration):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        if int(duration) < 10:
            return [False, "Invalid duration", 400]
        if int(date_start) <= int(date):
            return [False, "Invalid timestamp", 400]
        date_end = int(date_start) + (int(duration) * 60000000)
        succes = sql.input("INSERT INTO `ged_room` (`id`,`ged_id`, `user_id`, `name`, `date_start`, `date_end`, `duration`, `date`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", \
        (id, self.ged_id, self.usr_id, name, date_start, date_end, duration, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": id}, None]

    def get_calendar():
        return []


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
        return [True, {"id": id}, None]

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

    def update(self, id_folder, name):
        if not self.is_proprietary(id_folder) or id_folder is None:
            return [False, "Invalid rights", 403]
        if name is not None:
            succes = sql.input("UPDATE `ged_folder` SET `name` = %s WHERE `ged_folder`.`id` = %s;", (name, folder))
            if not succes:
                return [False, "data input error", 500]
        return [True, {"id": id_folder}, None]

    def delete(self, id_folder):
        if not self.is_proprietary(id_folder) or id_folder is None:
            return [False, "Invalid rights", 403]
        succes = sql.input("DELETE FROM `ged_folder` WHERE `ged_folder`.`id` = %s", (id_folder))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": id_folder}, None]

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
        timestamp = str(int(round(time.time() * 1000)))
        name, ext = os.path.splitext(file.filename)
        if ext not in ('.pdf', ):
            return [False, "File extension not allowed.", 401]
        if folder_id is not None and not folder.exist(folder_id):
            return [False, "folder_id does not exist", 400]
        if not folder(self.usr_id).is_proprietary(folder_id) and folder_id is not None:
            return [False, "Invalid rights", 403]
        path = self.path(file_id)
        file.save(path)
        ext = ext[1:]
        succes = sql.input("INSERT INTO `ged_file` (`id`, `ged_id`, `user_id`, `name`, `type`, `inside`, `date`) VALUES (%s, %s, %s, %s, %s, %s, %s)", \
        (file_id, self.ged_id, self.usr_id, name, ext, folder_id, timestamp))
        if not succes:
            return [False, "data input error", 500]
        input = {"name": name, "ext": ext, "date": timestamp, "file_id": file_id}
        if ext == 'pdf':
            res = pdf.get_text(path)
            if res[0]:
                input["text"] = res[1]["text"]
                input["map"] = res[1]["map"]
                input["lexiq"] = res[1]["lexiq"]
        index = "ged_search_" + self.ged_id + "_" + date.today().strftime("%m%Y")
        if es.indices.exists(index=index):
            es.indices.refresh(index=index)
        else:
            es.indices.create(index=index, body=elastic.doc_mapping)
        es.index(index=index, body=input, request_timeout=30)
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

    def update(self, id_file, name, content):
        if not self.is_proprietary(id_file) or id_file is None:
            return [False, "Invalid rights", 403]
        if name is not None:
            succes = sql.input("UPDATE `ged_file` SET `name` = %s WHERE `ged_file`.`id` = %s;", (name, id_file))
            if not succes:
                return [False, "data input error", 500]
        return [True, {"id": id_file}, None]

    def delete(self, id_file):
        if not self.is_proprietary(id_file) or id_file is None:
            return [False, "Invalid rights", 403]
        succes = sql.input("DELETE FROM `ged_file` WHERE `ged_file`.`id` = %s", (id_file))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": id_file}, None]

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

    def update(self, doc_id, name, content):
        if folder.exist(doc_id):
            fol = folder(self.usr_id, self.ged_id)
            ret = fol.update(doc_id, name)
        elif file.exist(doc_id):
            fil = file(self.usr_id, self.ged_id)
            ret = fil.update(doc_id, name, content)
        else:
            ret = [False, "Doc_id isn't a valid file_id or folder_id", 404]
        return ret

    def delete(self, doc_id):
        if folder.exist(doc_id):
            fol = folder(self.usr_id, self.ged_id)
            ret = fol.delete(doc_id)
        elif file.exist(doc_id):
            fil = file(self.usr_id, self.ged_id)
            ret = fil.delete(doc_id)
        else:
            ret = [False, "Doc_id isn't a valid file_id or folder_id", 404]
        return ret

    def search(self, word, type, date_from, date_to, page = 1, size = 20):
        query, regex, limit = pdf.query(word, date_from, date_to, page, size)
        index_template = "ged_search_" + self.ged_id + "_"
        res = es.search(index=re.findall(r''+index_template+'[0-9]*', es.cat.indices()),
                        body=query,
                        request_timeout=600)["hits"]["hits"]
        ret = []
        pos = []
        i = 0
        while i < len(res):
            i2 = 0
            input = res[i]["_source"]
            match = res[i]["fields"]["match"][0]
            input["score"] = res[i]["_score"]
            input["match"] = {"perfect": int(match[limit]), "partial":  int(match[limit + 1]) , "text": []}
            while i2 < limit and match[i2] != None:
                input["match"]["text"].append(match[i2].replace('\n', ' '))
                i2 += 1
            input["match"]["text"] = list(dict.fromkeys(input["match"]["text"]))
            if True:
              if input["match"]["perfect"] == 0 and input["match"]["partial"] == 0:
                  del input["match"]
                  if re.compile(r'.*' +regex+'.*', flags=re.IGNORECASE).search(str(input['name'])) is not None:
                    ret.append(input)
                  else:
                    pos.append(input)
              else:
                  ret.append(input)
            i += 1
        return [True, {"result": ret, "possible": pos}, None]
