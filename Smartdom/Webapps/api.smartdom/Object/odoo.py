import pypi_xmlrpc
import xmlrpc.client
import uuid
import time
import json
import requests
import base64
from datetime import date
from .ged import folder
from .sql import sql

class odoo:
    def __init__(self, usr_id = -1, odoo_id = -1):
        self.usr_id = str(usr_id)
        self.odoo_id = str(odoo_id)
        self.opt = {}
        self.uid = None

    def case(self, ged_id):
        ret = []
        i = 0
        res = sql.get("SELECT `client_id`, `name`, `type`, `folder_id`, `date`, `team` FROM odoo_case WHERE ged_id = %s", (ged_id))
        while i < len(res):
          ret.append({"client_id": res[i][0],
 		      "name": res[i][1],
 		      "type": res[i][2],
		      "folder_id": res[i][3],
  		      "date": res[i][4],
		      "team": json.loads(res[i][5])})
          i += 1
        return [True, {"client": ret}, None]

    def new_case(self, client_id, type, name, folder_id, team, ged_id):
        fol = folder(self.usr_id, ged_id).new(name, folder_id)
        if not fol[0]:
           return fol
        folder_id = fol[1]["id"]
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        succes = sql.input("INSERT INTO `odoo_case` (`id`,`ged_id`, `user_id`, `client_id`, `name`, `type`, `team`, `folder_id`, `date`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", \
        (id, ged_id, self.usr_id, client_id, name, type, json.dumps(team), folder_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"case_id": id, "folder_id": folder_id}, None]

    def version(self):
        common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(self.opt['url']))
        ret = common.version()
        return [True, ret, None]

    def connection(self):
        res = sql.get("SELECT `url`, `db`, `user`, `password`, `lang` FROM odoo WHERE id = %s", (self.odoo_id))
        if len(res) < 1:
            return [False, "Invalid odoo id", 400]
        self.opt = {
	        "url": res[0][0],
            "username" : res[0][2],
            "db": res[0][1],
            "password": res[0][3],
            "lang": res[0][4]
        }
        try:
            common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(self.opt['url']))
            self.uid = int(common.authenticate(self.opt['db'],
                                               self.opt['username'],
                                               self.opt['password'], {}))
        except:
            return [False, "Error during the connection to odoo instance", 500]
        return [True, {}, None]

    def list_index(self, name, offset = 0, limit = 10, id = 0):
            data = {
                    "product_id" : {"index": "product.product",
                                         "arg": [["|", ["company_id", "=", False], ["company_id", "=", 1]]],
                                         "opt": {'offset': int(offset), 'limit': int(limit)},
                                         "model": "search"
                                        },
                    "product": {"index": "product.product",
                                         "arg": [[int(id)]],
                                         "opt": {},
                                         "model": "read"
                                        },
                    "tax_id":      {"index": "account.tax",
                                         "arg": [[["type_tax_use", "=?", "sale"], ["company_id", "=", 1]]],
                                         "opt": {'offset': int(offset), 'limit': int(limit)},
                                         "model": "search"
                                        },
                    "city_zip_id": { "index": "res.city.zip", "arg": [[]], "opt": {}, "model": "search"},
                    "country_id": { "index": "res.country", "arg": [[]], "opt": {}, "model": "search"},
                    "country_state_id": { "index": "res.country.state", "arg": [[]], "opt": {}, "model": "search"},
                    "tax": {"index": "account.tax",
                                         "arg": [[int(id)]],
                                         "opt": {},
                                         "model": "read"
                                        },
                    "payment_term_id": {"index": "account.payment.term",
                            "arg": [[]],
                            "opt": {'offset': int(offset), 'limit': int(limit)},
                            "model": "search"
                         },
                    "payment_term": {"index": "account.payment.term",
                                         "arg": [[int(id)]],
                                         "opt": {},
                                         "model": "read"
                                        },
                    "product_category_id": {"index": "product.category",
                            "arg": [[]],
                            "opt": {'offset': int(offset), 'limit': int(limit)},
                            "model": "search"
                         },
                    "product_category": {"index": "product.category",
                            "arg": [[int(id)]],
                            "opt": {},
                            "model": "read"
                         },
                    "bill_id": {"index" :"account.move",
                            "arg": [[["type", "=", "out_invoice"]]],
                            "opt": {},
                            "model": "search"
                            },
                    "bill": {"index": "account.move",
                            "arg": [[int(id)]],
                            "opt": {},
                            "model": "read"
                         },
                    "line_get": {"index": "account.move.line",
			    "arg": [["sequence","move_name","product_id","name","account_id","analytic_account_id","analytic_tag_ids","quantity","product_uom_id","price_unit","discount","tax_ids","price_subtotal","price_total","partner_id","amount_currency","currency_id","debit","credit","date","date_maturity","tax_line_id","tax_repartition_line_id","tag_ids","tax_base_amount","tax_exigible","company_id","company_currency_id","recompute_tax_line","display_type","is_rounding_line","exclude_from_invoice_tab","account_internal_type","always_set_currency_id"]],
			    "opt": {},
			    "model": "default_get"
			},
		    "bill_line_pattern": {"pattern": {
  "invoice_line_ids": [
    [
      0,
      "virtual_238",
      {
        "sequence": 10,
        "account_id": 104,
        "quantity": 1,
        "discount": 0,
        "partner_id": False,
        "currency_id": False,
        "debit": 0,
        "credit": 30,
        "display_type": False,
        "product_id": 1,
        "name": "[testes] tesarticle",
        "analytic_account_id": False,
        "analytic_tag_ids": [
          [
            6,
            False,
            []
          ]
        ],
        "product_uom_id": 1,
        "price_unit": 30,
        "tax_ids": [
          [
            6,
            False,
            [
              13
            ]
          ]
        ],
        "amount_currency": 0,
        "date_maturity": False,
        "tag_ids": [
          [
            6,
            False,
            [
              17
            ]
          ]
        ],
        "recompute_tax_line": False,
        "is_rounding_line": False,
        "exclude_from_invoice_tab": False
      }
    ]
  ],
  "line_ids": [
    [
      0,
      "virtual_238",
      {
        "account_id": 104,
        "sequence": 10,
        "name": "[testes] tesarticle",
        "quantity": 1,
        "price_unit": 30,
        "discount": 0,
        "debit": 0,
        "credit": 30,
        "amount_currency": 0,
        "date_maturity": False,
        "currency_id": False,
        "partner_id": False,
        "product_uom_id": 1,
        "product_id": 1,
        "payment_id": False,
        "tax_ids": [
          [
            6,
            False,
            [
              13
            ]
          ]
        ],
        "tax_base_amount": 0,
        "tax_exigible": True,
        "tax_repartition_line_id": False,
        "tag_ids": [
          [
            6,
            False,
            [
              17
            ]
          ]
        ],
        "analytic_account_id": False,
        "analytic_tag_ids": [
          [
            6,
            False,
            []
          ]
        ],
        "recompute_tax_line": False,
        "display_type": False,
        "is_rounding_line": False,
        "exclude_from_invoice_tab": False
      }
    ],
    [
      0,
      "virtual_260",
      {
        "account_id": 76,
        "sequence": 10,
        "name": "TVA due a 7.7% (TN)",
        "quantity": 1,
        "price_unit": 2.31,
        "discount": 0,
        "debit": 0,
        "credit": 2.31,
        "amount_currency": 0,
        "date_maturity": False,
        "currency_id": False,
        "partner_id": False,
        "product_uom_id": False,
        "product_id": False,
        "payment_id": False,
        "tax_ids": [
          [
            6,
            False,
            []
          ]
        ],
        "tax_base_amount": 30,
        "tax_exigible": True,
        "tax_repartition_line_id": 26,
        "tag_ids": [
          [
            6,
            False,
            [
              27
            ]
          ]
        ],
        "analytic_account_id": False,
        "analytic_tag_ids": [
          [
            6,
            False,
            []
          ]
        ],
        "recompute_tax_line": False,
        "display_type": False,
        "is_rounding_line": False,
        "exclude_from_invoice_tab": True
      }
    ],
    [
      0,
      "virtual_269",
      {
        "account_id": 6,
        "sequence": 10,
        "name": False,
        "quantity": 1,
        "price_unit": -32.31,
        "discount": 0,
        "debit": 32.31,
        "credit": 0,
        "amount_currency": 0,
        "date_maturity": "2020-09-08",
        "currency_id": False,
        "partner_id": False,
        "product_uom_id": False,
        "product_id": False,
        "payment_id": False,
        "tax_ids": [
          [
            6,
            False,
            []
          ]
        ],
        "tax_base_amount": 0,
        "tax_exigible": True,
        "tax_repartition_line_id": False,
        "tag_ids": [
          [
            6,
            False,
            []
          ]
        ],
        "analytic_account_id": False,
        "analytic_tag_ids": [
          [
            6,
            False,
            []
          ]
        ],
        "recompute_tax_line": False,
        "display_type": False,
        "is_rounding_line": False,
        "exclude_from_invoice_tab": True
      }
    ]
  ]}
			},
                    "bill_pattern": {"pattern": {
        "state": "draft",
        "type": "out_invoice",
        "invoice_sent": False,
        "l10n_ch_isr_sent": False,
        "name": "<Name>",
        "invoice_date": "<date>",
        "date": "<date>",
        "journal_id": 1,
        "currency_id": "<currency_id>",
        "invoice_user_id": 2,
        "invoice_incoterm_id": False,
        "auto_post": False,
        "to_check": False,
        "authorized_transaction_ids": [
          [
            6,
            False,
            []
          ]
        ],
        "tax_lock_date_message": False,
        "id": False,
        "invoice_payment_state": "not_paid",
        "invoice_filter_type_domain": "sale",
        "company_currency_id": "<currency_id>",
        "commercial_partner_id": "<company_id>",
        "bank_partner_id": 1,
        "invoice_has_outstanding": False,
        "l10n_ch_currency_name": "<currency_name>",
        "invoice_sequence_number_next_prefix": False,
        "invoice_sequence_number_next": False,
        "invoice_has_matching_suspense_amount": False,
        "has_reconciled_entries": False,
        "restrict_mode_hash_table": False,
        "partner_id": "<company_id>",
        "ref": "<ref_number>",
        "invoice_vendor_bill_id": False,
        "invoice_payment_term_id": "<payment_term_id>",
        "invoice_date_due": "<date_+_payement_term>",
        "company_id": 1,
        "invoice_line_ids": [],
        "amount_untaxed": 0,
        "amount_by_group": [],
        "amount_total": 0,
        "invoice_payments_widget": "False",
        "amount_residual": 0,
        "invoice_outstanding_credits_debits_widget": False,
        "narration": False,
        "line_ids": [],
        "invoice_origin": False,
        "fiscal_position_id": 1,
        "invoice_cash_rounding_id": False,
        "invoice_source_email": False,
        "invoice_payment_ref": False,
        "invoice_partner_bank_id": False,
        "reversed_entry_id": False,
        "message_follower_ids": [],
        "activity_ids": [],
        "message_ids": [],
        "message_attachment_count": 0
      }
			}

                 }
            ret = []
            if name not in data:
                return [False, "invalid index", 404]
            else:
                if "pattern" in data[name]:
                    ret = data[name]["pattern"]
                else:
                    ret = self.get(data[name]["index"], data[name]["arg"], data[name]["opt"], data[name]["model"])
            return [True, ret, None]

    def get(self, index, arg, opt, model):
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        if model == "name_search":
            ret = models.execute_kw(self.opt['db'],
                                    self.uid,
                                    self.opt['password'],
                index, model, "" , arg)
        else:
            ret = models.execute_kw(self.opt['db'],
                                    self.uid,
                                    self.opt['password'],
                index, model , arg, opt)
        return ret

    def onchangefact(self, data):
        return

    def add_product(self):
        return

    def creatfact(self, data):
        # schema = [
        #     {
        #     "l10n_ch_isr_sent":False,
        #     "invoice_date":"2020-08-31",
        #     "date":"2020-08-31",
        #     "journal_id":1,
        #     "currency_id":5,
        #     "invoice_user_id":2,
        #     "invoice_incoterm_id":False,
        #     "auto_post":False,
        #     "to_check":False,
        #     "invoice_payment_state":"not_paid",
        #     "invoice_sequence_number_next":False,
        #     "partner_id":13,
        #     "ref":"REFERENCEtest",
        #     "invoice_vendor_bill_id":False,
        #     "invoice_payment_term_id":2,
        #     "invoice_date_due":"2020-09-15",
        #     "invoice_line_ids":[
        #         [0,"virtual_838",
        #             {"sequence":10,
        #              "account_id":104,
        #              "quantity":1,
        #              "discount":0,
        #              "partner_id":13,
        #              "currency_id":False,
        #              "debit":0,
        #              "credit":30,
        #              "display_type":False,
        #              "product_id":1,
        #              "name":"libelletest",
        #              "analytic_account_id":False,
        #              "analytic_tag_ids": [
        #                 [6,False,[]]],
        #                 "product_uom_id":1,
        #                 "price_unit":30,
        #                 "tax_ids":[[6,False,[13]]],
        #                 "amount_currency":0,
        #                 "date_maturity":False,
        #                 "tag_ids":[[6,False,[17]]],
        #                 "recompute_tax_line":False,
        #                 "is_rounding_line":False,
        #                 "exclude_from_invoice_tab":False}
        #             ]
        #         ],
        #     "narration":False,
        #     "line_ids": [
        #         [0, "virtual_987",
        #             {"account_id":76,
        #              "sequence":10,
        #              "name":"TVA due a 7.7% (TN)",
        #              "quantity":1,
        #              "price_unit":2.31,
        #              "discount":0,
        #              "debit":0,
        #              "credit":2.31,
        #              "amount_currency":0,
        #              "date_maturity":False,
        #              "currency_id":False,
        #              "partner_id":13,
        #              "product_uom_id":False,
        #              "product_id":False,
        #              "payment_id":False,
        #              "tax_ids":[[6,False,[]]],
        #             "tax_base_amount":30,
        #             "tax_exigible":True,
        #             "tax_repartition_line_id":26,
        #             "tag_ids":[[6,False,[27]]],
        #             "analytic_account_id":False,
        #             "analytic_tag_ids":[[6,False,[]]],
        #             "recompute_tax_line":False,
        #             "display_type":False,
        #             "is_rounding_line":False,
        #             "exclude_from_invoice_tab":True}
        #             ],
        #         [0,"virtual_997",
        #             {"account_id":6,
        #              "sequence":10,
        #              "name":False,
        #              "quantity":1,
        #              "price_unit":-32.31,
        #              "discount":0,
        #              "debit":32.31,
        #              "credit":0,
        #              "amount_currency":0,
        #              "date_maturity":"2020-09-15",
        #              "currency_id":False,
        #              "partner_id":13,
        #              "product_uom_id":False,
        #              "product_id":False,
        #              "payment_id":False,
        #              "tax_ids":[[6,False,[]]],
        #              "tax_base_amount":0,
        #              "tax_exigible":True,
        #              "tax_repartition_line_id":False,
        #              "tag_ids":[[6,False,[]]],
        #              "analytic_account_id":False,
        #              "analytic_tag_ids":[[6,False,[]]],
        #              "recompute_tax_line":False,
        #              "display_type":False,
        #              "is_rounding_line":False,
        #              "exclude_from_invoice_tab":True}
        #              ],
        #         [0,"virtual_838",
        #             {"account_id":104,
        #              "sequence":10,
        #              "name":"libelletest",
        #              "quantity":1,
        #              "price_unit":30,
        #              "discount":0,
        #              "debit":0,
        #              "credit":30,
        #              "amount_currency":0,
        #              "date_maturity":False,
        #              "currency_id":False,
        #              "partner_id":13,
        #              "product_uom_id":1,
        #              "product_id":1,
        #              "payment_id":False,
        #              "tax_ids":[[6,False,[13]]],
        #              "tax_base_amount":0,
        #              "tax_exigible":True,
        #              "tax_repartition_line_id":False,
        #              "tag_ids":[[6,False,[17]]],
        #              "analytic_account_id":False,
        #              "analytic_tag_ids":[[6,False,[]]],
        #              "recompute_tax_line":False,
        #              "display_type":False,
        #              "is_rounding_line":False,
        #              "exclude_from_invoice_tab":False}]],
        #              "invoice_origin":False,
        #              "fiscal_position_id":1,
        #              "invoice_cash_rounding_id":False,
        #              "invoice_source_email":False,
        #              "invoice_payment_ref":False,
        #              "invoice_partner_bank_id":False,
        #              "message_attachment_count":0}
        # ]
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        try:
            ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
                                'account.invoice', 'create',
                                data, {}
                                )
        except Exception as inst:
            return [False, str(inst), 500]
        return [True, {"id": ret}, None]

    def validate_fac(self, data):
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        try:
            ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
                                'account.invoice', 'action_invoice_open',
                                data, {}
                                )
        except Exception as inst:
            return [False, str(inst), 500]
        return [True, {"id": ret}, None]

    def return_bill(self, id, access_token):
        url = f"{self.opt['url']}/my/invoices/{id}?access_token={access_token}&report_type=pdf"
        response = requests.request("GET", url, headers={}, data={})
        data = response.content
        if data[:4] != b'%PDF':
            return [False, "Invalid invoice or access_token", 404]
        return [True, {"pdf": base64.encodestring(data).decode("utf-8").replace('\n', '') }, None ]

    def list_contact(self, company = False, offset = 0, limit = 10):
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
            'res.partner', 'search',
            [[['is_company', '=', company]]],
            {'offset': int(offset), 'limit': int(limit)})
        return [True, ret, None]

    def read_contact(self, id):
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
            'res.partner', 'read', [[int(id)]])
        return [True,ret, None]

    def edit_invoice(self, id):
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        try:
            ret = models.execute_kw(self.opt['db'],
                                    self.uid,
                                    self.opt['password'],
                                    'account.invoice', 'onchange',
                                    data, {}
                                    )
        except Exception as inst:
            return [False, str(inst), 500]
        return [True, {"id": ret}, None]

    def read_invoice(self, id):
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
            'account.invoice', 'read', [[int(id)]])
        return [True,ret, None]

    def edit_client(self, id, data):
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
            'res.partner', 'write', [[int(id)], data])
        k = ["street1", "street2", "zip_id", "zip", "city", "country_id", "property_product_pricelist", "city_id", "phone" ,"mobile", "vat"]
        for i in data.keys():
            if i not in k:
                del k[i]
        for i in k:
            if i not in data:
                data[i] = None
        return [True, {"ret": ret, "input": data}, None]

    def create_client(self, param):
        """
        75 && 43 -> france & suisse
        4 docteur
        1 madame
        2 mademoiselle
        3 monsieur
        5 professeur
        """
        dep = ['base64', 'name', 'parent_id', 'function', 'phone', 'mobile', 'email', 'website', 'title']
        for i in dep:
            if param[i] is None:
                param[i] = False
        param['parent_id'] = False if int(param['parent_id']) == 0 else int(param['parent_id'])
        param['title'] = False if int(param['title']) == 0 else int(param['title'])
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
                                'res.partner', 'create',
                                [{
                                    "is_company":False,
                                    "active":True,
                                    "type":"contact",
                                    "lang":self.opt['lang'],
                                    "category_id":[[6,False,[]]],
                                    "partner_gid":0,
                                    "additional_info":False,
                                    "image_1920":param['base64'],
                                    "__last_update":False,
                                    "company_type":"person",
                                    "name":param['name'].encode('utf-8'),
                                    "parent_id": param['parent_id'],
                                    "company_name":False,
                                    "function": param['function'],
                                    "phone": param['phone'],
                                    "mobile": param['mobile'],
                                    "email": param['email'],
                                    "website":param['website'],
                                    "title": param['title'],
                                    "user_id":False,
                                    "ref":False,
                                    "company_id":False,
                                    "industry_id":False,
                                    "comment":False,
                                    "message_attachment_count":0
                                }]
                                )
        return [True, {"id": ret}, None]

    def create_company(self, param):
        """
        75 && 43 -> france & suisse
        """
        dep = ['base64', 'name', 'street', 'street2', 'city', 'zip', 'state_id', 'vat', 'phone', 'mobile', 'email', 'website']
        for i in dep:
            if param[i] is None:
                param[i] = False
        param['state_id'] = False if int(param['state_id']) == 0 else int(param['state_id'])
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
                                'res.partner', 'create',
                                [{
                                    "is_company":True,
                                    "active":True,
                                    "type":"contact",
                                    "lang": self.opt['lang'],
                                    "category_id":[[6,False,[]]],
                                    "partner_gid":0,
                                    "additional_info":False,
                                    "image_1920":param['base64'],
                                    "__last_update":False,
                                    "company_type":"company",
                                    "name": param['name'],
                                    "parent_id":False,
                                    "company_name":False,
                                    "street": param["street"],
                                    "street2":param["street2"],
                                    "city":param["city"],
                                    "state_id":False,
                                    "zip":param["zip"],
                                    "country_id":param['state_id'],
                                    "vat":param['vat'],
                                    "function":False,
                                    "phone":param['phone'],
                                    "mobile":param['mobile'],
                                    "email":param['email'],
                                    "website":param['website'],
                                    "title":False,
                                    "user_id":False,
                                    "ref":False,
                                    "company_id":False,
                                    "industry_id":False,
                                    "comment":False,
                                    "message_attachment_count":0
                                }]
                                )
        return [True, {"id": ret}, None]
