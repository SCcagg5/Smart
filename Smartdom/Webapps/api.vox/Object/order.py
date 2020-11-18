import json
import time
from .sql import sql
from .tpe import tpe
from .ether import eth_contract
import jwt

class order:
    def do_order(user_id, pay_id, details_or, to_wallet):
        date = str(int(round(time.time() * 1000)))
        try:
            details = json.dumps(details_or)
        except:
            return [False, "Invalid json", 401]
        succes = sql.input("INSERT INTO `orders` (`id`, `user_id`, `payment_id`, `date`) VALUES (NULL, %s, %s, %s)", \
        (user_id, pay_id, date))
        if not succes:
            return [False, "data input error12", 500]
        res = sql.get("SELECT `id`  FROM `orders` WHERE `user_id` = %s AND `date` = %s", (user_id, date))
        if len(res) == 0:
            return [False, "data read error", 500]
        order_id = str(res[0][0])
        succes = order.orderup(order_id, details)
        if not succes[0]:
            return succes
        return order.asset_tracking(user_id, order_id, pay_id, date, details_or, to_wallet)


    def orderup(order_id, details):
        succes = sql.input("INSERT INTO `orderdetails` (`id`, `order_id`, `json`) VALUES (NULL, %s, %s)", \
        (order_id, details))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"order_id": order_id}, None]

    def asset_tracking(user_id, order_id, pay_id, date, details, to_wallet):
        for i in details["cart"]:
            if "assets" in i:
                for i2 in i["assets"]["uuid"]:
                    sql.input("INSERT INTO `assets` (`id`, `asset_id`, `asset_name`, `token_val`, `user_id`, `order_id`, `pay_id`, `date`, `active`) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s)", \
                    (i2, i["assets"]["name"], json.dumps(i["token"]), user_id, order_id, pay_id, date, 1))
            if "token" in i:
                eth_contract(i["token"]["address"], user=user_id).fund(to_wallet, i["number"] * i["token"]["ind_value"])
        return [True, {"order_id": order_id}, None]

    def orders(user_id):
        res = sql.get("SELECT `id`, `date`  FROM `orders` WHERE `user_id` = %s", (user_id))
        orders = []
        for i in res:
            orders.append({
                "id": i[0],
                "date": i[1]
            })
        return [True, {"orders": orders}, None]

    def orderdetails(user_id, order_id):
        order = {}
        res = sql.get("SELECT `date`, `payment_id` FROM `orders` WHERE `id` = %s AND user_id = %s", (order_id, user_id))
        if len(res) == 0:
            return [False, "Invalid order id / user id match", 400]
        order["date"] = res[0][0]
        order["payment"] = res[0][1]
        res = sql.get("SELECT `json` FROM `orderdetails` WHERE `order_id` = %s", (order_id))
        if len(res) == 0:
            return [False, "Invalid order id", 400]
        order["details"] = json.loads(res[0][0])
        order["payment"] = tpe.fromid(order["payment"])[1]
        return [True, {"order": order}, None]

    def gettoken(res):
        secret =  "ijshzgoubzsdogbzosengozwsbdg9ouigubnzwsoeg"
        ret = jwt.encode({"data": res}, str(secret)).decode('utf-8')
        return ret

    def tokendata(token = None):
        secret = "ijshzgoubzsdogbzosengozwsbdg9ouigubnzwsoeg"
        decoded = None
        try:
            decoded = jwt.decode(token, str(secret), algorithms=['HS256'])["data"]
        except:
            return  [False, "Invalid cmd_token", 400]
        return [True, decoded, None]
