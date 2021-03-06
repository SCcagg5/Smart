from Model.basic import check, auth, master
from Object.users import user
from Object.tpe import tpe
from Object.order import order
from Object.items import item
from Object.admin import admin
from Object.asset import asset
from Object.ether import eth_contract
from Object.ged import folder, file, ged, sign, room
from Object.pdf import pdf
from Object.contacter import contacter
from Object.rethinkproxy import rethinkproxy
from Object.odoo import odoo
import json, time

def wscall(cn, nextc):
    # usrtoken = cn.rt["ws"] if "ws" in cn.rt else None
    # use = user()
    # err = use.verify(usrtoken)
    # if not err[0]:
    #     cn.ws.receive()
    #     cn.ws.send(err[1])
    #     cn.ws.close()
    rethinkproxy.call(cn.ws)
    err = [True, {}, None]
    return cn.call_next(nextc, err)

def getauth(cn, nextc):
    err = check.contain(cn.pr, ["pass"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = auth.gettoken(cn.pr["pass"])
    return cn.call_next(nextc, err)

def myauth(cn, nextc):
    err = check.contain(cn.hd, ["token"], "HEAD")
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.hd = err[1]
    err = auth.verify(cn.hd["token"])
    return cn.call_next(nextc, err)

def mas_getauth(cn, nextc):
    err = check.contain(cn.pr, ["pass"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = master.gettoken(cn.pr["pass"])
    return cn.call_next(nextc, err)

def mas_chkauth(cn, nextc):
    err = check.contain(cn.hd, ["mastoken"], "HEAD")
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.hd = err[1]
    err = master.verify(cn.hd["mastoken"])
    return cn.call_next(nextc, err)


def mas_auth_user(cn, nextc):
    err = check.contain(cn.hd, ["token"], "HEAD")
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.hd = err[1]
    err = check.contain(cn.pr, ["pass"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = master.verify(cn.hd["token"], cn.pr["pass"])
    return cn.call_next(nextc, err)

def service_check(cn, nextc):
    ged_id = cn.rt["service"] if "service" in cn.rt else None
    cn.private["ged"] = ged(usr_id=cn.private["user"].id, ged_id=ged_id)
    err = cn.private["ged"].check_exist()
    return cn.call_next(nextc, err)

def gettuserbyemail(cn, nextc):
    email = cn.rt["email"] if "email" in cn.rt else None
    err = [True, {"id": user.fromemail(email)}, None]
    return cn.call_next(nextc, err)

def gettuserbyid(cn, nextc):
    id = cn.rt["id"] if "id" in cn.rt else None
    err = user(id).fromemail()
    return cn.call_next(nextc, err)

def check_user_service(cn, nextc):
    err=[True, None, None]
    return cn.call_next(nextc, err)

def add_user_service(cn, nextc):
    err=[True, None, None]
    return cn.call_next(nextc, err)

def signup(cn, nextc):
    err = check.contain(cn.pr, ["email", "password1", "password2"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = user()
    err = use.register(cn.pr["email"], cn.pr["password1"], cn.pr["password2"])
    cn.private["user"] = use

    return cn.call_next(nextc, err)

def signin(cn, nextc):
    err = check.contain(cn.pr, ["email", "password1"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = user()
    err = use.login(cn.pr["email"], cn.pr["password1"])
    cn.private["user"] = use

    return cn.call_next(nextc, err)

def authuser(cn, nextc):
    err = check.contain(cn.hd, ["usrtoken"], "HEAD")
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.hd = err[1]

    use = user()
    err = use.verify(cn.hd["usrtoken"])
    cn.private["user"] = use

    return cn.call_next(nextc, err)

def gettoken(cn, nextc):
    err = check.contain(cn.pr, [])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = cn.private["user"]
    err = use.gettoken()
    return cn.call_next(nextc, err)

def infos(cn, nextc):
    use = cn.private["user"]
    err = use.getdetails()
    return cn.call_next(nextc, err)

def upinfos(cn, nextc):
    err = check.contain(cn.pr, ["firstname", "lastname", "phone"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = cn.private["user"]
    err = use.updetails(cn.pr["phone"], cn.pr["firstname"], cn.pr["lastname"])
    return cn.call_next(nextc, err)

def addcard(cn, nextc):
    err = check.contain(cn.pr, ["crd_token"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = cn.private["user"]
    err = tpe.addcard(cn.pr["crd_token"], use.id)
    return cn.call_next(nextc, err)

def delcard(cn, nextc):
    err = check.contain(cn.pr, ["crd_token"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = cn.private["user"]
    err = tpe.delcard(cn.pr["crd_token"], use.id)
    return cn.call_next(nextc, err)

def listcard(cn, nextc):
    use = cn.private["user"]
    err = tpe.userdetails(use.id)
    return cn.call_next(nextc, err)

def cmd_decode(cn, nextc):
    err = check.contain(cn.pr, ["cmd_token"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    err = order.tokendata(cn.pr["cmd_token"])
    if err[0]:
        cn.private["cmd"] = err[1]
    return cn.call_next(nextc, err)

def pay(cn, nextc):
    err = check.contain(cn.pr, ["crd_token"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = cn.private["user"]
    err = tpe.pay(cn.private["cmd"]["price"], cn.pr["crd_token"], use.id)
    if err[0]:
        cn.private["pay_id"] = err[1]["id"]
    return cn.call_next(nextc, err)

def ordering(cn, nextc):
    use = cn.private["user"]
    err = order.do_order(use.id, cn.private["pay_id"], cn.private["cmd"], cn.pr["to_wallet"])
    return cn.call_next(nextc, err)

def payments(cn, nextc):
    use = cn.private["user"]
    err = tpe.payments(use.id)
    return cn.call_next(nextc, err)

def paymentdetails(cn, nextc):
    err = check.contain(cn.pr, ["chr_token"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = cn.private["user"]
    err = tpe.paymentdetails(cn.pr["chr_token"])
    return cn.call_next(nextc, err)

def orderdetails(cn, nextc):
    err = check.contain(cn.pr, ["order_id"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = cn.private["user"]
    err = order.orderdetails(use.id, cn.pr["order_id"])
    return cn.call_next(nextc, err)

def history(cn, nextc):
    use = cn.private["user"]
    err = order.orders(use.id)
    return cn.call_next(nextc, err)

def getitems(cn, nextc):
    err = item.items(cn.rt["website"])
    return cn.call_next(nextc, err)

def cart(cn, nextc):
    err = check.contain(cn.pr, ["command"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    err = item.panier(cn.rt["website"], cn.pr["command"])
    return cn.call_next(nextc, err)

def ged_check(cn, nextc):
    ged_id = cn.rt["ged"] if "ged" in cn.rt else None
    cn.private["ged"] = ged(usr_id=cn.private["user"].id, ged_id=ged_id)
    err = cn.private["ged"].check_exist()
    return cn.call_next(nextc, err)

def ged_check_user(cn, nextc):
    err = cn.private["ged"].check_user()
    return cn.call_next(nextc, err)

def ged_infos(cn, nextc):
    err = cn.private["ged"].infos()
    return cn.call_next(nextc, err)

def ged_merge(cn, nextc):
    err = check.contain(cn.pr, ["b64_1", "b64_2"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = sign.merge(cn.pr["b64_1"], cn.pr["b64_2"])
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
    err = folder(usr_id=cn.private["user"].id, ged_id=cn.private["ged"].ged_id).new(cn.pr["name"], cn.pr["folder_id"])
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

def ged_add_b64file(cn, nextc):
    err = check.contain(cn.pr, ["b64file"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = check.setnoneopt(cn.pr, ["folder_id"])
    err = file(usr_id=cn.private["user"].id,  ged_id=cn.private["ged"].ged_id).b64new(cn.pr["b64file"], cn.pr["folder_id"])
    return cn.call_next(nextc, err)

def ged_add_file(cn, nextc):
    err = check.contain(cn.req.files, ["file"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.req.forms = check.setnoneopt(cn.req.forms, ["folder_id"])
    err = file(usr_id=cn.private["user"].id,  ged_id=cn.private["ged"].ged_id).new(cn.req.files["file"], cn.req.forms["folder_id"])
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
    err = cn.private["ged"].share(doc_id, cn.pr["to"], cn.pr["access"])
    return cn.call_next(nextc, err)

def ged_move(cn, nextc):
    doc_id = cn.rt["doc"] if "doc" in cn.rt else None
    to_id = cn.rt["move"] if "move" in cn.rt else None
    err = cn.private["ged"].move(doc_id, to_id)
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
    cn.private["sign"] = sign(usr_id=cn.private["user"].id, ged_id=cn.private["ged"].ged_id)
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
    err = check.contain(cn.pr, ["placement"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    doc_id = cn.rt["doc"] if "doc" in cn.rt else None
    sign_id = cn.rt["sign"] if "sign" in cn.rt else None
    err = cn.private["sign"].sign_docs(sign_id, doc_id, cn.pr["placement"])
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
    odoo_id = cn.rt["odoo"] if "odoo" in cn.rt else None
    cn.private["odoo"] = odoo(usr_id=cn.private["user"].id, odoo_id=odoo_id)
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

def odoo_invoice(cn, nextc):
    invoice_id = cn.rt["bill"] if "bill" in cn.rt else None
    err = cn.private["odoo"].read_invoice(invoice_id)
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

def odoo_edit_contact(cn, nextc):
    err = check.contain(cn.pr, ["data", "method"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = cn.private["odoo"].edit_client(cn.pr["data"], cn.pr["method"])
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

def odoo_edit_bill(cn, nextc):
    err = check.contain(cn.pr, ["data", "method"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = cn.private["odoo"].edit_invoice(cn.pr["data"], cn.pr["method"])
    return cn.call_next(nextc, err)

def odoo_valid_bill(cn, nextc):
    err = check.contain(cn.pr, ["data"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = cn.private["odoo"].validate_fac(cn.pr["data"])
    return cn.call_next(nextc, err)

def odoo_get_bill(cn, nextc):
    bill_id = cn.rt["bill"] if "bill" in cn.rt else None
    access_token = cn.get["access_token"] if "access_token" in cn.get else None
    err = cn.private["odoo"].return_bill(bill_id, access_token)
    return cn.call_next(nextc, err)

def odoo_get_data(cn, nextc):
    data_name = cn.rt["get"] if "get" in cn.rt else None
    id = cn.get["id"] if "id" in cn.get else 0
    offset = cn.get["offset"] if "offset" in cn.get else 0
    limit = cn.get["limit"] if "limit" in cn.get else 10
    arg = cn.get["arg"] if "arg" in cn.get else None
    err = cn.private["odoo"].list_index(data_name, offset, limit, id, arg)
    return cn.call_next(nextc, err)

def contacter_check(cn, nextc):
    contacter_id = cn.rt["contacter"] if "contacter" in cn.rt else None
    cn.private["contacter"] = contacter(usr_id=cn.private["user"].id, contacter_id=contacter_id)
    err = cn.private["contacter"].check_exist()
    return cn.call_next(nextc, err)

def contacter_check_user(cn, nextc):
    err = cn.private["contacter"].check_user()
    return cn.call_next(nextc, err)

def contacter_infos(cn, nextc):
    err = cn.private["contacter"].infos()
    return cn.call_next(nextc, err)

def contacter_add_user(cn, nextc):
    err = check.contain(cn.pr, ["email", "role"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = cn.private["contacter"].create_user(cn.pr["email"], cn.pr["role"])
    return cn.call_next(nextc, err)

def wallet_check(cn, nextc):
    err = check.contain(cn.pr, ["to_wallet"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = eth_contract(user=cn.private["user"].id).check(cn.pr["to_wallet"])
    return cn.call_next(nextc, err)

def wallet_create(cn, nextc):
    err = eth_contract(user=cn.private["user"].id).create_account()
    return cn.call_next(nextc, err)

def wallets(cn, nextc):
    err = eth_contract(user=cn.private["user"].id).accounts()
    return cn.call_next(nextc, err)

def wallet_balance(cn, nextc):
    err = eth_contract(user=cn.private["user"].id).wallet_balance(cn.rt["wallet"])
    return cn.call_next(nextc, err)

def wallet_token(cn, nextc):
    err = eth_contract(cn.rt["token"], user=cn.private["user"].id).get_balance(cn.rt["wallet"])
    return cn.call_next(nextc, err)

def wallet_send(cn, nextc):
    err = check.contain(cn.pr, ["to", "amount"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    err = eth_contract(cn.rt["token"], user=cn.private["user"].id).send(cn.rt["wallet"], cn.pr["to"], int(cn.pr["amount"]))
    return cn.call_next(nextc, err)

def wallet_fund(cn, nextc):
    err = check.contain(cn.pr, ["amount"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    err = eth_contract(cn.rt["token"], user=cn.private["user"].id).fund(cn.rt["wallet"], int(cn.pr["amount"]))
    return cn.call_next(nextc, err)

def token_create(cn, nextc):
    err = check.contain(cn.pr, ["name", "symbol", "amount"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    err = eth_contract().deploy_contract(cn.pr["name"], cn.pr["symbol"], cn.pr["amount"])
    return cn.call_next(nextc, err)

def asset_info(cn, nextc):
    err = asset.info(cn.rt["asset"])
    return cn.call_next(nextc, err)


def asset_transfert(cn, nextc):
    err = check.contain(cn.pr, ["from_wallet", "to"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = asset.transfert(cn.private["user"].id, cn.pr["from_wallet"], cn.pr["to"], cn.rt["asset"])
    return cn.call_next(nextc, err)

try:
    with open('oa_asset.json') as json_file:
        OA_asset = json.load(json_file)
except:
    OA_asset = {}

def infos_asset(cn, nextc):
    type = cn.rt["asset"] if "asset" in cn.rt else None
    id = cn.rt[type] if type in cn.rt else None
    if type not in ["54daf43b-9226-4277-b9a2-155fa656a324"]:
        return cn.toret.add_error("invalid type", 404)
    id = str(id).split('.')[0]
    if id not in OA_asset:
        return cn.toret.add_error("invalid id", 404)
    err = [True, OA_asset[id], None]
    return cn.call_next(nextc, err)

def push_asset(cn, nextc):
    type = cn.rt["asset"] if "asset" in cn.rt else None
    if type not in ["54daf43b-9226-4277-b9a2-155fa656a324"]:
        return cn.toret.add_error("invalid type", 404)
    err = check.contain(cn.pr, ["name", "surname", "id", ["company_id", "email"]])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    if cn.pr["id"] in OA_asset:
        return cn.toret.add_error("invalid id", 404)
    cn.pr = err[1]
    d = {
          "name": cn.pr["name"],
          "surname": cn.pr["surname"],
          "offerd_by": {"CN": "Oalegal", "intern": cn.private["user"].id if "user" in cn.private else None},
          "date": str(int(round(time.time() * 1000))),
          "message": None,
	  "additional": {"company_id": cn.pr["company_id"], "email": cn.pr["email"]},
          "asset": {"name": "Millésime, Château de Quinsac"},
          "eth": {
              "contract": "Coming soon",
              "token_id": ["Coming soon"]
          }
    }
    OA_asset[cn.pr["id"]] = d
    with open('oa_asset.json', 'w') as outfile:
    	json.dump(OA_asset, outfile)
    err = [True, {}, None]
    return cn.call_next(nextc, err)

def infos_assets(cn, nextc):
    type = cn.rt["asset"] if "asset" in cn.rt else None
    if type not in ["54daf43b-9226-4277-b9a2-155fa656a324"]:
        return cn.toret.add_error("invalid type", 404)
    err = [True, OA_asset, None]
    return cn.call_next(nextc, err)

def doc_gen(cn, nextc):
    err = check.contain(cn.pr, ["data"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    err = pdf.doc_report(cn.pr["data"])
    return cn.call_next(nextc, err)

def admtoken(cn, nextc):
    err = check.contain(cn.pr, ["password"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    err = admin.gettoken(cn.pr["password"])
    return cn.call_next(nextc, err)


def authadmin(cn, nextc):
    err = check.contain(cn.hd, ["admtoken"], "HEAD")
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.hd = err[1]

    err = admin.verify(cn.hd["admtoken"])
    return cn.call_next(nextc, err)

def all_users(cn, nextc):
    err = admin.all_user()
    return cn.call_next(nextc, err)

def gettokenadm(cn, nextc):
    err = check.contain(cn.pr, ["usr_id"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]

    use = user(cn.pr["usr_id"])
    err = use.gettoken()
    return cn.call_next(nextc, err)
