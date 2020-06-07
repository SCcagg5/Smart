import json

def contract_src():
  return {
  "contractName": "Tokenlistable",
  "abi": [
    {
      "constant": True,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": False,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": False,
      "inputs": [
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": True,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": False,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": False,
      "inputs": [
        {
          "internalType": "contract IWhitelist",
          "name": "_whitelist",
          "type": "address"
        }
      ],
      "name": "updateWhitelist",
      "outputs": [],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": False,
      "inputs": [
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseApproval",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": True,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": False,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": False,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": True,
      "inputs": [],
      "name": "decimal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": False,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": True,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": False,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": True,
      "inputs": [],
      "name": "whitelist",
      "outputs": [
        {
          "internalType": "contract IWhitelist",
          "name": "",
          "type": "address"
        }
      ],
      "payable": False,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": True,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": False,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": False,
      "inputs": [
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseApproval",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": True,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": False,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": False,
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": False,
      "inputs": [
        {
          "indexed": True,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": True,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": False,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": False,
      "inputs": [
        {
          "indexed": True,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": True,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": False,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": False,
      "inputs": [
        {
          "indexed": False,
          "internalType": "contract IWhitelist",
          "name": "whitelist",
          "type": "address"
        }
      ],
      "name": "WhitelistUpdated",
      "type": "event"
    },
    {
      "anonymous": False,
      "inputs": [
        {
          "indexed": True,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipRenounced",
      "type": "event"
    },
    {
      "anonymous": False,
      "inputs": [
        {
          "indexed": True,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": True,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": False,
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": False,
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "ownerTransfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": False,
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": False,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.5.11+commit.c082d0b4\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"contract IWhitelist\",\"name\":\"_whitelist\",\"type\":\"address\"}],\"name\":\"updateWhitelist\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_subtractedValue\",\"type\":\"uint256\"}],\"name\":\"decreaseApproval\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimal\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"whitelist\",\"outputs\":[{\"internalType\":\"contract IWhitelist\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"ownerTransfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_addedValue\",\"type\":\"uint256\"}],\"name\":\"increaseApproval\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"contract IWhitelist\",\"name\":\"whitelist\",\"type\":\"address\"}],\"name\":\"WhitelistUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"}],\"name\":\"OwnershipRenounced\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}],\"devdoc\":{\"methods\":{\"owner()\":{\"details\":\"Returns the owner\"},\"renounceOwnership()\":{\"details\":\"Allows the current owner to relinquish control of the contract.\"},\"transferOwnership(address)\":{\"details\":\"Allows the current owner to transfer control of the contract to a newOwner.\",\"params\":{\"_newOwner\":\"The address to transfer ownership to.\"}}}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/work/c-layer-tool/contracts/tokenstable.sol\":\"Tokenlistable\"},\"evmVersion\":\"petersburg\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":1000},\"remappings\":[]},\"sources\":{\"/work/c-layer-tool/contracts/Whitelistable.sol\":{\"keccak256\":\"0xed53d73e60a328e28d6dc74f48348368f750e808d7344504c3f2c20ee934cf96\",\"urls\":[\"bzz-raw://16610f6e0420a102a6cfaf4de32488f46a61b88950fc5c6f37eec2eb746c006f\",\"dweb:/ipfs/QmdVPuDrT5kbgrEUpsk2kJgHW4iAyXLh2MJqszhcFTdVW5\"]},\"/work/c-layer-tool/contracts/governance/Ownable.sol\":{\"keccak256\":\"0x5b79ab99c3c681c8e042918828c0bddc8577f131182693490209febfb593c40a\",\"urls\":[\"bzz-raw://70fd117989eebaef16e50261d18e7dd3fc962c8361f80b5dc22dad54c9e23863\",\"dweb:/ipfs/QmTafco1B1b5Rv1mZRG1cb7E6Ve2jUCf5tjtDDvNh8pdjv\"]},\"/work/c-layer-tool/contracts/interface/IERC20.sol\":{\"keccak256\":\"0x594b0ecc146402c39505b820aa75d678ffbd6d4ae535e6106b2372449bf9788c\",\"urls\":[\"bzz-raw://088f3cab901daffdd08d5d4e2373ab2b154650ae81fe4a57dffc0be25a25d093\",\"dweb:/ipfs/Qmehy4uD8t5sRUtEF1A97SpPCanVWjFEKy2n2QVPuEzJMP\"]},\"/work/c-layer-tool/contracts/interface/IOwnable.sol\":{\"keccak256\":\"0x968dc28b08d5e15924c2ff9d7c458bbac522492b468aa9a33cf309b2f8689858\",\"urls\":[\"bzz-raw://daa75ae2e427824510115f3979e55af717e995f9451c738d21fa3f3084f33cc3\",\"dweb:/ipfs/QmXQFD7kYr7hpbNwEaRzg8e3d1jGGFsrA57ZWaL1hLrYnz\"]},\"/work/c-layer-tool/contracts/interface/IWhitelist.sol\":{\"keccak256\":\"0xda42ea407359441eb25bae2abc46e8771664935c70d1d3c6bb2b0a15be3dc136\",\"urls\":[\"bzz-raw://08c99d08eb9f6f90bc2b2b9f7064c88780b4ec4e103493de21fa17339637697d\",\"dweb:/ipfs/QmNvnxy3RZax6H6Hyipm7E2xwxGVyHbBBAQM1TUpSTTkZ7\"]},\"/work/c-layer-tool/contracts/math/SafeMath.sol\":{\"keccak256\":\"0x7963b2fb6f33aa5c68238b470bc02eead6d6ae02355d7e3a906333b17dca85a5\",\"urls\":[\"bzz-raw://aeffcfdddf27f4c2571fde60f4a913f799d095e0e62526258265b4d354081c3c\",\"dweb:/ipfs/QmXMUdEhA8WHsy7e5TFiTFar185mefp8rV52xiQX1wHpvz\"]},\"/work/c-layer-tool/contracts/token/BaseERC20.sol\":{\"keccak256\":\"0x7e7bce98ef99f7f3bad13e97273e1beaf2a23f63eca00d41da1acaff9d6b0cdc\",\"urls\":[\"bzz-raw://e082aabfcbf160733a6ddefe8786f2cba189a817971e3044f0f64c4df245be3f\",\"dweb:/ipfs/Qmc4fdGyWMF4MKsbBHLhoq9zYbCT9ZUV88Cz38Aqtn7FNp\"]},\"/work/c-layer-tool/contracts/token/ERC20.sol\":{\"keccak256\":\"0xd7d4b6289a4f8bd59ffa1b4f6f84b216a0c559557b7b191bb1c773729ef9fd40\",\"urls\":[\"bzz-raw://3a87d49112a31020a64be409c75d012e3f38119cff9570c86799b767d0b1eb08\",\"dweb:/ipfs/QmUG4idkZgkfsFTptmHFw95RUquKMgP2rTe3ivWoTcesGC\"]},\"/work/c-layer-tool/contracts/tokenstable.sol\":{\"keccak256\":\"0x466c739ca7955a57d334de926c8d7ec063bbb96f46beb8a0ff8efac87cdd4e9e\",\"urls\":[\"bzz-raw://3e2bc1c78965a726ac0d51f12dc73356330f891765d49bdebb67ca80b0d72cb1\",\"dweb:/ipfs/QmVNmWjBDXFysUQ8ofsF3Ep1q8nLJk6oPU19CAKkPCnbM4\"]}},\"version\":1}",
  "bytecode": "0x6080604052601260075534801561001557600080fd5b50604080518082018252600781527f56656c6f4f6e650000000000000000000000000000000000000000000000000060208083019182528351808501909452600384527f564c4f000000000000000000000000000000000000000000000000000000000090840152600080546001600160a01b03191633179055815191929173b02c43f52dfe07d35da97748106a8561a6b1e6e191683635c9adc5dea00000916100c1916005916100fd565b5082516100d59060069060208601906100fd565b5060028190556001600160a01b03909116600090815260036020526040902055506101989050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013e57805160ff191683800117855561016b565b8280016001018555821561016b579182015b8281111561016b578251825591602001919060010190610150565b5061017792915061017b565b5090565b61019591905b808211156101775760008155600101610181565b90565b610de3806101a76000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806376809ce3116100b2578063a1291f7f11610081578063d73dd62311610066578063d73dd6231461034d578063dd62ed3e14610379578063f2fde38b146103a75761011b565b8063a1291f7f146102eb578063a9059cbb146103215761011b565b806376809ce3146102af5780638da5cb5b146102b757806393e59dc1146102db57806395d89b41146102e35761011b565b80633d0f963e116100ee5780633d0f963e1461022d578063661884631461025557806370a0823114610281578063715018a6146102a75761011b565b806306fdde0314610120578063095ea7b31461019d57806318160ddd146101dd57806323b872dd146101f7575b600080fd5b6101286103cd565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561016257818101518382015260200161014a565b50505050905090810190601f16801561018f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c9600480360360408110156101b357600080fd5b506001600160a01b038135169060200135610463565b604080519115158252519081900360200190f35b6101e56104c9565b60408051918252519081900360200190f35b6101c96004803603606081101561020d57600080fd5b506001600160a01b038135811691602081013590911690604001356104cf565b6102536004803603602081101561024357600080fd5b50356001600160a01b0316610595565b005b6101c96004803603604081101561026b57600080fd5b506001600160a01b038135169060200135610613565b6101e56004803603602081101561029757600080fd5b50356001600160a01b0316610703565b61025361071e565b6101e561078a565b6102bf610790565b604080516001600160a01b039092168252519081900360200190f35b6102bf61079f565b6101286107ae565b6101c96004803603606081101561030157600080fd5b506001600160a01b0381358116916020810135909116906040013561080f565b6101c96004803603604081101561033757600080fd5b506001600160a01b03813516906020013561090b565b6101c96004803603604081101561036357600080fd5b506001600160a01b0381351690602001356109cf565b6101e56004803603604081101561038f57600080fd5b506001600160a01b0381358116916020013516610a68565b610253600480360360208110156103bd57600080fd5b50356001600160a01b0316610a93565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104595780601f1061042e57610100808354040283529160200191610459565b820191906000526020600020905b81548152906001019060200180831161043c57829003601f168201915b5050505050905090565b3360008181526004602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60025490565b60015460408051633af32abf60e01b81526001600160a01b038086166004830152915160009386931691633af32abf916024808301926020929190829003018186803b15801561051e57600080fd5b505afa158015610532573d6000803e3d6000fd5b505050506040513d602081101561054857600080fd5b5051610581576040805162461bcd60e51b815260206004820152600360248201526257303160e81b604482015290519081900360640190fd5b61058c858585610ab6565b95945050505050565b6000546001600160a01b031633146105ac57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03838116919091179182905560408051929091168252517f86eba8651458cc924e4911e8a0a31258558de0474fdc43da05cea932cf130aad916020908290030190a150565b3360009081526004602090815260408083206001600160a01b038616845290915281205480831115610668573360009081526004602090815260408083206001600160a01b038816845290915281205561069d565b610678818463ffffffff610c2d16565b3360009081526004602090815260408083206001600160a01b03891684529091529020555b3360008181526004602090815260408083206001600160a01b0389168085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b6001600160a01b031660009081526003602052604090205490565b6000546001600160a01b0316331461073557600080fd5b600080546040516001600160a01b03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b60075490565b6000546001600160a01b031690565b6001546001600160a01b031681565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104595780601f1061042e57610100808354040283529160200191610459565b600080546001600160a01b0316331461082757600080fd5b6001600160a01b03841660009081526003602052604090205482111561084c57600080fd5b6001600160a01b038416600090815260036020526040902054610875908363ffffffff610c2d16565b6001600160a01b0380861660009081526003602052604080822093909355908516815220546108aa908363ffffffff610c3f16565b6001600160a01b0380851660008181526003602090815260409182902094909455805186815290519193928816927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a35060019392505050565b60015460408051633af32abf60e01b81526001600160a01b038086166004830152915160009386931691633af32abf916024808301926020929190829003018186803b15801561095a57600080fd5b505afa15801561096e573d6000803e3d6000fd5b505050506040513d602081101561098457600080fd5b50516109bd576040805162461bcd60e51b815260206004820152600360248201526257303160e81b604482015290519081900360640190fd5b6109c78484610c52565b949350505050565b3360009081526004602090815260408083206001600160a01b0386168452909152812054610a03908363ffffffff610c3f16565b3360008181526004602090815260408083206001600160a01b0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205490565b6000546001600160a01b03163314610aaa57600080fd5b610ab381610d33565b50565b60006001600160a01b038316610acb57600080fd5b6001600160a01b038416600090815260036020526040902054821115610af057600080fd5b6001600160a01b0384166000908152600460209081526040808320338452909152902054821115610b2057600080fd5b6001600160a01b038416600090815260036020526040902054610b49908363ffffffff610c2d16565b6001600160a01b038086166000908152600360205260408082209390935590851681522054610b7e908363ffffffff610c3f16565b6001600160a01b038085166000908152600360209081526040808320949094559187168152600482528281203382529091522054610bc2908363ffffffff610c2d16565b6001600160a01b03808616600081815260046020908152604080832033845282529182902094909455805186815290519287169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060019392505050565b600082821115610c3957fe5b50900390565b81810182811015610c4c57fe5b92915050565b60006001600160a01b038316610c6757600080fd5b33600090815260036020526040902054821115610c8357600080fd5b33600090815260036020526040902054610ca3908363ffffffff610c2d16565b33600090815260036020526040808220929092556001600160a01b03851681522054610cd5908363ffffffff610c3f16565b6001600160a01b0384166000818152600360209081526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b6001600160a01b038116610d4657600080fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b039290921691909117905556fea265627a7a72315820ea69d980b5f27d141296ab83aa9a3439dd4ea764605d8cbeb1575cc3c517975964736f6c634300050b0032",
  "deployedBytecode": "0x608060405234801561001057600080fd5b506004361061011b5760003560e01c806376809ce3116100b2578063a1291f7f11610081578063d73dd62311610066578063d73dd6231461034d578063dd62ed3e14610379578063f2fde38b146103a75761011b565b8063a1291f7f146102eb578063a9059cbb146103215761011b565b806376809ce3146102af5780638da5cb5b146102b757806393e59dc1146102db57806395d89b41146102e35761011b565b80633d0f963e116100ee5780633d0f963e1461022d578063661884631461025557806370a0823114610281578063715018a6146102a75761011b565b806306fdde0314610120578063095ea7b31461019d57806318160ddd146101dd57806323b872dd146101f7575b600080fd5b6101286103cd565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561016257818101518382015260200161014a565b50505050905090810190601f16801561018f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c9600480360360408110156101b357600080fd5b506001600160a01b038135169060200135610463565b604080519115158252519081900360200190f35b6101e56104c9565b60408051918252519081900360200190f35b6101c96004803603606081101561020d57600080fd5b506001600160a01b038135811691602081013590911690604001356104cf565b6102536004803603602081101561024357600080fd5b50356001600160a01b0316610595565b005b6101c96004803603604081101561026b57600080fd5b506001600160a01b038135169060200135610613565b6101e56004803603602081101561029757600080fd5b50356001600160a01b0316610703565b61025361071e565b6101e561078a565b6102bf610790565b604080516001600160a01b039092168252519081900360200190f35b6102bf61079f565b6101286107ae565b6101c96004803603606081101561030157600080fd5b506001600160a01b0381358116916020810135909116906040013561080f565b6101c96004803603604081101561033757600080fd5b506001600160a01b03813516906020013561090b565b6101c96004803603604081101561036357600080fd5b506001600160a01b0381351690602001356109cf565b6101e56004803603604081101561038f57600080fd5b506001600160a01b0381358116916020013516610a68565b610253600480360360208110156103bd57600080fd5b50356001600160a01b0316610a93565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104595780601f1061042e57610100808354040283529160200191610459565b820191906000526020600020905b81548152906001019060200180831161043c57829003601f168201915b5050505050905090565b3360008181526004602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60025490565b60015460408051633af32abf60e01b81526001600160a01b038086166004830152915160009386931691633af32abf916024808301926020929190829003018186803b15801561051e57600080fd5b505afa158015610532573d6000803e3d6000fd5b505050506040513d602081101561054857600080fd5b5051610581576040805162461bcd60e51b815260206004820152600360248201526257303160e81b604482015290519081900360640190fd5b61058c858585610ab6565b95945050505050565b6000546001600160a01b031633146105ac57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03838116919091179182905560408051929091168252517f86eba8651458cc924e4911e8a0a31258558de0474fdc43da05cea932cf130aad916020908290030190a150565b3360009081526004602090815260408083206001600160a01b038616845290915281205480831115610668573360009081526004602090815260408083206001600160a01b038816845290915281205561069d565b610678818463ffffffff610c2d16565b3360009081526004602090815260408083206001600160a01b03891684529091529020555b3360008181526004602090815260408083206001600160a01b0389168085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b6001600160a01b031660009081526003602052604090205490565b6000546001600160a01b0316331461073557600080fd5b600080546040516001600160a01b03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b60075490565b6000546001600160a01b031690565b6001546001600160a01b031681565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104595780601f1061042e57610100808354040283529160200191610459565b600080546001600160a01b0316331461082757600080fd5b6001600160a01b03841660009081526003602052604090205482111561084c57600080fd5b6001600160a01b038416600090815260036020526040902054610875908363ffffffff610c2d16565b6001600160a01b0380861660009081526003602052604080822093909355908516815220546108aa908363ffffffff610c3f16565b6001600160a01b0380851660008181526003602090815260409182902094909455805186815290519193928816927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a35060019392505050565b60015460408051633af32abf60e01b81526001600160a01b038086166004830152915160009386931691633af32abf916024808301926020929190829003018186803b15801561095a57600080fd5b505afa15801561096e573d6000803e3d6000fd5b505050506040513d602081101561098457600080fd5b50516109bd576040805162461bcd60e51b815260206004820152600360248201526257303160e81b604482015290519081900360640190fd5b6109c78484610c52565b949350505050565b3360009081526004602090815260408083206001600160a01b0386168452909152812054610a03908363ffffffff610c3f16565b3360008181526004602090815260408083206001600160a01b0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205490565b6000546001600160a01b03163314610aaa57600080fd5b610ab381610d33565b50565b60006001600160a01b038316610acb57600080fd5b6001600160a01b038416600090815260036020526040902054821115610af057600080fd5b6001600160a01b0384166000908152600460209081526040808320338452909152902054821115610b2057600080fd5b6001600160a01b038416600090815260036020526040902054610b49908363ffffffff610c2d16565b6001600160a01b038086166000908152600360205260408082209390935590851681522054610b7e908363ffffffff610c3f16565b6001600160a01b038085166000908152600360209081526040808320949094559187168152600482528281203382529091522054610bc2908363ffffffff610c2d16565b6001600160a01b03808616600081815260046020908152604080832033845282529182902094909455805186815290519287169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060019392505050565b600082821115610c3957fe5b50900390565b81810182811015610c4c57fe5b92915050565b60006001600160a01b038316610c6757600080fd5b33600090815260036020526040902054821115610c8357600080fd5b33600090815260036020526040902054610ca3908363ffffffff610c2d16565b33600090815260036020526040808220929092556001600160a01b03851681522054610cd5908363ffffffff610c3f16565b6001600160a01b0384166000818152600360209081526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600192915050565b6001600160a01b038116610d4657600080fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b039290921691909117905556fea265627a7a72315820ea69d980b5f27d141296ab83aa9a3439dd4ea764605d8cbeb1575cc3c517975964736f6c634300050b0032",
  "sourceMap": "92:794:36:-;;;319:2:35;291:30;;144:118:36;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;326:259:35;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;466:19:10;;-1:-1:-1;;;;;;466:19:10;475:10;466:19;;;461:13:35;;326:259;;;182:42:36;;226:22;;461:13:35;;:5;;:13;:::i;:::-;-1:-1:-1;480:17:35;;;;:7;;:17;;;;;:::i;:::-;-1:-1:-1;503:12:35;:29;;;-1:-1:-1;;;;;538:25:35;;;;;;;:8;:25;;;;;:42;-1:-1:-1;92:794:36;;-1:-1:-1;92:794:36;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;92:794:36;;;-1:-1:-1;92:794:36;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;",
  "deployedSourceMap": "92:794:36:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;92:794:36;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;589:75:35;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;589:75:35;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1496:188:34;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;1496:188:34;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;391:83;;;:::i;:::-;;;;;;;;;;;;;;;;713:171:36;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;713:171:36;;;;;;;;;;;;;;;;;:::i;466:136:7:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;466:136:7;-1:-1:-1;;;;;466:136:7;;:::i;:::-;;1969:409:34;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;1969:409:34;;;;;;;;:::i;478:99::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;478:99:34;-1:-1:-1;;;;;478:99:34;;:::i;843:113:10:-;;;:::i;751:75:35:-;;;:::i;682:71:10:-;;;:::i;:::-;;;;-1:-1:-1;;;;;682:71:10;;;;;;;;;;;;;;320:27:7;;;:::i;668:79:35:-;;;:::i;405:304:36:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;405:304:36;;;;;;;;;;;;;;;;;:::i;266:135::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;266:135:36;;;;;;;;:::i;1688:277:34:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;1688:277:34;;;;;;;;:::i;581:132::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;581:132:34;;;;;;;;;;:::i;1118:103:10:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1118:103:10;-1:-1:-1;;;;;1118:103:10;;:::i;589:75:35:-;654:5;647:12;;;;;;;;-1:-1:-1;;647:12:35;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;626:13;;647:12;;654:5;;647:12;;654:5;647:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;589:75;:::o;1496:188:34:-;1583:10;1563:4;1575:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;1575:29:34;;;;;;;;;;;:38;;;1624;;;;;;;1563:4;;1575:29;;1583:10;;1624:38;;;;;;;;-1:-1:-1;1675:4:34;1496:188;;;;:::o;391:83::-;457:12;;391:83;:::o;713:171:36:-;409:9:7;;:33;;;-1:-1:-1;;;409:33:7;;-1:-1:-1;;;;;409:33:7;;;;;;;;;820:4:36;;799:3;;409:9:7;;:23;;:33;;;;;;;;;;;;;;:9;:33;;;5:2:-1;;;;30:1;27;20:12;5:2;409:33:7;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;409:33:7;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;409:33:7;401:49;;;;;-1:-1:-1;;;401:49:7;;;;;;;;;;;;-1:-1:-1;;;401:49:7;;;;;;;;;;;;;;;841:38:36;860:5;867:3;872:6;841:18;:38::i;:::-;834:45;713:171;-1:-1:-1;;;;;713:171:36:o;466:136:7:-;619:6:10;;-1:-1:-1;;;;;619:6:10;605:10;:20;597:29;;;;;;537:9:7;:22;;-1:-1:-1;;537:22:7;-1:-1:-1;;;;;537:22:7;;;;;;;;;;;570:27;;;587:9;;;;570:27;;;;;;;;;;;;;466:136;:::o;1969:409:34:-;2094:10;2056:4;2086:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;2086:29:34;;;;;;;;;;2125:27;;;2121:164;;;2170:10;2194:1;2162:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;2162:29:34;;;;;;;;;:33;2121:164;;;2248:30;:8;2261:16;2248:30;:12;:30;:::i;:::-;2224:10;2216:19;;;;:7;:19;;;;;;;;-1:-1:-1;;;;;2216:29:34;;;;;;;;;:62;2121:164;2304:10;2326:19;;;;:7;:19;;;;;;;;-1:-1:-1;;;;;2295:61:34;;2326:29;;;;;;;;;;;2295:61;;;;;;;;;2304:10;2295:61;;;;;;;;;;;-1:-1:-1;2369:4:34;;1969:409;-1:-1:-1;;;1969:409:34:o;478:99::-;-1:-1:-1;;;;;556:16:34;534:7;556:16;;;:8;:16;;;;;;;478:99::o;843:113:10:-;619:6;;-1:-1:-1;;;;;619:6:10;605:10;:20;597:29;;;;;;919:6;;;900:26;;-1:-1:-1;;;;;919:6:10;;;;900:26;;;949:1;932:19;;-1:-1:-1;;932:19:10;;;843:113::o;751:75:35:-;813:8;;751:75;:::o;682:71:10:-;720:7;742:6;-1:-1:-1;;;;;742:6:10;682:71;:::o;320:27:7:-;;;-1:-1:-1;;;;;320:27:7;;:::o;668:79:35:-;735:7;728:14;;;;;;;;-1:-1:-1;;728:14:35;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;707:13;;728:14;;735:7;;728:14;;735:7;728:14;;;;;;;;;;;;;;;;;;;;;;;;405:304:36;502:4;619:6:10;;-1:-1:-1;;;;;619:6:10;605:10;:20;597:29;;;;;;-1:-1:-1;;;;;534:15:36;;;;;;:8;:15;;;;;;524:25;;;516:34;;;;;;-1:-1:-1;;;;;574:15:36;;;;;;:8;:15;;;;;;:27;;594:6;574:27;:19;:27;:::i;:::-;-1:-1:-1;;;;;556:15:36;;;;;;;:8;:15;;;;;;:45;;;;623:13;;;;;;;:25;;641:6;623:25;:17;:25;:::i;:::-;-1:-1:-1;;;;;607:13:36;;;;;;;:8;:13;;;;;;;;;:41;;;;659:28;;;;;;;607:13;;659:28;;;;;;;;;;;;;-1:-1:-1;700:4:36;405:304;;;;;:::o;266:135::-;409:9:7;;:33;;;-1:-1:-1;;;409:33:7;;-1:-1:-1;;;;;409:33:7;;;;;;;;;350:4:36;;329:3;;409:9:7;;:23;;:33;;;;;;;;;;;;;;:9;:33;;;5:2:-1;;;;30:1;27;20:12;5:2;409:33:7;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;409:33:7;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;409:33:7;401:49;;;;;-1:-1:-1;;;401:49:7;;;;;;;;;;;;-1:-1:-1;;;401:49:7;;;;;;;;;;;;;;;369:27:36;384:3;389:6;369:14;:27::i;:::-;362:34;266:135;-1:-1:-1;;;;266:135:36:o;1688:277:34:-;1832:10;1770:4;1824:19;;;:7;:19;;;;;;;;-1:-1:-1;;;;;1824:29:34;;;;;;;;;;:46;;1858:11;1824:46;:33;:46;:::i;:::-;1792:10;1784:19;;;;:7;:19;;;;;;;;-1:-1:-1;;;;;1784:29:34;;;;;;;;;;;;:87;;;1882:61;;;;;;1784:29;;1882:61;;;;;;;;;;;-1:-1:-1;1956:4:34;1688:277;;;;:::o;581:132::-;-1:-1:-1;;;;;683:15:34;;;659:7;683:15;;;:7;:15;;;;;;;;:25;;;;;;;;;;;;;581:132::o;1118:103:10:-;619:6;;-1:-1:-1;;;;;619:6:10;605:10;:20;597:29;;;;;;1187;1206:9;1187:18;:29::i;:::-;1118:103;:::o;1042:450:34:-;1128:4;-1:-1:-1;;;;;1150:17:34;;1142:26;;;;;;-1:-1:-1;;;;;1192:15:34;;;;;;:8;:15;;;;;;1182:25;;;1174:34;;;;;;-1:-1:-1;;;;;1232:14:34;;;;;;:7;:14;;;;;;;;1247:10;1232:26;;;;;;;;1222:36;;;1214:45;;;;;;-1:-1:-1;;;;;1284:15:34;;;;;;:8;:15;;;;;;:27;;1304:6;1284:27;:19;:27;:::i;:::-;-1:-1:-1;;;;;1266:15:34;;;;;;;:8;:15;;;;;;:45;;;;1333:13;;;;;;;:25;;1351:6;1333:25;:17;:25;:::i;:::-;-1:-1:-1;;;;;1317:13:34;;;;;;;:8;:13;;;;;;;;:41;;;;1393:14;;;;;:7;:14;;;;;1408:10;1393:26;;;;;;;:38;;1424:6;1393:38;:30;:38;:::i;:::-;-1:-1:-1;;;;;1364:14:34;;;;;;;:7;:14;;;;;;;;1379:10;1364:26;;;;;;;;:67;;;;1442:28;;;;;;;;;;;1364:14;;1442:28;;;;;;;;;;;-1:-1:-1;1483:4:34;1042:450;;;;;:::o;1049:110:18:-;1107:7;1134:1;1129;:6;;1122:14;;;;-1:-1:-1;1149:5:18;;;1049:110::o;1221:123::-;1300:5;;;1318:6;;;;1311:14;;;;1221:123;;;;:::o;717:321:34:-;780:4;-1:-1:-1;;;;;800:17:34;;792:26;;;;;;851:10;842:20;;;;:8;:20;;;;;;832:30;;;824:39;;;;;;902:10;893:20;;;;:8;:20;;;;;;:32;;918:6;893:32;:24;:32;:::i;:::-;879:10;870:20;;;;:8;:20;;;;;;:55;;;;-1:-1:-1;;;;;947:13:34;;;;;;:25;;965:6;947:25;:17;:25;:::i;:::-;-1:-1:-1;;;;;931:13:34;;;;;;:8;:13;;;;;;;;;:41;;;;983:33;;;;;;;931:13;;992:10;;983:33;;;;;;;;;;-1:-1:-1;1029:4:34;717:321;;;;:::o;1356:173:10:-;-1:-1:-1;;;;;1426:23:10;;1418:32;;;;;;1482:6;;;1461:39;;-1:-1:-1;;;;;1461:39:10;;;;1482:6;;;1461:39;;;1506:6;:18;;-1:-1:-1;;1506:18:10;-1:-1:-1;;;;;1506:18:10;;;;;;;;;;1356:173::o",
  "source": "pragma solidity >=0.5.0 <0.6.0;\n\nimport \"./token/ERC20.sol\";\nimport \"./Whitelistable.sol\";\n\ncontract Tokenlistable is Whitelistable, ERC20 {\n\n  constructor() ERC20(\"VeloOne\", \"VLO\", 0xb02C43F52dFe07d35dA97748106A8561a6b1e6e1, 1000000000000000000000) public {\n  }\n\n  function transfer(address _to, uint256 _value) onlyWhitelisted(_to) public returns (bool) {\n    return super.transfer(_to, _value);\n  }\n\n  function ownerTransfer(address _from, address _to, uint256 _value)\n    onlyOwner public returns (bool)\n  {\n    require(_value <= balances[_from]);\n    balances[_from] = balances[_from].sub(_value);\n    balances[_to] = balances[_to].add(_value);\n    emit Transfer(_from, _to, _value);\n    return true;\n  }\n\n  function transferFrom(address _from, address _to, uint256 _value)\n    onlyWhitelisted(_to) public returns (bool)\n  {\n    return super.transferFrom(_from, _to, _value);\n  }\n}\n",
  "sourcePath": "/work/c-layer-tool/contracts/tokenstable.sol",
  "ast": {
    "absolutePath": "/work/c-layer-tool/contracts/tokenstable.sol",
    "exportedSymbols": {
      "Tokenlistable": [
        6467
      ]
    },
    "id": 6468,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6357,
        "literals": [
          "solidity",
          ">=",
          "0.5",
          ".0",
          "<",
          "0.6",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:31:36"
      },
      {
        "absolutePath": "/work/c-layer-tool/contracts/token/ERC20.sol",
        "file": "./token/ERC20.sol",
        "id": 6358,
        "nodeType": "ImportDirective",
        "scope": 6468,
        "sourceUnit": 6356,
        "src": "33:27:36",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/work/c-layer-tool/contracts/Whitelistable.sol",
        "file": "./Whitelistable.sol",
        "id": 6359,
        "nodeType": "ImportDirective",
        "scope": 6468,
        "sourceUnit": 1732,
        "src": "61:29:36",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": None,
            "baseName": {
              "contractScope": None,
              "id": 6360,
              "name": "Whitelistable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1731,
              "src": "118:13:36",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Whitelistable_$1731",
                "typeString": "contract Whitelistable"
              }
            },
            "id": 6361,
            "nodeType": "InheritanceSpecifier",
            "src": "118:13:36"
          },
          {
            "arguments": None,
            "baseName": {
              "contractScope": None,
              "id": 6362,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6355,
              "src": "133:5:36",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$6355",
                "typeString": "contract ERC20"
              }
            },
            "id": 6363,
            "nodeType": "InheritanceSpecifier",
            "src": "133:5:36"
          }
        ],
        "contractDependencies": [
          1731,
          1977,
          2207,
          2264,
          6285,
          6355
        ],
        "contractKind": "contract",
        "documentation": None,
        "fullyImplemented": True,
        "id": 6467,
        "linearizedBaseContracts": [
          6467,
          6355,
          6285,
          2207,
          1731,
          1977,
          2264
        ],
        "name": "Tokenlistable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6372,
              "nodeType": "Block",
              "src": "257:5:36",
              "statements": []
            },
            "documentation": None,
            "id": 6373,
            "implemented": True,
            "kind": "constructor",
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": None,
                    "hexValue": "56656c6f4f6e65",
                    "id": 6366,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "string",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "164:9:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_cb28a6e987bef30f08e1e12b67296d9986742b6c29cb87b806cdae8dc8c1a19c",
                      "typeString": "literal_string \"VeloOne\""
                    },
                    "value": "VeloOne"
                  },
                  {
                    "argumentTypes": None,
                    "hexValue": "564c4f",
                    "id": 6367,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "string",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "175:5:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_f5ddb3de619693980143879db402024c585e87becdf7d1ca2eb6d72781767a33",
                      "typeString": "literal_string \"VLO\""
                    },
                    "value": "VLO"
                  },
                  {
                    "argumentTypes": None,
                    "hexValue": "307862303243343346353264466530376433356441393737343831303641383536316136623165366531",
                    "id": 6368,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "number",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "182:42:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    },
                    "value": "0xb02C43F52dFe07d35dA97748106A8561a6b1e6e1"
                  },
                  {
                    "argumentTypes": None,
                    "hexValue": "31303030303030303030303030303030303030303030",
                    "id": 6369,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "number",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "226:22:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_1000000000000000000000_by_1",
                      "typeString": "int_const 1000000000000000000000"
                    },
                    "value": "1000000000000000000000"
                  }
                ],
                "id": 6370,
                "modifierName": {
                  "argumentTypes": None,
                  "id": 6365,
                  "name": "ERC20",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6355,
                  "src": "158:5:36",
                  "typeDescriptions": {
                    "typeIdentifier": "t_type$_t_contract$_ERC20_$6355_$",
                    "typeString": "type(contract ERC20)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "158:91:36"
              }
            ],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6364,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "155:2:36"
            },
            "returnParameters": {
              "id": 6371,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "257:0:36"
            },
            "scope": 6467,
            "src": "144:118:36",
            "stateMutability": "nonpayable",
            "superFunction": None,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6391,
              "nodeType": "Block",
              "src": "356:45:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": None,
                    "arguments": [
                      {
                        "argumentTypes": None,
                        "id": 6387,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6375,
                        "src": "384:3:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6388,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6377,
                        "src": "389:6:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": None,
                        "id": 6385,
                        "name": "super",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6569,
                        "src": "369:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_super$_Tokenlistable_$6467",
                          "typeString": "contract super Tokenlistable"
                        }
                      },
                      "id": 6386,
                      "isConstant": False,
                      "isLValue": False,
                      "isPure": False,
                      "lValueRequested": False,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6052,
                      "src": "369:14:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) returns (bool)"
                      }
                    },
                    "id": 6389,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "kind": "functionCall",
                    "lValueRequested": False,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "369:27:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 6384,
                  "id": 6390,
                  "nodeType": "Return",
                  "src": "362:34:36"
                }
              ]
            },
            "documentation": None,
            "id": 6392,
            "implemented": True,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": None,
                    "id": 6380,
                    "name": "_to",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 6375,
                    "src": "329:3:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 6381,
                "modifierName": {
                  "argumentTypes": None,
                  "id": 6379,
                  "name": "onlyWhitelisted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1710,
                  "src": "313:15:36",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "313:20:36"
              }
            ],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6378,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6375,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6392,
                  "src": "284:11:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6374,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "284:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6377,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6392,
                  "src": "297:14:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6376,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "297:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "283:29:36"
            },
            "returnParameters": {
              "id": 6384,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6383,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6392,
                  "src": "350:4:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6382,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "350:4:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "349:6:36"
            },
            "scope": 6467,
            "src": "266:135:36",
            "stateMutability": "nonpayable",
            "superFunction": 6052,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6443,
              "nodeType": "Block",
              "src": "510:199:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": None,
                    "arguments": [
                      {
                        "argumentTypes": None,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 6410,
                        "isConstant": False,
                        "isLValue": False,
                        "isPure": False,
                        "lValueRequested": False,
                        "leftExpression": {
                          "argumentTypes": None,
                          "id": 6406,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6398,
                          "src": "524:6:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": None,
                          "baseExpression": {
                            "argumentTypes": None,
                            "id": 6407,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5950,
                            "src": "534:8:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6409,
                          "indexExpression": {
                            "argumentTypes": None,
                            "id": 6408,
                            "name": "_from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6394,
                            "src": "543:5:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": False,
                          "isLValue": True,
                          "isPure": False,
                          "lValueRequested": False,
                          "nodeType": "IndexAccess",
                          "src": "534:15:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "524:25:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 6405,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6485,
                        6486
                      ],
                      "referencedDeclaration": 6485,
                      "src": "516:7:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6411,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "kind": "functionCall",
                    "lValueRequested": False,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "516:34:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6412,
                  "nodeType": "ExpressionStatement",
                  "src": "516:34:36"
                },
                {
                  "expression": {
                    "argumentTypes": None,
                    "id": 6422,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "lValueRequested": False,
                    "leftHandSide": {
                      "argumentTypes": None,
                      "baseExpression": {
                        "argumentTypes": None,
                        "id": 6413,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5950,
                        "src": "556:8:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6415,
                      "indexExpression": {
                        "argumentTypes": None,
                        "id": 6414,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6394,
                        "src": "565:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": False,
                      "isLValue": True,
                      "isPure": False,
                      "lValueRequested": True,
                      "nodeType": "IndexAccess",
                      "src": "556:15:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": None,
                      "arguments": [
                        {
                          "argumentTypes": None,
                          "id": 6420,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6398,
                          "src": "594:6:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": None,
                          "baseExpression": {
                            "argumentTypes": None,
                            "id": 6416,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5950,
                            "src": "574:8:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6418,
                          "indexExpression": {
                            "argumentTypes": None,
                            "id": 6417,
                            "name": "_from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6394,
                            "src": "583:5:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": False,
                          "isLValue": True,
                          "isPure": False,
                          "lValueRequested": False,
                          "nodeType": "IndexAccess",
                          "src": "574:15:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6419,
                        "isConstant": False,
                        "isLValue": False,
                        "isPure": False,
                        "lValueRequested": False,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2629,
                        "src": "574:19:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6421,
                      "isConstant": False,
                      "isLValue": False,
                      "isPure": False,
                      "kind": "functionCall",
                      "lValueRequested": False,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "574:27:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "556:45:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6423,
                  "nodeType": "ExpressionStatement",
                  "src": "556:45:36"
                },
                {
                  "expression": {
                    "argumentTypes": None,
                    "id": 6433,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "lValueRequested": False,
                    "leftHandSide": {
                      "argumentTypes": None,
                      "baseExpression": {
                        "argumentTypes": None,
                        "id": 6424,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5950,
                        "src": "607:8:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6426,
                      "indexExpression": {
                        "argumentTypes": None,
                        "id": 6425,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6396,
                        "src": "616:3:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": False,
                      "isLValue": True,
                      "isPure": False,
                      "lValueRequested": True,
                      "nodeType": "IndexAccess",
                      "src": "607:13:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": None,
                      "arguments": [
                        {
                          "argumentTypes": None,
                          "id": 6431,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6398,
                          "src": "641:6:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": None,
                          "baseExpression": {
                            "argumentTypes": None,
                            "id": 6427,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5950,
                            "src": "623:8:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6429,
                          "indexExpression": {
                            "argumentTypes": None,
                            "id": 6428,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6396,
                            "src": "632:3:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": False,
                          "isLValue": True,
                          "isPure": False,
                          "lValueRequested": False,
                          "nodeType": "IndexAccess",
                          "src": "623:13:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6430,
                        "isConstant": False,
                        "isLValue": False,
                        "isPure": False,
                        "lValueRequested": False,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2653,
                        "src": "623:17:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6432,
                      "isConstant": False,
                      "isLValue": False,
                      "isPure": False,
                      "kind": "functionCall",
                      "lValueRequested": False,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "623:25:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "607:41:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6434,
                  "nodeType": "ExpressionStatement",
                  "src": "607:41:36"
                },
                {
                  "eventCall": {
                    "argumentTypes": None,
                    "arguments": [
                      {
                        "argumentTypes": None,
                        "id": 6436,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6394,
                        "src": "668:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6437,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6396,
                        "src": "675:3:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6438,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6398,
                        "src": "680:6:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 6435,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6276
                      ],
                      "referencedDeclaration": 6276,
                      "src": "659:8:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 6439,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "kind": "functionCall",
                    "lValueRequested": False,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "659:28:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6440,
                  "nodeType": "EmitStatement",
                  "src": "654:33:36"
                },
                {
                  "expression": {
                    "argumentTypes": None,
                    "hexValue": "74727565",
                    "id": 6441,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "bool",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "700:4:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 6404,
                  "id": 6442,
                  "nodeType": "Return",
                  "src": "693:11:36"
                }
              ]
            },
            "documentation": None,
            "id": 6444,
            "implemented": True,
            "kind": "function",
            "modifiers": [
              {
                "arguments": None,
                "id": 6401,
                "modifierName": {
                  "argumentTypes": None,
                  "id": 6400,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1917,
                  "src": "476:9:36",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "476:9:36"
              }
            ],
            "name": "ownerTransfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6399,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6394,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6444,
                  "src": "428:13:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6393,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "428:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6396,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6444,
                  "src": "443:11:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6395,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "443:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6398,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6444,
                  "src": "456:14:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6397,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "456:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "427:44:36"
            },
            "returnParameters": {
              "id": 6404,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6403,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6444,
                  "src": "502:4:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6402,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "502:4:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "501:6:36"
            },
            "scope": 6467,
            "src": "405:304:36",
            "stateMutability": "nonpayable",
            "superFunction": None,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6465,
              "nodeType": "Block",
              "src": "828:56:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": None,
                    "arguments": [
                      {
                        "argumentTypes": None,
                        "id": 6460,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6446,
                        "src": "860:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6461,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6448,
                        "src": "867:3:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6462,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6450,
                        "src": "872:6:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": None,
                        "id": 6458,
                        "name": "super",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6569,
                        "src": "841:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_super$_Tokenlistable_$6467",
                          "typeString": "contract super Tokenlistable"
                        }
                      },
                      "id": 6459,
                      "isConstant": False,
                      "isLValue": False,
                      "isPure": False,
                      "lValueRequested": False,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6138,
                      "src": "841:18:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,address,uint256) returns (bool)"
                      }
                    },
                    "id": 6463,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "kind": "functionCall",
                    "lValueRequested": False,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "841:38:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 6457,
                  "id": 6464,
                  "nodeType": "Return",
                  "src": "834:45:36"
                }
              ]
            },
            "documentation": None,
            "id": 6466,
            "implemented": True,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": None,
                    "id": 6453,
                    "name": "_to",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 6448,
                    "src": "799:3:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 6454,
                "modifierName": {
                  "argumentTypes": None,
                  "id": 6452,
                  "name": "onlyWhitelisted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1710,
                  "src": "783:15:36",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "783:20:36"
              }
            ],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6451,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6446,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6466,
                  "src": "735:13:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6445,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "735:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6448,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6466,
                  "src": "750:11:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6447,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "750:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6450,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6466,
                  "src": "763:14:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6449,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "763:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "734:44:36"
            },
            "returnParameters": {
              "id": 6457,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6456,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6466,
                  "src": "820:4:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6455,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "820:4:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "819:6:36"
            },
            "scope": 6467,
            "src": "713:171:36",
            "stateMutability": "nonpayable",
            "superFunction": 6138,
            "visibility": "public"
          }
        ],
        "scope": 6468,
        "src": "92:794:36"
      }
    ],
    "src": "0:887:36"
  },
  "legacyAST": {
    "absolutePath": "/work/c-layer-tool/contracts/tokenstable.sol",
    "exportedSymbols": {
      "Tokenlistable": [
        6467
      ]
    },
    "id": 6468,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 6357,
        "literals": [
          "solidity",
          ">=",
          "0.5",
          ".0",
          "<",
          "0.6",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:31:36"
      },
      {
        "absolutePath": "/work/c-layer-tool/contracts/token/ERC20.sol",
        "file": "./token/ERC20.sol",
        "id": 6358,
        "nodeType": "ImportDirective",
        "scope": 6468,
        "sourceUnit": 6356,
        "src": "33:27:36",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/work/c-layer-tool/contracts/Whitelistable.sol",
        "file": "./Whitelistable.sol",
        "id": 6359,
        "nodeType": "ImportDirective",
        "scope": 6468,
        "sourceUnit": 1732,
        "src": "61:29:36",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": None,
            "baseName": {
              "contractScope": None,
              "id": 6360,
              "name": "Whitelistable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1731,
              "src": "118:13:36",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Whitelistable_$1731",
                "typeString": "contract Whitelistable"
              }
            },
            "id": 6361,
            "nodeType": "InheritanceSpecifier",
            "src": "118:13:36"
          },
          {
            "arguments": None,
            "baseName": {
              "contractScope": None,
              "id": 6362,
              "name": "ERC20",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6355,
              "src": "133:5:36",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20_$6355",
                "typeString": "contract ERC20"
              }
            },
            "id": 6363,
            "nodeType": "InheritanceSpecifier",
            "src": "133:5:36"
          }
        ],
        "contractDependencies": [
          1731,
          1977,
          2207,
          2264,
          6285,
          6355
        ],
        "contractKind": "contract",
        "documentation": None,
        "fullyImplemented": True,
        "id": 6467,
        "linearizedBaseContracts": [
          6467,
          6355,
          6285,
          2207,
          1731,
          1977,
          2264
        ],
        "name": "Tokenlistable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 6372,
              "nodeType": "Block",
              "src": "257:5:36",
              "statements": []
            },
            "documentation": None,
            "id": 6373,
            "implemented": True,
            "kind": "constructor",
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": None,
                    "hexValue": "56656c6f4f6e65",
                    "id": 6366,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "string",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "164:9:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_cb28a6e987bef30f08e1e12b67296d9986742b6c29cb87b806cdae8dc8c1a19c",
                      "typeString": "literal_string \"VeloOne\""
                    },
                    "value": "VeloOne"
                  },
                  {
                    "argumentTypes": None,
                    "hexValue": "564c4f",
                    "id": 6367,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "string",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "175:5:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_stringliteral_f5ddb3de619693980143879db402024c585e87becdf7d1ca2eb6d72781767a33",
                      "typeString": "literal_string \"VLO\""
                    },
                    "value": "VLO"
                  },
                  {
                    "argumentTypes": None,
                    "hexValue": "307862303243343346353264466530376433356441393737343831303641383536316136623165366531",
                    "id": 6368,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "number",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "182:42:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    },
                    "value": "0xb02C43F52dFe07d35dA97748106A8561a6b1e6e1"
                  },
                  {
                    "argumentTypes": None,
                    "hexValue": "31303030303030303030303030303030303030303030",
                    "id": 6369,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "number",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "226:22:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_1000000000000000000000_by_1",
                      "typeString": "int_const 1000000000000000000000"
                    },
                    "value": "1000000000000000000000"
                  }
                ],
                "id": 6370,
                "modifierName": {
                  "argumentTypes": None,
                  "id": 6365,
                  "name": "ERC20",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6355,
                  "src": "158:5:36",
                  "typeDescriptions": {
                    "typeIdentifier": "t_type$_t_contract$_ERC20_$6355_$",
                    "typeString": "type(contract ERC20)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "158:91:36"
              }
            ],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6364,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "155:2:36"
            },
            "returnParameters": {
              "id": 6371,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "257:0:36"
            },
            "scope": 6467,
            "src": "144:118:36",
            "stateMutability": "nonpayable",
            "superFunction": None,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6391,
              "nodeType": "Block",
              "src": "356:45:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": None,
                    "arguments": [
                      {
                        "argumentTypes": None,
                        "id": 6387,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6375,
                        "src": "384:3:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6388,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6377,
                        "src": "389:6:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": None,
                        "id": 6385,
                        "name": "super",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6569,
                        "src": "369:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_super$_Tokenlistable_$6467",
                          "typeString": "contract super Tokenlistable"
                        }
                      },
                      "id": 6386,
                      "isConstant": False,
                      "isLValue": False,
                      "isPure": False,
                      "lValueRequested": False,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6052,
                      "src": "369:14:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,uint256) returns (bool)"
                      }
                    },
                    "id": 6389,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "kind": "functionCall",
                    "lValueRequested": False,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "369:27:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 6384,
                  "id": 6390,
                  "nodeType": "Return",
                  "src": "362:34:36"
                }
              ]
            },
            "documentation": None,
            "id": 6392,
            "implemented": True,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": None,
                    "id": 6380,
                    "name": "_to",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 6375,
                    "src": "329:3:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 6381,
                "modifierName": {
                  "argumentTypes": None,
                  "id": 6379,
                  "name": "onlyWhitelisted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1710,
                  "src": "313:15:36",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "313:20:36"
              }
            ],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6378,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6375,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6392,
                  "src": "284:11:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6374,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "284:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6377,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6392,
                  "src": "297:14:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6376,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "297:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "283:29:36"
            },
            "returnParameters": {
              "id": 6384,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6383,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6392,
                  "src": "350:4:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6382,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "350:4:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "349:6:36"
            },
            "scope": 6467,
            "src": "266:135:36",
            "stateMutability": "nonpayable",
            "superFunction": 6052,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6443,
              "nodeType": "Block",
              "src": "510:199:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": None,
                    "arguments": [
                      {
                        "argumentTypes": None,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 6410,
                        "isConstant": False,
                        "isLValue": False,
                        "isPure": False,
                        "lValueRequested": False,
                        "leftExpression": {
                          "argumentTypes": None,
                          "id": 6406,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6398,
                          "src": "524:6:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<=",
                        "rightExpression": {
                          "argumentTypes": None,
                          "baseExpression": {
                            "argumentTypes": None,
                            "id": 6407,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5950,
                            "src": "534:8:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6409,
                          "indexExpression": {
                            "argumentTypes": None,
                            "id": 6408,
                            "name": "_from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6394,
                            "src": "543:5:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": False,
                          "isLValue": True,
                          "isPure": False,
                          "lValueRequested": False,
                          "nodeType": "IndexAccess",
                          "src": "534:15:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "524:25:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 6405,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6485,
                        6486
                      ],
                      "referencedDeclaration": 6485,
                      "src": "516:7:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 6411,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "kind": "functionCall",
                    "lValueRequested": False,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "516:34:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6412,
                  "nodeType": "ExpressionStatement",
                  "src": "516:34:36"
                },
                {
                  "expression": {
                    "argumentTypes": None,
                    "id": 6422,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "lValueRequested": False,
                    "leftHandSide": {
                      "argumentTypes": None,
                      "baseExpression": {
                        "argumentTypes": None,
                        "id": 6413,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5950,
                        "src": "556:8:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6415,
                      "indexExpression": {
                        "argumentTypes": None,
                        "id": 6414,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6394,
                        "src": "565:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": False,
                      "isLValue": True,
                      "isPure": False,
                      "lValueRequested": True,
                      "nodeType": "IndexAccess",
                      "src": "556:15:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": None,
                      "arguments": [
                        {
                          "argumentTypes": None,
                          "id": 6420,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6398,
                          "src": "594:6:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": None,
                          "baseExpression": {
                            "argumentTypes": None,
                            "id": 6416,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5950,
                            "src": "574:8:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6418,
                          "indexExpression": {
                            "argumentTypes": None,
                            "id": 6417,
                            "name": "_from",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6394,
                            "src": "583:5:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": False,
                          "isLValue": True,
                          "isPure": False,
                          "lValueRequested": False,
                          "nodeType": "IndexAccess",
                          "src": "574:15:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6419,
                        "isConstant": False,
                        "isLValue": False,
                        "isPure": False,
                        "lValueRequested": False,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2629,
                        "src": "574:19:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6421,
                      "isConstant": False,
                      "isLValue": False,
                      "isPure": False,
                      "kind": "functionCall",
                      "lValueRequested": False,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "574:27:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "556:45:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6423,
                  "nodeType": "ExpressionStatement",
                  "src": "556:45:36"
                },
                {
                  "expression": {
                    "argumentTypes": None,
                    "id": 6433,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "lValueRequested": False,
                    "leftHandSide": {
                      "argumentTypes": None,
                      "baseExpression": {
                        "argumentTypes": None,
                        "id": 6424,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5950,
                        "src": "607:8:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 6426,
                      "indexExpression": {
                        "argumentTypes": None,
                        "id": 6425,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6396,
                        "src": "616:3:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": False,
                      "isLValue": True,
                      "isPure": False,
                      "lValueRequested": True,
                      "nodeType": "IndexAccess",
                      "src": "607:13:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": None,
                      "arguments": [
                        {
                          "argumentTypes": None,
                          "id": 6431,
                          "name": "_value",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6398,
                          "src": "641:6:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "expression": {
                          "argumentTypes": None,
                          "baseExpression": {
                            "argumentTypes": None,
                            "id": 6427,
                            "name": "balances",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5950,
                            "src": "623:8:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                              "typeString": "mapping(address => uint256)"
                            }
                          },
                          "id": 6429,
                          "indexExpression": {
                            "argumentTypes": None,
                            "id": 6428,
                            "name": "_to",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6396,
                            "src": "632:3:36",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "isConstant": False,
                          "isLValue": True,
                          "isPure": False,
                          "lValueRequested": False,
                          "nodeType": "IndexAccess",
                          "src": "623:13:36",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 6430,
                        "isConstant": False,
                        "isLValue": False,
                        "isPure": False,
                        "lValueRequested": False,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2653,
                        "src": "623:17:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 6432,
                      "isConstant": False,
                      "isLValue": False,
                      "isPure": False,
                      "kind": "functionCall",
                      "lValueRequested": False,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "623:25:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "607:41:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 6434,
                  "nodeType": "ExpressionStatement",
                  "src": "607:41:36"
                },
                {
                  "eventCall": {
                    "argumentTypes": None,
                    "arguments": [
                      {
                        "argumentTypes": None,
                        "id": 6436,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6394,
                        "src": "668:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6437,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6396,
                        "src": "675:3:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6438,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6398,
                        "src": "680:6:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 6435,
                      "name": "Transfer",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6276
                      ],
                      "referencedDeclaration": 6276,
                      "src": "659:8:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256)"
                      }
                    },
                    "id": 6439,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "kind": "functionCall",
                    "lValueRequested": False,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "659:28:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 6440,
                  "nodeType": "EmitStatement",
                  "src": "654:33:36"
                },
                {
                  "expression": {
                    "argumentTypes": None,
                    "hexValue": "74727565",
                    "id": 6441,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": True,
                    "kind": "bool",
                    "lValueRequested": False,
                    "nodeType": "Literal",
                    "src": "700:4:36",
                    "subdenomination": None,
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "value": "true"
                  },
                  "functionReturnParameters": 6404,
                  "id": 6442,
                  "nodeType": "Return",
                  "src": "693:11:36"
                }
              ]
            },
            "documentation": None,
            "id": 6444,
            "implemented": True,
            "kind": "function",
            "modifiers": [
              {
                "arguments": None,
                "id": 6401,
                "modifierName": {
                  "argumentTypes": None,
                  "id": 6400,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1917,
                  "src": "476:9:36",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "476:9:36"
              }
            ],
            "name": "ownerTransfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6399,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6394,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6444,
                  "src": "428:13:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6393,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "428:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6396,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6444,
                  "src": "443:11:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6395,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "443:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6398,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6444,
                  "src": "456:14:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6397,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "456:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "427:44:36"
            },
            "returnParameters": {
              "id": 6404,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6403,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6444,
                  "src": "502:4:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6402,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "502:4:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "501:6:36"
            },
            "scope": 6467,
            "src": "405:304:36",
            "stateMutability": "nonpayable",
            "superFunction": None,
            "visibility": "public"
          },
          {
            "body": {
              "id": 6465,
              "nodeType": "Block",
              "src": "828:56:36",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": None,
                    "arguments": [
                      {
                        "argumentTypes": None,
                        "id": 6460,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6446,
                        "src": "860:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6461,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6448,
                        "src": "867:3:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": None,
                        "id": 6462,
                        "name": "_value",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6450,
                        "src": "872:6:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": None,
                        "id": 6458,
                        "name": "super",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 6569,
                        "src": "841:5:36",
                        "typeDescriptions": {
                          "typeIdentifier": "t_super$_Tokenlistable_$6467",
                          "typeString": "contract super Tokenlistable"
                        }
                      },
                      "id": 6459,
                      "isConstant": False,
                      "isLValue": False,
                      "isPure": False,
                      "lValueRequested": False,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 6138,
                      "src": "841:18:36",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$_t_bool_$",
                        "typeString": "function (address,address,uint256) returns (bool)"
                      }
                    },
                    "id": 6463,
                    "isConstant": False,
                    "isLValue": False,
                    "isPure": False,
                    "kind": "functionCall",
                    "lValueRequested": False,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "841:38:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 6457,
                  "id": 6464,
                  "nodeType": "Return",
                  "src": "834:45:36"
                }
              ]
            },
            "documentation": None,
            "id": 6466,
            "implemented": True,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": None,
                    "id": 6453,
                    "name": "_to",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 6448,
                    "src": "799:3:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 6454,
                "modifierName": {
                  "argumentTypes": None,
                  "id": 6452,
                  "name": "onlyWhitelisted",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1710,
                  "src": "783:15:36",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "783:20:36"
              }
            ],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 6451,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6446,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 6466,
                  "src": "735:13:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6445,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "735:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6448,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 6466,
                  "src": "750:11:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 6447,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "750:7:36",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                },
                {
                  "constant": False,
                  "id": 6450,
                  "name": "_value",
                  "nodeType": "VariableDeclaration",
                  "scope": 6466,
                  "src": "763:14:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 6449,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "763:7:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "734:44:36"
            },
            "returnParameters": {
              "id": 6457,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": False,
                  "id": 6456,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 6466,
                  "src": "820:4:36",
                  "stateVariable": False,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 6455,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "820:4:36",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": None,
                  "visibility": "internal"
                }
              ],
              "src": "819:6:36"
            },
            "scope": 6467,
            "src": "713:171:36",
            "stateMutability": "nonpayable",
            "superFunction": 6138,
            "visibility": "public"
          }
        ],
        "scope": 6468,
        "src": "92:794:36"
      }
    ],
    "src": "0:887:36"
  },
  "compiler": {
    "name": "solc",
    "version": "0.5.11+commit.c082d0b4.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "3.2.0",
  "updatedAt": "2020-06-05T11:04:47.997Z",
  "devdoc": {
    "methods": {
      "owner()": {
        "details": "Returns the owner"
      },
      "renounceOwnership()": {
        "details": "Allows the current owner to relinquish control of the contract."
      },
      "transferOwnership(address)": {
        "details": "Allows the current owner to transfer control of the contract to a newOwner.",
        "params": {
          "_newOwner": "The address to transfer ownership to."
        }
      }
    }
  },
  "userdoc": {
    "methods": {}
  }
}
