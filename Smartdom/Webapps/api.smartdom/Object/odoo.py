import pypi_xmlrpc
import xmlrpc.client

class odoo:
    def __init__(self, usr_id = -1, odoo_id = -1):
        self.usr_id = str(usr_id)
        self.odoo_id = str(odoo_id)
        self.opt = {
	    "url": "http://91.121.162.202:10013",
            "username" : "eliot.courtel@gmail.com",
            "db": "odoo",
            "password": "test"
        }
        self.uid = None

    def version(self):
        common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(self.opt['url']))
        ret = common.version()
        return [True, ret, None]

    def connection(self):
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
                                         "arg": ["|", ["company_id", "=", False], ["company_id", "=", 1]],
                                         "opt": {'offset': int(offset), 'limit': int(limit)},
                                         "model": "search"
                                        },
                    "product": {"index": "product.product",
                                         "arg": [int(id)],
                                         "opt": {},
                                         "model": "read"
                                        },
                    "tax_id":      {"index": "account.tax",
                                         "arg": [["type_tax_use", "=?", "sale"], ["company_id", "=", 1]],
                                         "opt": {'offset': int(offset), 'limit': int(limit)},
                                         "model": "search"
                                        },
                    "tax": {"index": "account.tax",
                                         "arg": [int(id)],
                                         "opt": {},
                                         "model": "read"
                                        },
                    "payment_term_id": {"index": "account.payment.term",
                            "arg": [],
                            "opt": {'offset': int(offset), 'limit': int(limit)},
                            "model": "search"
                         },
                    "payment_term": {"index": "account.payment.term",
                                         "arg": [int(id)],
                                         "opt": {},
                                         "model": "read"
                                        },
                    "product_category_id": {"index": "product.category",
                            "arg": [],
                            "opt": {'offset': int(offset), 'limit': int(limit)},
                            "model": "search"
                         },
                    "product_category": {"index": "product.category",
                            "arg": [int(id)],
                            "opt": {},
                            "model": "read"
                         },
                    "bill_id": {"index" :"account.move",
                            "arg": [["type", "=", "out_invoice"]],
                            "opt": {},
                            "model": "search"
                            },
                    "bill": {"index": "account.move",
                            "arg": [int(id)],
                            "opt": {},
                            "model": "read"
                         },

                 }
            ret = []
            if name not in data:
                return [False, "invalid index", 404]
            else:
                ret = self.get(data[name]["index"], data[name]["arg"], data[name]["opt"], data[name]["model"])
            return [True, ret, None]

    def get(self, index, arg, opt, model):
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(self.opt['url']))
        ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
            index, model , [arg], opt)
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
                                'account.move', 'create',
                                data
                                )
        except Exception as inst:
            return [False, str(inst), 500]
        return [True, {"id": ret}, None]

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
        print(param)
        ret = models.execute_kw(self.opt['db'],
                                self.uid,
                                self.opt['password'],
                                'res.partner', 'create',
                                [{
                                    "is_company":False,
                                    "active":True,
                                    "type":"contact",
                                    "lang":"fr_FR",
                                    "category_id":[[6,False,[]]],
                                    "partner_gid":0,
                                    "additional_info":False,
                                    "image_1920":param['base64'],
                                    "__last_update":False,
                                    "company_type":"person",
                                    "name":param['name'],
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
                                    "lang":"fr_FR",
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
