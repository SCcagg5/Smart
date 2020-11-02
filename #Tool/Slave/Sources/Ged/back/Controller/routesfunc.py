from Model.basic import check
from Object.slaves import slave
from Object.ged import folder, file, ged, sign, room
from Object.odoo import odoo
import json
import os

GED = str(os.getenv('GED_ID', None))

ged(None, GED).create()

def sl_getauth(cn, nextc):
    err = check.contain(cn.pr, ["pass"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.hd = err[1]
    use = slave()
    err = use.getauth(cn.pr["pass"])
    cn.private['slave'] = use
    return cn.call_next(nextc, err)

def sl_chkauth(cn, nextc):
    err = check.contain(cn.hd, ["token"], "HEAD")
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.hd = err[1]
    cn.hd = check.setnoneopt(cn.hd, ["usrtoken"])
    use = slave(cn.hd["token"], cn.hd["usrtoken"])
    err = use.checkauth(cn.hd["token"])
    cn.private['slave'] = use
    return cn.call_next(nextc, err)

def sl_signup(cn, nextc):
    err = check.contain(cn.pr, ["email", "password1", "password2"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    err = cn.private['slave'].signup(cn.pr["email"], cn.pr["password1"], cn.pr["password2"])

    return cn.call_next(nextc, err)

def sl_signin(cn, nextc):
    err = check.contain(cn.pr, ["email", "password1"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    err = cn.private['slave'].signin(cn.pr["email"], cn.pr["password1"])

    return cn.call_next(nextc, err)

def sl_authuser(cn, nextc):
    err = check.contain(cn.hd, ["token", "usrtoken"], "HEAD")
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.hd = err[1]
    use = slave(cn.hd["token"])
    err = use.authuser(cn.hd["token"], cn.hd["usrtoken"])
    cn.private['slave'] = use
    if err[0]:
        cn.private['user_id'] = err[1]["usr_id"]
    return cn.call_next(nextc, err)

def sl_check_user(cn, nextc):
    err = cn.private['slave'].check_user(GED)
    cn.private['ged'] = ged(cn.private['user_id'], GED)
    return cn.call_next(nextc, err)

def ged_infos(cn, nextc):
    if not 'user_id' in cn.private:
        cn.private['ged'] = ged(None, GED)
    err = cn.private["ged"].infos()
    return cn.call_next(nextc, err)

def ged_add_user(cn, nextc):
    err = check.contain(cn.pr, ["email", "role"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = cn.private["ged"].create_user(cn.pr["email"], cn.pr["role"])
    return cn.call_next(nextc, err)

def ged_add_folder(cn, nextc):
    err = check.contain(cn.pr, ["name"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    cn.pr = check.setnoneopt(cn.pr, ["folder_id"])
    err = folder(usr_id=cn.private['user_id'], ged_id=cn.private["ged"].ged_id).new(cn.pr["name"], cn.pr["folder_id"])
    return cn.call_next(nextc, err)

def ged_search(cn, nextc):
    err = check.contain(cn.get, ["search"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.get = check.setnoneopt(cn.get, ["search", "ext", "datef", "datet", "page", "size"])
    err = cn.private["ged"].search(
                     word=cn.get["search"],
                     type=cn.get["ext"],
                     date_from=cn.get["datef"],
                     date_to=cn.get["datet"],
                     page=cn.get["page"],
                     size=cn.get["size"]
                     )
    return cn.call_next(nextc, err)

def ged_add_file(cn, nextc):
    err = check.contain(cn.req.files, ["file"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = check.setnoneopt(cn.req.forms, ["folder_id"])
    err = file(usr_id=cn.private['user_id'],  ged_id=cn.private["ged"].ged_id).new(cn.req.files["file"], cn.req.forms["folder_id"])
    return cn.call_next(nextc, err)

def ged_add_b64file(cn, nextc):
    err = check.contain(cn.pr, ["b64file"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = check.setnoneopt(cn.pr, ["folder_id"])
    err = file(usr_id=cn.private['user_id'],  ged_id=cn.private["ged"].ged_id).b64new(cn.pr["b64file"], cn.pr["folder_id"])
    return cn.call_next(nextc, err)

def ged_get_content(cn, nextc):
    folder_id = cn.rt["doc"] if "doc" in cn.rt else None
    err = cn.private["ged"].get(folder_id)
    return cn.call_next(nextc, err)

def ged_share(cn, nextc):
    err = check.contain(cn.pr, ["to", "access"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    doc_id = cn.rt["doc"] if "doc" in cn.rt else None
    res = cn.private['slave'].getbyemail(cn.pr["to"])
    user_id = res[1]['id'] if res[0] else False
    err = cn.private["ged"].share(user_id, cn.pr["to"], doc_id, cn.pr["access"])
    return cn.call_next(nextc, err)

def ged_update(cn, nextc):
    err = check.contain(cn.pr, [["name", "content"]])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    doc_id = cn.rt["doc"] if "doc" in cn.rt else None
    err = cn.private["ged"].update(doc_id, cn.pr["name"], cn.pr["content"])
    return cn.call_next(nextc, err)

def ged_delete(cn, nextc):
    doc_id = cn.rt["doc"] if "doc" in cn.rt else None
    err = cn.private["ged"].delete(doc_id)
    return cn.call_next(nextc, err)

def ged_sign_init(cn, nextc):
    err = [True, {}, 200]
    cn.private["sign"] = sign(usr_id=cn.private['user_id'], ged_id=cn.private["ged"].ged_id)
    return cn.call_next(nextc, err)

def ged_sign_new(cn, nextc):
    err = check.contain(cn.pr, ["base64"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = cn.private["sign"].new(cn.pr["base64"])
    return cn.call_next(nextc, err)

def ged_sign_get_all(cn, nextc):
    err = cn.private["sign"].getAll()
    return cn.call_next(nextc, err)

def ged_sign_get(cn, nextc):
    sign_id = cn.rt["sign"] if "sign" in cn.rt else None
    err = cn.private["sign"].get(sign_id)
    return cn.call_next(nextc, err)

def ged_sign_delete(cn, nextc):
    sign_id = cn.rt["sign"] if "sign" in cn.rt else None
    err = cn.private["sign"].delete(sign_id)
    return cn.call_next(nextc, err)

def ged_sign_sign(cn, nextc):
    err = check.contain(cn.pr, ["x", "y", "h", "w", "page"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    doc_id = cn.rt["doc"] if "doc" in cn.rt else None
    sign_id = cn.rt["sign"] if "sign" in cn.rt else None
    err = cn.private["sign"].sign_doc(sign_id, doc_id, cn.pr["x"], cn.pr["y"], cn.pr["h"], cn.pr["w"])
    return cn.call_next(nextc, err)


def ged_room_new(cn, nextc):
    err = check.contain(cn.pr, ["name", "start", "duration"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = room(usr_id=cn.private["ged"].usr_id, ged_id=cn.private["ged"].ged_id).new(cn.pr["name"], cn.pr["start"], cn.pr["duration"])
    return cn.call_next(nextc, err)

def ged_room_all(cn, nextc):
    err = room(usr_id=cn.private["ged"].usr_id, ged_id=cn.private["ged"].ged_id).all()
    return cn.call_next(nextc, err)

def ged_room_file_new(cn, nextc):
    room_id = cn.rt["room"] if "room" in cn.rt else None
    err = check.contain(cn.pr, ["doc_id"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = room(usr_id=cn.private["ged"].usr_id, ged_id=cn.private["ged"].ged_id, room_id=room_id).add_file(cn.pr["doc_id"])
    return cn.call_next(nextc, err)

def ged_room_files_get(cn, nextc):
    room_id = cn.rt["room"] if "room" in cn.rt else None
    err = room(usr_id=cn.private["ged"].usr_id, ged_id=cn.private["ged"].ged_id, room_id=room_id).files()
    return cn.call_next(nextc, err)

def odoo_check(cn, nextc):
    cn.private["odoo"] = odoo(usr_id=cn.private['user_id'])
    err = cn.private["odoo"].connection()
    return cn.call_next(nextc, err)

def odoo_infos(cn, nextc):
    err = cn.private["odoo"].version()
    return cn.call_next(nextc, err)

def odoo_users(cn, nextc):
    err = cn.private["odoo"].list_contact(False, cn.get["offset"], cn.get["limit"])
    return cn.call_next(nextc, err)

def odoo_user(cn, nextc):
    contact_id = cn.rt["user"] if "user" in cn.rt else None
    err = cn.private["odoo"].read_contact(contact_id)
    return cn.call_next(nextc, err)

def odoo_add_user(cn, nextc):
    err = check.contain(cn.pr, ["param"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = check.contain(cn.pr["param"], ["name"], "body.param")
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr["param"] = check.setnoneopt(cn.pr["param"], ['base64', 'name', 'parent_id', 'function', 'phone', 'mobile', 'email', 'website', 'title'])
    err = cn.private["odoo"].create_client(cn.pr["param"])
    return cn.call_next(nextc, err)

def odoo_companies(cn, nextc):
    err = cn.private["odoo"].list_contact(True, cn.get["offset"], cn.get["limit"])
    return cn.call_next(nextc, err)

def odoo_company(cn, nextc):
    contact_id = cn.rt["company"] if "company" in cn.rt else None
    err = cn.private["odoo"].read_contact(contact_id)
    return cn.call_next(nextc, err)

def odoo_add_company(cn, nextc):
    err = check.contain(cn.pr, ["param"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = check.contain(cn.pr["param"], ["name"], "body.param")
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr["param"] = check.setnoneopt(cn.pr["param"], ['base64', 'name', 'street', 'street2', 'city', 'zip', 'state_id', 'vat', 'phone', 'mobile', 'email', 'website'])
    err = cn.private["odoo"].create_company(cn.pr["param"])
    return cn.call_next(nextc, err)

def odoo_case(cn, nextc):
    err = cn.private["odoo"].case(cn.private["ged"].ged_id)
    return cn.call_next(nextc, err)

def odoo_add_case(cn, nextc):
    err = check.contain(cn.pr, ["client_id", "type", "name", "client_folder", "team"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = cn.private["odoo"].new_case(cn.pr["client_id"], cn.pr["type"], cn.pr["name"], cn.pr["client_folder"], cn.pr["team"], cn.private["ged"].ged_id)
    return cn.call_next(nextc, err)

def odoo_add_bill(cn, nextc):
    err = check.contain(cn.pr, ["data"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = cn.private["odoo"].creatfact(cn.pr["data"])
    return cn.call_next(nextc, err)

def odoo_get_data(cn, nextc):
    data_name = cn.rt["get"] if "get" in cn.rt else None
    id = cn.get["id"] if "id" in cn.get else 0
    offset = cn.get["offset"] if "offset" in cn.get else 0
    limit = cn.get["limit"] if "limit" in cn.get else 10
    err = cn.private["odoo"].list_index(data_name, offset, limit, id)
    return cn.call_next(nextc, err)
