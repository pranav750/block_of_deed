pragma solidity ^0.6.5;

contract MainContract {
    mapping(string => address) public owners;
    mapping(string => address) public admins;
    uint public adminsCount;
    uint public ownersCount; 

    function createOwner(string memory ownerName) public {
        address owner = address(new Owner(ownerName));
        owners[ownerName] = owner;
        ownersCount++;
    }

    function createAdmin(string memory adminName) public {
        address admin = address(new Admin(adminName));
        admins[adminName] = admin;
        adminsCount++;
    }

    function checkAdmin(string memory adminName, address adminAddress) public view returns (bool) {
        return admins[adminName] == adminAddress;
    }
    
    function checkOwner(string memory ownerName, address ownerAddress) public view returns (bool) {
        return owners[ownerName] == ownerAddress;
    }
}

contract Admin {
    string public name;

    constructor(string memory tempName) public {
        name = tempName;
    }
    
    function updateName(string memory newName) public {
        name = newName;
    }
}

contract Owner {
    struct Property {
        string location;
        string city;
        string state;
        string country;
        uint area;
        bool loanOngoing;
        bool loanCompleted;
        bool owned;
    }
    
    string public name;
    Property[] public properties;
    
    constructor(string memory tempName) public {
        name = tempName;
    }
    
    function addProperty(string memory location, string memory city, string memory state, string memory country, uint area, bool loanOngoing, bool loanCompleted) public {
        Property memory newProperty = Property({
            location: location,
            city: city,
            state: state,
            country: country,
            area: area,
            loanOngoing: loanOngoing,
            loanCompleted: loanCompleted,
            owned: true
        });

        properties.push(newProperty);
    }
    
    function loanCompleted(uint index) public {
        Property storage property = properties[index];
        property.loanCompleted = true;
        property.loanOngoing = false;
    }

    function movingOut(uint index) public {
        Property storage property = properties[index];
        property.owned = false;
    }

    function noOfPropertiesRegistered() public view returns (uint) {
        return properties.length;
    }
    
    function updateName(string memory newName) public {
        name = newName;
    }
}