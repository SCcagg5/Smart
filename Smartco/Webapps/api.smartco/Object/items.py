from .order import order
import uuid


class item:
    def items():
        items =[]
        res = items
        return [True, res, None]

    def panier(commande):
        items = []
        res = []
        price = 0.00
        for i in commande:
            for i2 in items:
                if i2["id"] == i["id"]:
                    t = i2
                    t["number"] = int(1 if "number" not in i else i["number"] if int(i["number"]) > 0 else 1)
                    if "assets" in t:
                        for i3 in range(t["assets"]["number"] * t["number"]):
                            t["assets"]["uuid"].append(str(uuid.uuid4()))
                    res.append(t)
                    price += float(t["price"]["amount"]) * t["number"]
        token = order.gettoken({"price": price, "cart": res})
        ret = {"cart": res, "price": price, "cmd_token": token}
        return [True, ret, None]
