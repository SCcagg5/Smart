from .routesfunc import *

def setuproute(app, call):
    @app.route('/test/',                    ['OPTIONS', 'GET'],         lambda x = None: call([])                                            )
    @app.route('/login/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([getauth])                                     )

    @app.route('/signup/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, signup, signin, wallet_create, gettoken]))
    @app.route('/signin/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, signin, gettoken])                    )
    @app.route('/renew/',    	            ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, gettoken])                  )

    @app.route('/infos/',    	            ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, infos])                     )
    @app.route('/updateinfos/',             ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, upinfos, infos])            )

    @app.route('/addcard/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, addcard])                   )
    @app.route('/delcard/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, delcard])                   )
    @app.route('/listcard/',    	        ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, listcard])                  )

    @app.route('/order/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, cmd_decode, wallet_check, pay, ordering]) )
    @app.route('/orderdetail/',             ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, orderdetails])              )
    @app.route('/history/',    	            ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, history])                   )

    @app.route('/website/<>/items',    	    ['OPTIONS', 'GET'],         lambda x = None: call([myauth, getitems])                            )
    @app.route('/website/<>/cart/',    	    ['OPTIONS', 'POST'],        lambda x = None: call([myauth, cart])                                )
    @app.route('/payments/',    	        ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, payments])                  )
    @app.route('/paymentdetails/',          ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, paymentdetails])            )

    @app.route('/asset/<>/infos',    	    ['OPTIONS', 'GET'],         lambda x = None: call([myauth, asset_info])                          )
    @app.route('/asset/<>/transfert',       ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, asset_transfert])           )


    @app.route('/ged',                      ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_get_content])          )
    @app.route('/ged/<>',                   ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_get_content])          )
    @app.route('/ged/addfolder',            ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_add_folder])           )
    @app.route('/ged/addfile',              ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_add_file])             )
    @app.route('/ged/<>/share',             ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_share])                )

    @app.route('/wallet/create/',           ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, wallet_create])             )
    @app.route('/wallets',                  ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, wallets])                   )
    @app.route('/wallet/<>',                ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, wallet_balance])            )

    @app.route('/wallet/<>/token/<>',       ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, wallet_token])              )
    @app.route('/wallet/<>/token/<>/send',  ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, wallet_send])               )
    @app.route('/wallet/<>/token/<>/fund',  ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, wallet_fund])               )

    #@app.route('/token/new',                ['OPTIONS', 'POST'],        lambda x = None: call([myauth, token_create])                         )

    @app.route('/admin/login/',             ['OPTIONS', 'POST'],        lambda x = None: call([admtoken])                                    )
    @app.route('/admin/allusers/',          ['OPTIONS', 'GET'],         lambda x = None: call([authadmin, all_users])                        )
    @app.route('/admin/spoof/',             ['OPTIONS', 'POST'],        lambda x = None: call([authadmin, gettokenadm])                      )
    def base():
        return
