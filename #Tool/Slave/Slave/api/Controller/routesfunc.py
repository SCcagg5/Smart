from Model.basic import check, auth
from Object.wordpress import wordpress
from Object.odoo import odoo
import json

def service(cn, nextc):
    service_id = cn.rt["service"] if "service" in cn.rt else None
    if service_id is None:
        return cn.toret.add_error("Invalid use", 400)
    services = {"wordpress": wordpress, "odoo": odoo}
    if service_id not in services:
        return cn.toret.add_error("Invalid service", 400)
    cn.private["service"] = services[service_id]()
    err = [True, {}, 200]
    return cn.call_next(nextc, err)

def new(cn, nextc):
    err = check.contain(cn.pr, [])
    cn.pr = err[1]
    err = cn.private["service"].new(cn.pr)
    return cn.call_next(nextc, err)
