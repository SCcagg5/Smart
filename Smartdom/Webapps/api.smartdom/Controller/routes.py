from .routesfunc import *

def setuproute(app, call):
    @app.route('/test/',                    ['OPTIONS', 'GET'],         lambda x = None: call([])                                                                                  )
    @app.route('/login/',    	            ['OPTIONS', 'POST'],        lambda x = None: call([getauth]))


    @app.route('/slave',                    ['OPTIONS', 'POST'],        lambda x = None: call([mas_getauth]))
    @app.route('/slave/auth',               ['OPTIONS', 'GET'],         lambda x = None: call([mas_chkauth, myauth]))
    @app.route('/slave/auth',               ['OPTIONS', 'POST'],        lambda x = None: call([mas_chkauth, getauth]))
    @app.route('/slave/auth/user',          ['OPTIONS', 'GET'],         lambda x = None: call([mas_chkauth, myauth, authuser]))
    @app.route('/slave/user/email/<>',      ['OPTIONS', 'GET'],         lambda x = None: call([mas_chkauth, gettuserbyemail]))
    @app.route('/slave/user/id/<>',         ['OPTIONS', 'GET'],         lambda x = None: call([mas_chkauth, gettuserbyid]))
    @app.route('/slave/auth/user',          ['OPTIONS', 'POST'],        lambda x = None: call([mas_chkauth, myauth, signin, gettoken]))
    @app.route('/slave/auth/user/new',      ['OPTIONS', 'POST'],        lambda x = None: call([mas_chkauth, myauth, signup, signin, gettoken]))
    @app.route('/slave/service/<>/user',    ['OPTIONS', 'GET'],         lambda x = None: call([mas_chkauth, myauth, authuser, service_check, ged_check_user]))
    @app.route('/slave/service/<>/user',    ['OPTIONS', 'POST'],        lambda x = None: call([mas_chkauth, myauth, authuser, service_check, add_user_service]))

    @app.route('/ws/<>',                    ['OPTIONS', 'GET'],         lambda x = None: call([wscall], True)                                                                          )

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


    @app.route('/ged/<>',                   ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_infos])                                  )
    @app.route('/ged/<>/adduser',           ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_add_user])                               )
    @app.route('/ged/<>/doc',               ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_get_content])                            )
    @app.route('/ged/<>/doc/search',        ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_search])                                 )
    @app.route('/ged/<>/doc/<>',            ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_get_content])                            )
    @app.route('/ged/<>/doc/<>',            ['OPTIONS', 'PUT'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_update])                                 )
    @app.route('/ged/<>/doc/<>',            ['OPTIONS', 'DELETE'],       lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_delete])                                 )
    @app.route('/ged/<>/doc/addfolder',     ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_add_folder])                             )
    @app.route('/ged/<>/doc/addfile',       ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_add_file])                               )
    @app.route('/ged/<>/doc/addb64file',    ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_add_b64file])                               )
    @app.route('/ged/<>/doc/<>/share',      ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_share]))
    @app.route('/ged/<>/doc/<>/move/',    ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_move]))
    @app.route('/ged/<>/doc/<>/move/<>',    ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_move]))
    @app.route('/ged/<>/sign',              ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_sign_init, ged_sign_new]))
    @app.route('/ged/<>/sign',              ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_sign_init, ged_sign_get_all]))
    @app.route('/ged/<>/sign/<>',           ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_sign_init, ged_sign_get]))
    @app.route('/ged/<>/sign/<>',           ['OPTIONS', 'DELETE'],       lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_sign_init, ged_sign_delete]))
    @app.route('/ged/<>/doc/<>/sign/<>',    ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_sign_init, ged_sign_sign]) )
    @app.route('/ged/<>/merge',           ['OPTIONS', 'POST'],       lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_merge]))
    @app.route('/ged/<>/report',           ['OPTIONS', 'POST'],       lambda x = None: call([myauth, authuser, ged_check, ged_check_user, doc_gen]))


    @app.route('/ged/<>/room',              ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_room_new])                                  )
    @app.route('/ged/<>/rooms',             ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_room_all])                                  )
    @app.route('/ged/<>/rooms/<>/user',     ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_room_all])                                  )
    @app.route('/ged/<>/rooms/<>/user',     ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_room_all])                                  )
    @app.route('/ged/<>/rooms/<>/user',     ['OPTIONS', 'DELETE'],       lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_room_all])                                  )
    @app.route('/ged/<>/rooms/<>/file',     ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_room_file_new])                             )
    @app.route('/ged/<>/rooms/<>/file',     ['OPTIONS', 'DELETE'],       lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_room_all])                                  )
    @app.route('/ged/<>/rooms/<>/files',     ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, ged_room_files_get])                           )

    @app.route('/asset/<>/<>',               ['OPTIONS', 'GET'],          lambda x = None: call([myauth, infos_asset])                           )
    @app.route('/asset/<>',                  ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, infos_assets])                           )
    @app.route('/asset/<>', 		     ['OPTIONS', 'POST'],          lambda x = None: call([myauth, authuser, push_asset])                           )

    @app.route('/odoo/<>/odoo',              ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, odoo_check, odoo_infos]) )
    @app.route('/odoo/<>/users',             ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, odoo_check, odoo_users]) )
    @app.route('/odoo/<>/user/<>',           ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, odoo_check, odoo_user]) )
    @app.route('/odoo/<>/user',              ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, odoo_check, odoo_add_user]) )
    @app.route('/odoo/<>/companies',         ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, odoo_check, odoo_companies]) )
    @app.route('/odoo/<>/company/<>',        ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, odoo_check, odoo_company]) )
    @app.route('/odoo/<>/company',           ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, odoo_check, odoo_add_company]) )
    @app.route('/odoo/<>/contact',        ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, odoo_check, odoo_edit_contact]) )
    @app.route('/ged/<>/odoo/<>/case',       ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, ged_check, ged_check_user, odoo_check, odoo_case]) )
    @app.route('/ged/<>/odoo/<>/case',       ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, ged_check, ged_check_user, odoo_check, odoo_add_case]) )
    @app.route('/odoo/<>/bill/<>',           ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, odoo_check, odoo_get_bill]) )
    @app.route('/odoo/<>/bill/<>/details',   ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, odoo_check, odoo_invoice]) )
    @app.route('/odoo/<>/bill/edit',         ['OPTIONS', 'POST'],          lambda x = None: call([myauth, authuser, odoo_check, odoo_edit_bill]) )
    @app.route('/odoo/<>/bill',              ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, odoo_check, odoo_add_bill]) )
    @app.route('/odoo/<>/bill/validate',     ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, odoo_check, odoo_valid_bill]) )
    @app.route('/odoo/<>/get/<>',            ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, odoo_check, odoo_get_data]) )
    @app.route('/contacter/<>',             ['OPTIONS', 'GET'],          lambda x = None: call([myauth, authuser, contacter_check, contacter_check_user, contacter_infos])                )
    @app.route('/contacter/<>/adduser',     ['OPTIONS', 'POST'],         lambda x = None: call([myauth, authuser, contacter_check, contacter_check_user, contacter_add_user])             )

    @app.route('/asset/<>/infos',    	    ['OPTIONS', 'GET'],         lambda x = None: call([myauth, asset_info])                                                                       )
    @app.route('/asset/<>/transfert',       ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, asset_transfert])                                                        )

    @app.route('/wallet/create/',           ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, wallet_create])                                                          )
    @app.route('/wallets',                  ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, wallets])                                                                )
    @app.route('/wallet/<>',                ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, wallet_balance])                                                         )

    @app.route('/wallet/<>/token/<>',       ['OPTIONS', 'GET'],         lambda x = None: call([myauth, authuser, wallet_token])                                                           )
    @app.route('/wallet/<>/token/<>/send',  ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, wallet_send])                                                            )
    @app.route('/wallet/<>/token/<>/fund',  ['OPTIONS', 'POST'],        lambda x = None: call([myauth, authuser, wallet_fund])                                                            )

    #@app.route('/token/new',                ['OPTIONS', 'POST'],        lambda x = None: call([myauth, token_create])                                                                    )

    @app.route('/admin/login/',             ['OPTIONS', 'POST'],        lambda x = None: call([admtoken])                                                                                 )
    @app.route('/admin/allusers/',          ['OPTIONS', 'GET'],         lambda x = None: call([authadmin, all_users])                                                                     )
    @app.route('/admin/spoof/',             ['OPTIONS', 'POST'],        lambda x = None: call([authadmin, gettokenadm])                                                                   )
    def base():
        return
