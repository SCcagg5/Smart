from gevent import monkey;  monkey.patch_all()
from bottle import Bottle, run, route, response, request, hook, error, BaseRequest
from Model.basic import ret, check, callnext
from Controller.routes import *
import json as JSON
import os
from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler

app = Bottle()
host =      str(os.getenv('API_HOST', '0.0.0.0'))
port =      int(os.getenv('API_PORT', 8080))
weba =      str(os.getenv('API_WEBA', '*'))
mod =       str(os.getenv('API_MOD', 'PROD'))
secret =    str(os.getenv('API_SCRT', '!@ws4RT4ws212@#%'))
password =  str(os.getenv('API_PASS', 'password'))
adm_pass =  str(os.getenv('API_ADM', None))
db_user =   str(os.getenv('DB_USER', 'password'))
db_pass =   str(os.getenv('DB_PASS', 'password'))

call = lambda x = [] , ws = False, raw = False : callnext(request, response).call(x, ws, raw)

BaseRequest.MEMFILE_MAX = 1024 * 1024 * 256

@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = weba
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = '*'


@app.error()
@app.error(404)
@app.error(405)
def error(error):
    toret = ret(request.path, check.json(request))
    toret.add_error(error.body, int(error.status.split(" ")[0]))
    response.content_type = 'application/json'
    return JSON.dumps(toret.ret())

if __name__ == '__main__':
    setuproute(app, call)
    server = WSGIServer((host, port), app, handler_class=WebSocketHandler)
    print(f"access @ http://{host}:{port}/websocket.html")
    server.serve_forever()
