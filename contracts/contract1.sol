// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EscrowFundManagementToken is ERC20, ERC20Burnable, Ownable {

    constructor() ERC20("EscrowFundManagementToken", "EFMT" ) {}

    function deposit(address to, uint256 amount) public payable{
        require(msg.value==amount, "Value is less than amount");
        _mint(to, amount);
    }

    function withdrawal(uint256 amt) public payable {
        _burn(msg.sender,amt);
        payable(msg.sender).transfer(amt);
    }

    function contractBalance()public view returns(uint256){
        return address(this).balance;
    }

}

contract EscrowFundManagement {
    address public Owner;
    EscrowFundManagementToken tokenContract;
    address public tokenContractAddress;
    mapping(address=>address []) public addressesCollection;

    modifier onlyEFMOwner(){
        require(msg.sender==Owner, "This function is only be called by Owner");
        _;
    }
    constructor(){
        Owner=msg.sender;
        tokenContract=new EscrowFundManagementToken();
        tokenContractAddress=address(tokenContract);
    }

    function getContracts(address from) public view returns(address [] memory ){
        return addressesCollection[from];
    }
    
    function OwnerTransfer(address to) onlyEFMOwner external {
        Owner=to;
    }

    function generateContract(address payable _buyer, address payable _seller, uint256 _amount) public {
        escrow ecContract= new escrow(_buyer, _seller, _amount,tokenContractAddress,Owner);
        addressesCollection[_buyer].push(address(ecContract));
        addressesCollection[_seller].push(address(ecContract));
    }

    function contractBalance()public view returns(uint256){
        return address(this).balance;
    }

}

contract escrow {
    // Declaring the state variables
    
    address payable public buyer;
    address payable public seller;
    address payable public arbiter;
    address payable public contractAddress=payable(address(this));
    EscrowFundManagementToken tokenContract;
    address public tokenContractAddress;
    uint256 public contractAmount;
    // mapping(address => uint) TotalAmount;
    address public Owner;
  
    // Defining a enumerator 'State'
    enum State{
         
        // Following are the data members
        awate_payment, awate_shipping,awate_delivery, complete, payment_return 
    }
  
    // Declaring the object of the enumerator
    State public state;
      
    // Defining function modifier 'instate'
    modifier instate(State expected_state){
          
        require(state == expected_state, "State is not Matching");
        _;
    }
  
   // Defining function modifier 'onlyBuyer'
    modifier onlyBuyer(){
        require(msg.sender == buyer, "Only buyer can call this function");
        _;
    }
  
    // Defining function modifier 'onlySeller'
    modifier onlySeller(){
        require(msg.sender == seller, "Only seller can call this function");
        _;
    }
      
    // Defining a constructor
    constructor(address payable _buyer, address payable _seller, uint256 _amount, address _tokenContractAddress, address _owner) {

        arbiter = payable(msg.sender);
        buyer = _buyer;
        seller = _seller;
        contractAmount=_amount;
        state = State.awate_payment;
        tokenContractAddress=_tokenContractAddress;
        tokenContract= EscrowFundManagementToken(_tokenContractAddress);
        Owner=_owner;
    }
      
    // Defining function to confirm payment
    function confirm_payment() onlyBuyer instate(State.awate_payment) public {
      require(tokenContract.balanceOf(address(this))>=contractAmount,"Pay the payment");
        // tokenContract.transfer(address(this),contractAmount);
        state = State.awate_shipping;
          
    }

    function confirm_shipped() onlySeller instate(State.awate_shipping) public {
      
        state = State.awate_delivery;
    }
      
    // Defining function to confirm delivery
    function confirm_Delivery() onlyBuyer instate(State.awate_delivery) public{
          
        tokenContract.transfer(seller,contractAmount);
        state = State.complete;
    }
  
    // Defining function to return payment
    function ReturnPayment() public{
        require(msg.sender==Owner || msg.sender==seller,"This function is only called by Owner or seller");
        require(state == State.awate_delivery || state == State.awate_shipping, "State is not Matching");
        tokenContract.transfer(buyer,contractAmount);
        state = State.payment_return;
    }

}
