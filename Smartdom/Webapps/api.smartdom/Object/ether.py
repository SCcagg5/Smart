from eth_account import Account
from .contract import *
from web3 import Web3
import os
import uuid
from .sql import sql

adm_mnemonic = str(os.getenv('ETH_ADM_MNEMONIC', None))
gwei = str(os.getenv('ETH_GWEI_PRICE', 35))

w3 = "not mainnet"
if w3 == "mainnet":
    from web3.auto.infura import w3
else:
    from web3.auto.infura.ropsten import w3
if w3.isConnected():
    print("W3 is connected")
else:
    print("W3 is disconnected")
w3.eth.account.enable_unaudited_hdwallet_features()

class eth_contract:
    def __init__(self, adr = None, w3 = "ropsten", user = None):
        src = contract_src()
        self.abi = src['abi']
        self.bin = src['bytecode']
        self.obj = None if adr is None else self.__get_contract(adr, self.abi)
        self.user_id = user

    def accounts(self):
        return [True, {"accounts": self.__get_accounts(self.user_id)}, None]

    def create_account(self):
        if self.user_id is None:
            return [False, "invalid user", 400]
        id_wallet = str(uuid.uuid4())
        acct, mnem = w3.eth.account.create_with_mnemonic()
        ret =  {"address": str(acct.address), "mnemonic": str(mnem), "key": str(acct.key)}
        succes = sql.input("INSERT INTO `wallet` (`id`, `user_id`, `adresse`, `mnemonic`) VALUES (%s , %s, %s, %s)", \
        (id_wallet, self.user_id, ret["address"], ret["mnemonic"]))
        if not succes:
            return [False, "data input error", 500]
        return [True, {"address":  ret["address"]} , None]

    def get_balance(self, address):
        if self.user_id is None:
            return [False, "invalid user", 400]
        if address not in self.__get_accounts(self.user_id):
            return [False, "invalid account", 400]
        return [True, {"balance": self.__get_balance(address)}, None]

    def send(self, ad_fr, ad_to, amount):
        if self.user_id is None:
            return [False, "invalid user", 400]
        if ad_fr not in self.__get_accounts(self.user_id):
            return [False, "invalid account", 400]
        if self.__get_balance(ad_fr) < amount:
            return [False, "invalid amount", 400]

        transaction = self.obj.functions.ownerTransfer(ad_fr,ad_to,amount)
        build = transaction.buildTransaction({
          'gas': 75000,
          'gasPrice': w3.toWei(str(gwei), 'gwei'),
          'nonce': w3.eth.getTransactionCount(self.__owner().address, "pending")
        })
        signed_txn = w3.eth.account.signTransaction(build, private_key=self.__owner().key)
        txn = w3.eth.sendRawTransaction(signed_txn.rawTransaction).hex()
        w3.eth.waitForTransactionReceipt(txn)
        return [True, {"transact": txn}, None]

    def wallet_balance(self, account):
        if self.user_id is None:
            return [False, "invalid user", 400]
        if account not in self.__get_accounts(self.user_id):
            return [False, "invalid account", 400]
        eth = "{:.5f}".format(w3.eth.getBalance(w3.toChecksumAddress(account)) / 1000000000000000000)
        return [True, {"ether": eth}, None]

    def fund(self, ad_to, amount):
        if self.user_id is None:
            return [False, "invalid user", 400]
        if ad_to not in self.__get_accounts(self.user_id):
            return [False, "invalid account", 400]
        transaction = self.obj.functions.ownerTransfer(self.__owner().address, ad_to , amount)
        build = transaction.buildTransaction({
          'gas': 75000,
          'gasPrice': w3.toWei(str(gwei), 'gwei'),
          'nonce': w3.eth.getTransactionCount(self.__owner().address, "pending")
        })
        signed_txn = w3.eth.account.signTransaction(build, private_key=self.__owner().key)
        txn = w3.eth.sendRawTransaction(signed_txn.rawTransaction).hex()
        w3.eth.waitForTransactionReceipt(txn)
        return [True, {"transact": txn}, None]

    def deploy_contract(self, name, symbol, number):
        transaction = w3.eth.contract(abi=self.abi,bytecode=self.bin).constructor(name, symbol, self.__owner().address, number)
        cost = transaction.estimateGas()
        build = transaction.buildTransaction({
          'gas': cost + 30000 ,
          'gasPrice': w3.toWei(str(gwei), 'gwei'),
          'nonce': w3.eth.getTransactionCount(self.__owner().address, "pending")
        })
        signed_txn = w3.eth.account.signTransaction(build, private_key=self.__owner().key)
        txn = w3.eth.sendRawTransaction(signed_txn.rawTransaction).hex()
        w3.eth.waitForTransactionReceipt(txn)
        return [True, {"transact": txn, "cost": cost}, None]

    def __get_contract(self, address, abi):
        self.obj = w3.eth.contract(address, abi=abi)
        return self.obj

    def __get_accounts(self, id_user):
        ret = []
        res = sql.get("SELECT adresse FROM wallet WHERE user_id = %s", (id_user,))
        for i in res:
            ret.append(i[0])
        return ret

    def __get_balance(self, account):
        return self.obj.functions.balanceOf(account).call()

    def __owner(self):
        return w3.eth.account.from_mnemonic(adm_mnemonic)
