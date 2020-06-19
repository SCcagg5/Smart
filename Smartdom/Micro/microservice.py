import xmlrpc.client
import odoolib
import datetime
import flask
from flask import request, jsonify


app = flask.Flask(__name__)
app.config["DEBUG"] = True

connection = odoolib.get_connection(
    hostname="demoochsner.libre-it.ch",
    database='oschner',
    login="admin",
    password="ish2GohG5yah",
    port=443,
    protocol="jsonrpcs"
)


@app.route('/test', methods=['GET'])
def _test():
    parametre = request.json




    return parametre.get("id")

@app.route('/client', methods=['POST'])

def _createClient ():
 parametre = request.json
 partner_model = connection.get_model('res.partner')
 a_turner = partner_model.create({
   'name':parametre.get("name"),
    'street':parametre.get("street"),
    'zip':parametre.get("zip"),
    'city':parametre.get("city"),
    'country_id':parametre.get("country_id"),
    'phone':parametre.get("phone"),
    'email':parametre.get("email")

})

 return {"statut":"sucess"}



@app.route('/facture', methods=['POST'])

def _createFacture ():
 parametre = request.json
 partner_model = connection.get_model('res.partner')
 partner_id = partner_model.search([('email','=',str(parametre.get("email")))])[0]
 invoice_model = connection.get_model('account.invoice')
 x = datetime.datetime.now()
 a_turner = invoice_model.create({
         'partner_id': partner_id,

         'date_invoice':x.strftime('%Y-%m-%d'),




     })

 return {"statut":"sucess"}




app.run()





