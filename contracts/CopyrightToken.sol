pragma solidity ^0.4.17;

import "./ERC721.sol";
import "./Migrations.sol";

contract CopyrightToken {
    
    mapping(uint => address) internal tokenOwners;
    mapping(uint => bool) internal tokenExists;
    mapping(address => uint) internal copyrightCounts; // How many copyrights _id has
    mapping(address => mapping(address => uint256)) internal allowed;
    
    
    //private: Can call in this Contract
    struct Copyright {
        uint id;
        string photoURL;
        uint256 issueDate;
        address originalOwner;
        address oldOwner;
        address newOwner;
    }
    
    Copyright[] copyrights;
    
    function mint(string _photoURL) public{
        
        uint _id = copyrights.length;
        
        Copyright memory _copyright = Copyright({
            id: _id,
            photoURL: _photoURL,
            issueDate: uint256(now),
            originalOwner: msg.sender,
            oldOwner: address(0),
            newOwner: msg.sender
        });
        copyrights.push(_copyright);
        
        tokenOwners[_id] = msg.sender;
        tokenExists[_id] = true;
        copyrightCounts[msg.sender] += 1;
    }
    
    function getCopyrightInfo(uint _tokenId)
        external view
        returns(
        uint id,
        string photoURL,
        uint256 issueDate,
        address originalOwner,
        address oldOwner,
        address newOwner
    ) {
        Copyright storage c = copyrights[_tokenId];
        id = c.id;
        photoURL = c.photoURL;
        issueDate = c.issueDate;
        originalOwner = c.originalOwner;
        oldOwner = c.oldOwner;
        newOwner = c.newOwner;
    }

    
    /* 1. ERC20 compatible functions
       : let users perform actions such as sending tokens to others and checking balances of accounts.*/
    
    string public constant name = "CopyrightToken";
    string public constant symbol = "CRT"; // Token’s shorthand name
    
    function totalSupply() public view returns (uint256) { // Total number of copyrights we made
        return copyrights.length;
    }
    
    function balanceOf(address _owner) public view returns (uint256) { // How many copyrights _owner has
        return copyrightCounts[_owner];
    }
    
    
    /* 2. Ownership Functions */
    
    function ownerOf(uint256 _tokenId) public view returns (address) { // Who is the owner of this token?
        return tokenOwners[_tokenId];
    }
    
    function approve(address _to, uint256 _tokenId) public { // Approves other people has permission to transfer a token
        require(msg.sender == ownerOf(_tokenId));
        require(msg.sender != _to);
        
        allowed[msg.sender][_to] = _tokenId;
        // event Approval
    }
    
    function takeOwnership(uint256 _tokenId) public {
        require(tokenExists[_tokenId]);
        
        address oldOwner = ownerOf(_tokenId);
        address newOwner = msg.sender;
        
        require(oldOwner != newOwner);
        
        require(allowed[oldOwner][newOwner] == _tokenId);
        copyrightCounts[oldOwner] -= 1;
        tokenOwners[_tokenId] = newOwner;
        
        copyrightCounts[newOwner] += 1;
        
        // event. Transfer
    }
    
    function transfer(address _to, uint256 _tokenId) public {
        address oldOwner = msg.sender;
        address newOwner = _to;
        
        require(tokenExists[_tokenId]);
        
        require(oldOwner == ownerOf(_tokenId));
        require(oldOwner != newOwner);
        require(newOwner != address(0));
        
        copyrightCounts[oldOwner] -= 1;
        tokenOwners[_tokenId] = newOwner;
        
        copyrightCounts[newOwner] += 1;
        // event. Transfer
    }
}