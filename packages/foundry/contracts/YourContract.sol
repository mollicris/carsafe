//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

//import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract is AccessControl{
    address public owner;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant CONCESSIONAIRE_ROLE =
        keccak256("CONCESSIONAIRE_ROLE");
    bytes32 public constant WORSHOP_ROLE = keccak256("WORKSHOP_ROLE");

    enum ApprovalStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
    struct Fix {
        uint256 id;
        uint256 workshopId;
        string description;
        uint256 date;
        uint256 cost;
    }
    struct Vehicle {
        uint256 id;
        string plate;
        string model;
        string brand;
        string vin;
        uint256 year;
        uint256 mileage;
        address currentOwner;
        bool isSold;
        string contact;
        uint256 price;
        Fix[] fixes;
    }

    struct Concessionaire {
        uint256 id;
        string name;
        string country;
        string city;
        string addressDetail;
        string phone;
        string email;
        string nit;
        string certifications; //se guarda como un string separado por comas
        bool isEnabled;
        address wallet;
        ApprovalStatus status;
    }

    struct Workshop {
        uint256 id;
        string name;
        string country;
        string city;
        string addressDetail;
        string phone;
        string services; //se guarda como un string separado por comas
        uint256 rating;
        bool isEnabled;
        address wallet;
        ApprovalStatus status;
    }

    mapping(string => Vehicle) public vehicleToPlate;

    Concessionaire[] public concessionaires;
    Concessionaire[] public approvedConcessionaires;

    Workshop[] public workshops;
    Workshop[] public approvedWorkshops;

    event ConcessionaireRegistered(uint256 id, string name, address wallet);
    event ConcessionaireApproved(string name, address wallet);
    event WorkshopRegistered(uint256 id, string name, address wallet);
    event WorkshopApproved(string name, address wallet);
    event VehicleRegistered(string plate, string model, string brand);
    event FixRegistered(string plate, uint256 fixId, uint256 workshopId);

    constructor() {
        owner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }


    // **************************** REGISTRATION & APPROVALS *************************************
    //
    // ****************************  *************************************

    /**
     * @notice Registers a new concessionaire with pending approval status.
     *         The concessionaire is added with initial data and the caller set as its wallet address.
     * @param concessionaire The Concessionaire struct containing all details of the concessionaire to be registered.
     */
    function registerConseccionaire(
        Concessionaire memory concessionaire
    ) public {
        uint256 id = concessionaires.length;
        concessionaires.push(
            Concessionaire({
                id: id,
                name: concessionaire.name,
                country: concessionaire.country,
                city: concessionaire.city,
                addressDetail: concessionaire.addressDetail,
                phone: concessionaire.phone,
                email: concessionaire.email,
                nit: concessionaire.nit,
                certifications: concessionaire.certifications,
                isEnabled: false,
                wallet: msg.sender,
                status: ApprovalStatus.PENDING
            })
        );
        emit ConcessionaireRegistered(id, concessionaire.name, msg.sender);
    }

    /**
     * @notice Registers a new workshop with pending approval status.
     *         The workshop is added with initial data and the caller set as its wallet address.
     * @param workshop The Workshop struct containing all details of the workshop to be registered.
     */
    function registerWorkshop(Workshop memory workshop) public {
        uint256 id = workshops.length;
        workshops.push(
            Workshop({
                id: id,
                name: workshop.name,
                country: workshop.country,
                city: workshop.city,
                addressDetail: workshop.addressDetail,
                phone: workshop.phone,
                services: workshop.services,
                rating: 0,
                isEnabled: false,
                wallet: msg.sender,
                status: ApprovalStatus.PENDING
            })
        );
        emit WorkshopRegistered(id, workshop.name, msg.sender);
    }

    /**
     * @notice Allows a concessionaire with the proper role to register a new vehicle.
     *         Ensures the vehicle plate is unique and assigns the registering concessionaire as the initial owner.
     * @param vehicle The Vehicle struct containing all details of the vehicle to be registered.
     */
    function registerVehicle(Vehicle memory vehicle) public {
        require(
            hasRole(CONCESSIONAIRE_ROLE, msg.sender),
            "Only concessionaires can register vehicles"
        );
        require(
            keccak256(bytes(vehicleToPlate[vehicle.plate].plate)) ==
                keccak256(bytes("")),
            "Vehicle with this plate already exists"
        );
        vehicleToPlate[vehicle.plate] = Vehicle({
            id: vehicle.id,
            plate: vehicle.plate,
            model: vehicle.model,
            brand: vehicle.brand,
            vin: vehicle.vin,
            year: vehicle.year,
            mileage: vehicle.mileage,
            currentOwner: msg.sender,
            isSold: false,
            contact: vehicle.contact,
            price: vehicle.price,
            fixes: new Fix[](0)
        });
        emit VehicleRegistered(vehicle.plate, vehicle.model, vehicle.brand);
    }

    /**
     * @notice Allows a workshop with the proper role to register a fix for a vehicle.
     *         Only vehicles with an owner can have fixes registered.
     * @param plate The plate identifier of the vehicle to be fixed.
     * @param fix The Fix struct containing details of the repair.
     */
    function registerFix(string memory plate, Fix memory fix) public {
        require(
            hasRole(WORSHOP_ROLE, msg.sender),
            "Only workshops can register fixes"
        );
        Vehicle storage vehicle = vehicleToPlate[plate];
        require(
            vehicle.currentOwner != address(0),
            "Vehicle with this plate does not exist"
        );
        uint256 fixId = vehicle.fixes.length;
        vehicle.fixes.push(
            Fix({
                id: fixId,
                workshopId: fix.workshopId,
                description: fix.description,
                date: fix.date,
                cost: fix.cost
            })
        );
    }

    /**
     * @notice Allows an admin to approve or reject a concessionaire registration.
     *         If approved, the concessionaire is enabled and receives the concessionaire role.
     *         If rejected, the concessionaire is disabled.
     * @param id The index of the concessionaire in the concessionaires array.
     * @param isApproved True to approve, false to reject the concessionaire.
     */
    function approveConcessionaire(
        uint256 id,
        bool isApproved
    ) public onlyRole(ADMIN_ROLE) {
        require(id < concessionaires.length, "Invalid concessionaire ID");
        Concessionaire storage concessionaire = concessionaires[id];
        require(
            concessionaire.status == ApprovalStatus.PENDING,
            "Concessionaire already reviewed"
        );
        if (isApproved) {
            concessionaire.status = ApprovalStatus.APPROVED;
            concessionaire.isEnabled = true;
            _grantRole(CONCESSIONAIRE_ROLE, concessionaire.wallet);
            approvedConcessionaires.push(concessionaire);
            emit ConcessionaireApproved(
                concessionaire.name,
                concessionaire.wallet
            );
        } else {
            concessionaire.status = ApprovalStatus.REJECTED;
            concessionaire.isEnabled = false;
        }
    }

    /**
     * @notice Allows an admin to approve or reject a workshop registration.
     *         If approved, the workshop is enabled and receives the workshop role.
     *         If rejected, the workshop is disabled.
     * @param id The index of the workshop in the workshops array.
     * @param isApproved True to approve, false to reject the workshop.
     */
    function approveWorkshop(
        uint256 id,
        bool isApproved
    ) public onlyRole(ADMIN_ROLE) {
        require(id < workshops.length, "Invalid workshop ID");
        Workshop storage workshop = workshops[id];
        require(
            workshop.status == ApprovalStatus.PENDING,
            "Workshop already reviewed"
        );
        if (isApproved) {
            workshop.status = ApprovalStatus.APPROVED;
            workshop.isEnabled = true;
            _grantRole(WORSHOP_ROLE, workshop.wallet);
            approvedWorkshops.push(workshop);
            emit WorkshopApproved(workshop.name, workshop.wallet);
        } else {
            workshop.status = ApprovalStatus.REJECTED;
            workshop.isEnabled = false;
        }
    }



    // **************************** SELLING CAR *************************************
    //
    // ****************************  *************************************

    /**
     * @notice Allows a concessionaire to sell a vehicle, assigning a new owner and updating the sale price.
     *         The sale is permitted if the vehicle has no owner or if the concessionaire is the current owner.
     * @param plate The plate identifier of the vehicle to be sold.
     * @param newOwner The address of the new owner.
     * @param newPrice The new price of the vehicle after the sale.
     */
    function concessionaireSellCar(
        string memory plate,
        address newOwner,
        uint256 newPrice
    ) public onlyRole(CONCESSIONAIRE_ROLE) {
        Vehicle storage vehicle = vehicleToPlate[plate];
        require(
            keccak256(bytes(vehicle.plate)) != keccak256(bytes("")),
            "Vehicle with this plate does not exist"
        );
        require(
            vehicle.currentOwner == address(0) ||
                vehicle.currentOwner == msg.sender,
            "Only the current owner or no owner can sell the vehicle"
        );
        vehicle.currentOwner = newOwner;
        vehicle.isSold = true;
        vehicle.price = newPrice;
    }

    /**
     * @notice Allows the current owner of a vehicle to transfer ownership and update the sale price.
     * @param plate The plate identifier of the vehicle to be sold.
     * @param newOwner The address of the new owner.
     * @param newPrice The new price of the vehicle after the sale.
     */
    function ownerSellCar(
        string memory plate,
        address newOwner,
        uint256 newPrice
    ) public {
        Vehicle storage vehicle = vehicleToPlate[plate];
        require(
            vehicle.currentOwner != address(0),
            "Vehicle with this plate does not exist"
        );
        require(
            vehicle.currentOwner == msg.sender,
            "Only the current owner can sell the vehicle"
        );
        vehicle.currentOwner = newOwner;
        vehicle.isSold = true;
        vehicle.price = newPrice;
    }





    // **************************** GETTERS *************************************
    //
    // ****************************  *************************************

    /**
     * @notice Returns the list of concessionaires with pending and rejected status.
     * @return Array of Workshop structs with approval status.
     */
    function getConcessionaires()
        public
        view
        returns (Concessionaire[] memory)
    {
        return concessionaires;
    }

    /**
     * @notice Returns the list of workshops with pending and rejected status.
     * @return Array of Workshop structs with approval status.
     */
    function getWorkshops() public view returns (Workshop[] memory) {
        return dummyWorkshops;
    }

    /**
     * @notice Returns the list of approved concessionaires.
     * @return Array of Concessionaire structs with approval status.
     */
    function getApprovedConcessionaires()
        public
        view
        returns (Concessionaire[] memory)
    {
        return approvedConcessionaires;
    }

    /**
     * @notice Returns the list of approved workshops.
     * @return Array of Workshop structs with approval status.
     */
    function getApprovedWorkshops() public view returns (Workshop[] memory) {
        return approvedWorkshops;
    }

    /**
     * @notice Returns the vehicle data associated with a given plate.
     * @param _plate The plate identifier of the vehicle.
     * @return Vehicle struct containing all vehicle details and its fixes.
     */
    function getCarByplate(
        string memory _plate
    ) public view returns (Vehicle memory) {
        return vehicleToPlate[_plate];
    }
    //getter para devolver el rol 
}
