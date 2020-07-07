import json
import time
from .sql import sql
import jwt


class asset:
    def info(uuid):
        res = sql.get("SELECT `asset_id`, `asset_name`, `token_val`, `email`, `fname`, `lname`, `assets`.`date` FROM `assets` INNER JOIN `user` ON user.id = assets.user_id INNER JOIN `userdetails` ON user.id = assets.user_id WHERE asset_id = %s AND ACTIVE = 1", (uuid))
        if len(res) == 0:
            return [False, "Invalid uuid", 404]
        res = res[0]
        info = {
            "asset": uuid,
            "name": res[1],
            "value": json.loads(res[2]),
            "owner": {
                "email": str(res[3]),
                "name": str(res[4]) + str(res[5]),
                "owner_since": str(res[6])
            }
        }
        return [True, info, False]
