from Model.basic import check, auth
from Object.wordpress import wordpress
from Object.odoo import odoo
import json

def service(cn, nextc):
    service = cn.rt["service"] if "service" in cn.rt else None
    if service is None:
        return cn.toret.add_error("Invalid use", 400)
    service_id = cn.rt[service] if service in cn.rt else None
    services = {"wordpress": wordpress, "odoo": odoo}
    if service not in services:
        return cn.toret.add_error("Invalid service", 400)
    err = check.contain(cn.pr, ["user_id"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    cn.private["service"] = services[service](cn.pr["user_id"], service_id)
    err = [True, {}, 200]
    return cn.call_next(nextc, err)

def new(cn, nextc):
    err = check.contain(cn.pr, ["hostnames", "user_id"])
    if not err[0]:
        return cn.toret.add_error(err[1], err[2])
    cn.pr = err[1]
    err = cn.private["service"].new(cn.pr["hostnames"])
    return cn.call_next(nextc, err)
