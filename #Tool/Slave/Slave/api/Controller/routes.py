from .routesfunc import *

def setuproute(app, call):
    @app.route('/',                     ['OPTIONS', 'POST', 'GET'], lambda x = None: call([])                                        )
    @app.route('/service/<>/new',    	['OPTIONS', 'POST'],        lambda x = None: call([service, new])                            )
    def base():
        return
