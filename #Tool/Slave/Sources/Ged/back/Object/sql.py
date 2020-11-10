import pymysql
import os

db_host =   str(os.getenv('DB_HOST', None))
db_user =   str(os.getenv('DB_USER', 'user'))
db_pass =   str(os.getenv('DB_PASS', 'password'))

class sql:
    def cred():
        return pymysql.connect(db_host, db_user, db_pass, "ged")

    def get(query, data):
        db = sql.cred()
        cursor = db.cursor()
        cursor.execute(query, data)
        to_ret =  cursor.fetchall()
        cursor.close()
        db.close()
        return to_ret

    def input(query, data):
        db = sql.cred()
        cursor = db.cursor()
        #try:
        cursor.execute(query, data)
        db.commit()
        to_ret = True
        #except:
        #    db.rollback()
        #    to_ret = False
        cursor.close()
        db.close()
        return to_ret