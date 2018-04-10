pragma solidity ^0.4.21;

contract SimpleStorage {
  uint StoreData;
  address public minter;
  mapping (address => uint) public balances;

  event Sent(address from, address to, uint amount);

  function SimpleStorage(uint data) public {
    StoreData = data;
    minter = msg.sender;
  }

  function mint(address receiver, uint amount) private {
    if (msg.sender != minter) return;
    balances[receiver]+= amount;
  }

  function getBalance(address add) view public returns (uint) {
    return balances[add];
  }

  function send(address receiver, uint amount) public {
    if (balances[msg.sender] < amount) return;
    balances[msg.sender] -= amount;
    balances[receiver] += amount;
    emit Sent(msg.sender, receiver, amount);
  }

  function set(uint x) private {
    StoreData = x;
  }

  function get() public constant returns (uint) {
    return StoreData;
  }
}
