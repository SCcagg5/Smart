pragma solidity >=0.5.0 <0.6.0;

import "./token/ERC20.sol";
import "./token/Whitelistable.sol";

contract Smarttoken is Whitelistable, ERC20 {

  constructor(
    string memory _name,
    string memory _symbol,
    address _initialAccount,
    uint256 _initialSupply)
  ERC20(_name, _symbol, _initialAccount, _initialSupply) public {}

  function transfer(address _to, uint256 _value) onlyWhitelisted(_to) public returns (bool) {
    return super.transfer(_to, _value);
  }

  function ownerTransfer(address _from, address _to, uint256 _value)
    onlyOwner public returns (bool)
  {
    require(_value <= balances[_from]);
    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    emit Transfer(_from, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value)
    onlyWhitelisted(_to) public returns (bool)
  {
    return super.transferFrom(_from, _to, _value);
  }
}
