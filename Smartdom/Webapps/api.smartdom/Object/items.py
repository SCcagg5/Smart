from .order import order
import uuid


class item:
    def items(website):
        items = {"veloone":[{
                    "id": "1234",
                    "title": "veloone_token",
                    "address": "",
                    "description": None,
                    "price":
                    { "amount": "10.00", "currency": "Eur"}
             }], "quinsac": [
                    {
                     "id": "1",
                     "title": "Une bouteille",
                     "description": None,
		             "token": {"address": "0x9520C239baE78a4a672a70370d85051FCD8DD6c9", "ind_value":3},
                     "assets": {"number": 1, "uuid": [], "name": "bouteille"},
                     "price":
                     { "amount": "30.00", "currency": "Eur"}
                    },
                    {
                     "id": "2",
                     "title": "Quatre bouteilles",
                     "description": None,
                     "token": {"address": "0x9520C239baE78a4a672a70370d85051FCD8DD6c9", "ind_value":3},
                     "assets": {"number": 4, "uuid": [], "name": "bouteille"},
                     "price":
                     { "amount": "120.00", "currency": "Eur"}
                    },
                    {
                     "id": "3",
                     "title": "Caisse de bouteilles",
                     "description": "12 bouteilles",
                     "token": {"address": "0x9520C239baE78a4a672a70370d85051FCD8DD6c9", "ind_value":3},
                     "assets": {"number": 12, "uuid": [], "name": "bouteille"},
                     "price":
                     { "amount": "360.00", "currency": "Eur"}
                    },
                    {
                     "id": "4",
                     "title": "Palette de bouteilles",
                     "description": "600 bouteilles",
                     "token": {"address": "0x9520C239baE78a4a672a70370d85051FCD8DD6c9", "ind_value":3},
                     "assets": {"number": 600, "uuid": [], "name": "bouteille"},
                     "price":
                     { "amount": "15000.00", "currency": "Eur"}
                    }
                ]}
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
             }], "quinsac": [
                    {
                     "id": "1",
                     "title": "Une bouteille",
                     "description": None,
                             "token": {"address": "0x9520C239baE78a4a672a70370d85051FCD8DD6c9", "ind_value":3},
                     "assets": {"number": 1, "uuid": [], "name": "bouteille"},
                     "price":
                     { "amount": "30.00", "currency": "Eur"}
                    },
                    {
                     "id": "2",
                     "title": "Quatre bouteilles",
                     "description": None,
                     "token": {"address": "0x9520C239baE78a4a672a70370d85051FCD8DD6c9", "ind_value":3},
                     "assets": {"number": 4, "uuid": [], "name": "bouteille"},
                     "price":
                     { "amount": "120.00", "currency": "Eur"}
                    },
                    {
                     "id": "3",
                     "title": "Caisse de bouteilles",
                     "description": "12 bouteilles",
                     "token": {"address": "0x9520C239baE78a4a672a70370d85051FCD8DD6c9", "ind_value":3},
                     "assets": {"number": 12, "uuid": [], "name": "bouteille"},
                     "price":
                     { "amount": "360.00", "currency": "Eur"}
                    },
                    {
                     "id": "4",
                     "title": "Palette de bouteilles",
                     "description": "600 bouteilles",
                     "token": {"address": "0x9520C239baE78a4a672a70370d85051FCD8DD6c9", "ind_value":3},
                     "assets": {"number": 600, "uuid": [], "name": "bouteille"},
                     "price":
                     { "amount": "15000.00", "currency": "Eur"}
                    }
                ]}
        if website not in items:
            return [False, "invalid website", 400]
        res = []
        price = 0.00
        for i in commande:
            for i2 in items[website]:
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
