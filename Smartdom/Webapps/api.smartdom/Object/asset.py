import json
import time
from .sql import sql
import jwt
from .ether import eth_contract
from .users import user


class asset:
    def info(uuid):
        res = sql.get("SELECT `asset_id`, `asset_name`, `token_val`, `email`, `assets`.`date`, `fname`, `lname` FROM `assets` INNER JOIN `user` ON user.id = assets.user_id INNER JOIN `userdetails` ON user.id = assets.user_id WHERE asset_id = %s AND ACTIVE = 1", (uuid, ))
        print(res)
        if len(res) == 0:
            res = sql.get("SELECT `asset_id`, `asset_name`, `token_val`, `email`, `assets`.`date` FROM `assets` INNER JOIN `user` ON user.id = assets.user_id WHERE asset_id = %s AND ACTIVE = 1", (uuid, ))
            if len(res) == 0:
                return [False, "Invalid uuid", 404]
            ret = (*res[0], None , None)
        else:
            ret = res[0]
        info = {
            "asset": uuid,
            "name": ret[1],
            "value": json.loads(ret[2]),
            "owner": {
                "email": str(ret[3]),
                "lastname": ret[6],
                "firstname": ret[5],
                "owner_since": str(ret[4])
            }
        }
        return [True, info, False]

    def transfert(from_id, from_wallet, to_email, uuid):
        date = str(int(round(time.time() * 1000)))
        info = asset.info(uuid)
        if not info[0]:
            return info
        info = info[1]
        to_id = user.fromemail(to_email)

        if not to_id:
            return [False, "User does not exist", 404]
        to_act = eth_contract(user=to_id).accounts()

        if not to_act[0]:
            return [False, "User does not have a wallet", 400]
        if len(to_act[1]["accounts"]) == 0:
            return [False, "User does not have a wallet", 400]
            
        to_act = to_act[1]["accounts"][0]
        token = info["value"]["address"]
        nb = info["value"]["ind_value"]
        contract = eth_contract(token, user=from_id)

        balance = contract.get_balance(from_wallet)
        if not balance[0]:
            return balance
        balance = balance[1]["balance"]
        if int(balance) < int(nb):
            return [False, "Minimum amount of token is invalid", 400]

        sql.input("UPDATE assets SET active = 0 WHERE asset_id = %s", (uuid))
        sql.input("INSERT INTO `assets` (`id`, `asset_id`, `asset_name`, `token_val`, `user_id`, `order_id`, `pay_id`, `date`, `active`) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s)", \
        (uuid, info["name"], json.dumps(info["value"]), to_id, None, None, date, 1))

        res = contract.send(from_wallet, to_act, nb)
        return [True, {}, None]
