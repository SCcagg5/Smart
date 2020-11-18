from .routesfunc import *

def setuproute(app, call):
    @app.route('/test/',                    ['OPTIONS', 'GET'],         lambda x = None: call([])                                                                                  )
    @app.route('/login/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([getauth]))

    @app.route('/signup/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, signup, signin, wallet_create, gettoken])                                          )
    @app.route('/signin/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, signin, gettoken])                                                                 )
    @app.route('/renew/',    	            ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, gettoken])                                                               )

    @app.route('/infos/',    	            ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, infos])                                                                  )
    @app.route('/updateinfos/',             ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, upinfos, infos])                                                         )

    @app.route('/addcard/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, addcard])                                                                )
    @app.route('/delcard/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, delcard])                                                                )
    @app.route('/listcard/',    	        ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, listcard])                                                               )

    @app.route('/order/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, cmd_decode, wallet_check, pay, ordering])                                )
    @app.route('/orderdetail/',             ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, orderdetails])                                                           )
    @app.route('/history/',    	            ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, history])                                                                )

    @app.route('/website/<>/items',    	    ['OPTIONS', 'GET'],         lambda x = None: call([myauth, getitems])                                                                         )
    @app.route('/website/<>/cart/',    	    ['OPTIONS', 'POST'],        lambda x = None: call([myauth, cart])                                                                             )
    @app.route('/payments/',    	        ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, payments])                                                               )
    @app.route('/paymentdetails/',          ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, paymentdetails])                                                         )

    @app.route('/dialogflow/',              ['OPTIONS', 'POST'],        lambda x = None: call([dialogflow], raw=True))
    @app.route('/ws/',                      ['OPTIONS', 'POST'],        lambda x = None: call([wscall], ws=True))
    def base():
        return
