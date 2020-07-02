from Model.basic import check, auth
from Object.users import user
from Object.tpe import tpe
from Object.order import order
from Object.items import item
from Object.admin import admin
from Object.ether import eth_contract
import json

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
    err = order.do_order(use.id, cn.private["pay_id"], cn.private["cmd"])
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
