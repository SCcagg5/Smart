class contacter:
    def __init__(self, usr_id = -1, contacter_id = -1):
        self.usr_id = str(usr_id)
        self.contacter_id = str(contacter_id)

    def create(self, name):
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        succes = sql.input("INSERT INTO `contacter` (`id`, `name`, `user_id`, `date`) VALUES (%s, %s, %s, %s)", \
          (id, name, self.usr_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": res[0][0]}, None]

    def check_exist(self):
        res = sql.get("SELECT `id` FROM `contacter` WHERE id = %s", (self.contacter_id, ))
        if len(res) != 1:
            return [False, "Invalid contacter ID", 404]
        return [True, {"id": res[0][0]}, None]

    def infos(self):
        res = sql.get("SELECT `contacter`.`name`, `user`.`email`, `contacter`.`date` FROM `contacter` INNER JOIN user ON `contacter`.user_id = `user`.id WHERE `contacter`.id = %s", (self.contacter_id, ))
        if len(res) != 1:
            return [False, "Invalid contacter ID", 404]
        return [True, {"name": res[0][0], "admin": res[0][1], "date": res[0][2]}, None]

    def check_user(self):
        res = sql.get("SELECT `id` FROM `contacter_user` WHERE contacter_id = %s AND user_id = %s", (self.contacter_id, self.usr_id, ))
        if len(res) != 1:
            return [False, "User hasn't access to this contacter", 404]
        return [True, {"access_id": res[0][0]}, None]

    def create_user(self, email, role):
        if role not in ["admin", "user"]:
            return [False, "role is not correct 'admin' or 'user'", 400]
        role = {"admin": 1, "user": 0}[role]
        user_id = user.fromemail(email)
        table = "contacter_user"
        if not user_id:
            user_id = email
            table = "contacter_user_buff"
        elif user_id == self.usr_id:
            return [False, "Can't share to yourself", 401]
        elif len(sql.get("SELECT `id` FROM `contacter_user` WHERE user_id = %s", (user_id, ))) != 0:
            return [False, "User already invited", 401]
        id = str(uuid.uuid4())
        date = str(int(round(time.time() * 1000)))
        succes = sql.input("INSERT INTO `" + table + "` (`id`, `contacter_id`, `user_id`, `role`, `shared_by`, `date`) VALUES (%s, %s, %s, %s, %s, %s)", \
          (id, self.contacter_id, user_id, role, self.usr_id, date))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"id": res[0][0]}, None]
