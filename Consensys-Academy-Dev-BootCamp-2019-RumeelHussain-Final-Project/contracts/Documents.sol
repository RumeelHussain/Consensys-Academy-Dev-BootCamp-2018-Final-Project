pragma solidity ^0.4.24;

import "./StringUtils.sol";
import "./Accounts.sol";

/** @title Documents. */
contract Documents {
    
  address private owner;
  address public accountsAddress;
  Document[] private documents;
  mapping (address => Count) private counts;
  enum DocStatus {Pending, Verified, Rejected}
  mapping (address => uint) balances;
 
  struct Document {
    address requester;
    address verifier;
    string name;
    string description;
    string docAddress;
    DocStatus status;
  }
  
  struct Count {
    uint verified;
    uint rejected;
    uint total;
  }

  event DocumentAdded (address user);
  event DocumentVerified (address user);
  event test (uint test);

  /** @dev check for document address exists.
      * @param _docAddress document address.
      */
  modifier docAddressExists(string _docAddress) 
  {
    bool found = false;
    for (uint i=0; i<documents.length; i++) {
      if (StringUtils.equal(documents[i].docAddress, _docAddress)) {
          found = true;
          break; 
      }
    }
    require(!found);
    _;
  }

  /** @dev check for user paid enough.
      * @param addr user address.
      */
  modifier paidEnough(address addr) { 
    require(msg.value >= Accounts(accountsAddress).getPrice(addr));
    _;
  }

  /** @dev refund extra amount sent.
      * @param addr user address.
      */
  modifier refund(address addr) {
    //refund extra ether received
    _;
    uint price = Accounts(accountsAddress).getPrice(addr);
    uint amountToRefund = msg.value - price;
    if(amountToRefund > 0){
        msg.sender.transfer(amountToRefund);
        
        balances[addr] += price;
    }
  }

  constructor(address acctAddr) 
  public 
  {
    owner = msg.sender;
    accountsAddress = acctAddr;
  }
  /** @dev add document.
      * @param _verifier verifier address.
      * @param _name document name.
      * @param _description document _description.
      * @param _docAddress document _docAddress.
      */
  function addDocument(address _verifier, string _name, string _description, string _docAddress) 
  public 
  payable
  docAddressExists(_docAddress)
  paidEnough(_verifier)
  refund(_verifier)
  {
    emit DocumentAdded(msg.sender);
    
    documents.push(
      Document({
        name: _name,
        requester: msg.sender,
        verifier: _verifier,
        description: _description,
        docAddress: _docAddress,
        status: DocStatus.Pending
      })
    );
    
    counts[msg.sender].total = counts[msg.sender].total + 1;
    counts[_verifier].total = counts[_verifier].total + 1;
  }

  /** @dev get document.
      * @param docAddress document address.
      * @return name document name.
      * @return requester document requester.
      * @return verifier document verifier.
      * @return description document description.
      * @return status document status.
      */
  function getDocument(string docAddress) 
  public 
  view 
  returns (string name, address requester, address verifier, string description, DocStatus status) {
    for (uint i=0; i<documents.length; i++) {
      if(StringUtils.equal(documents[i].docAddress, docAddress)){
        requester = documents[i].requester;
        verifier = documents[i].verifier;
        name = documents[i].name;
        description = documents[i].description;
        status = documents[i].status;
        break;
      }
    }
    return (name, requester, verifier, description, status);
  }
  
  /** @dev get Verifier document.
      * @param _verifier user address.
      * @param lIndex document index.
      * @return name document name.
      * @return requester document requester.
      * @return description document description.
      * @return docAddress document docAddress.
      * @return status document status.
      * @return index document index.
      */  
  function getVerifierDocuments(address _verifier, uint lIndex) 
  public 
  view 
  returns (string name, address requester, string description, string docAddress, DocStatus status, uint index) {
    for (uint i=lIndex; i<documents.length; i++) {
      if(documents[i].verifier == _verifier){
        requester = documents[i].requester;
        name = documents[i].name;
        description = documents[i].description;
        docAddress = documents[i].docAddress;
        status = documents[i].status;
        index = i;
        break;
      }
    }
    return (name, requester, description, docAddress, status, index);
  }
  
  /** @dev get requester document.
      * @param _requester user address.
      * @param lIndex document index.
      * @return name document name.
      * @return verifier document verifier.
      * @return description document description.
      * @return docAddress document docAddress.
      * @return status document status.
      * @return index document index.
      */  
  function getRequesterDocuments(address _requester, uint lIndex) 
  public 
  view 
  returns (string name, address verifier, string description, string docAddress, DocStatus status, uint index) {
    for (uint i=lIndex; i<documents.length; i++) {
      if(documents[i].requester == _requester){
        verifier = documents[i].verifier;
        name = documents[i].name;
        description = documents[i].description;
        docAddress = documents[i].docAddress;
        status = documents[i].status;
        index = i;
        break;
      }
    }
    return (name, verifier, description, docAddress, status, index);
  }
  
  /** @dev verify document.
      * @param docAddress document address.
      * @param status document status.
      */   
  function verifyDocument(string docAddress, DocStatus status) 
  public 
  payable
  {
    for (uint i=0; i<documents.length; i++) {
      if(StringUtils.equal(documents[i].docAddress, docAddress) && documents[i].verifier == msg.sender && documents[i].status == DocStatus.Pending){
        emit DocumentVerified(msg.sender);
        uint price = Accounts(accountsAddress).getPrice(documents[i].verifier);
        balances[documents[i].verifier] -= price;
        if(status == DocStatus.Rejected){
            counts[documents[i].requester].rejected = counts[documents[i].requester].rejected + 1;
            counts[documents[i].verifier].rejected = counts[documents[i].verifier].rejected + 1;
            // return the ether for rejection
            documents[i].requester.transfer(price);
        }
        if(status == DocStatus.Verified){
            counts[documents[i].requester].verified = counts[documents[i].requester].rejected + 1;
            counts[documents[i].verifier].verified = counts[documents[i].verifier].verified + 1;
            // send ether to verified account
            documents[i].verifier.transfer(price);
        }
        documents[i].status = status;
        break;
      }
    }
  }

  /** @dev get count for users.
      * @param account user address.
      * @return verified count.
      * @return rejected count.
      * @return total count.
      */ 
  function getCounts (address account) 
  public 
  view
  returns(uint verified, uint rejected, uint total) 
  {
    return (counts[account].verified, counts[account].rejected, counts[account].total);
  }

  /** @dev kill smart contract if something bad happens.
      */
  function kill() 
  public 
  {
    if (msg.sender == owner) selfdestruct(owner);
  }
}