import pypi_xmlrpc
import xmlrpc.client

class odoo:
    def __init__(self, usr_id = -1, odoo_id = -1):
        self.usr_id = str(usr_id)
        self.odoo_id = str(odoo_id)
        self.opt = {
            "url": "",
            "username" : "",
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
