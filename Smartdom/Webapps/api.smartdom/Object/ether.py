from web3.auto.infura.ropsten import w3
from eth_account import Account
from .contract import *
from web3 import Web3


contract_adr = str(os.getenv('ETH_CONTACT_ADR', None))
adm_mnemonic = str(os.getenv('ETH_ADM_MNEMONIC', None))
gwei = str(os.getenv('ETH_GWEI_PRICE', 35))


if w3 == "mainnet":
    w3 = Web3()
else:
    w3 = w3
if w3.isConnected():
    print("W3 is connected")
else:
    print("W3 is disconnected")
w3.eth.account.enable_unaudited_hdwallet_features()

class eth_contract:
    def __init__(self, adr = None, w3 = "ropsten", ):
        src = contract_src()
        self.abi = src['abi']
        self.bin = src['bytecode']
        self.obj = None if adr is None else self.__get_contract(adr, self.abi)

    def __deploy_contract(self):
        tx_hash = w3.eth.contract(abi=self.abi,bytecode=self.bin).deploy()
        address = w3.eth.getTransactionReceipt(tx_hash)['contractAddress']
        self.obj = w3.eth.contract(address, abi=self.abi)
        return address

    def __get_contract(self, address, abi):
        self.obj = w3.eth.contract(address, abi=abi)
        return self.obj

    def create_account(self):
        acct, mnem = w3.eth.account.create_with_mnemonic()
        return [True, {"address": str(acct), "mnemonic": str(mnem)}, None]

    def __owner(self):
        return w3.eth.account.from_mnemonic(adm_mnemonic)

    def get_balance(self, address):
        try:
            return [True, {"balance": self.obj.functions.balanceOf(address).call()}, None]
        except:
            return [False, "Invalid address: " + address, 400]

    def send(self, ad_fr, ad_to, amount):
        transaction = self.obj.functions.ownerTransfer(ad_fr,ad_to,amount)
        build = transaction.buildTransaction({
          'gas': 75000,
          'gasPrice': w3.toWei(str(gwei), 'gwei'),
          'nonce': w3.eth.getTransactionCount("0xb02C43F52dFe07d35dA97748106A8561a6b1e6e1", "pending")
        })
        signed_txn = w3.eth.account.signTransaction(build, private_key=self.__owner().key)
        return [True, {"transact": str(w3.eth.sendRawTransaction(signed_txn.rawTransaction))}, None]
