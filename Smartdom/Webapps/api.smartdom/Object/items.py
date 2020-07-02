from .order import order


class item:
    def items(website):
        items = {"veloone":[{
                "id": "1234",
                "title": "veloone_token",
                "address": "",
                "description": None,
                "price":
                { "amount": "10.00", "currency": "Eur"}
        }]}
        if website not in items:
            return [False, "invalid website", 400]
        res = items[website]
        return [True, res, None]

    def panier(website, commande):
        items = {"veloone":[{
                "id": "1234",
                "title": "veloone_token",
                "address": "",
                "description": None,
                "price":
                { "amount": "10.00", "currency": "Eur"}
         }]}
        if website not in items:
            return [False, "invalid website", 400]
        res = []
        price = 0.00
        for i in commande:
            for i2 in items[website]:
                if i2["id"] == i["id"]:
                    t = i2
                    t["number"] = int(1 if "number" not in i else i["number"] if int(i["number"]) > 0 else 1)
                    res.append(t)
                    price += float(t["price"]["amount"]) * t["number"]
        token = order.gettoken({"price": price, "cart": res})
        ret = {"cart": res, "price": price, "cmd_token": token}
        return [True, ret, None]
