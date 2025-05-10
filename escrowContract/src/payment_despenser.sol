// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentDispenser {
    // State variables
    address public bountyPoster;     // Address of person creating and funding the contract
    address public bountyHunter;     // Address of person who will receive the funds
    uint public amount;              // Amount of ETH locked in contract
    bool public complete;            // Status of the work

    // Events for tracking contract state changes
    event BountyCreated(address indexed poster, address indexed hunter, uint amount);
    event WorkCompleted(address indexed hunter, uint amount);
    event FundsReleased(address indexed hunter, uint amount);
    event BountyCancelled(address indexed poster, uint amount);


    constructor(address _bountyHunter) payable {
        require(msg.value > 0, "Must send funds to create bounty");
        require(_bountyHunter != address(0), "Invalid bounty hunter address");
        
        bountyPoster = msg.sender;    // Person deploying the contract
        bountyHunter = _bountyHunter; // Assigned bounty hunter
        amount = msg.value;           // Amount of ETH sent
        complete = false;             // Initial state

        emit BountyCreated(bountyPoster, bountyHunter, amount);
    }

    // Modifiers for access control
    modifier onlyBountyPoster() {
        require(msg.sender == bountyPoster, "Only bounty poster can call this");
        _;
    }

    modifier notCompleted() {
        require(!complete, "Work already marked as complete");
        _;
    }

    modifier isCompleted() {
        require(complete, "Work not marked as complete");
        _;
    }

    // Function to mark work as complete
    function markComplete() public onlyBountyPoster notCompleted {
        complete = true;
        emit WorkCompleted(bountyHunter, amount);
    }

    // Function to release funds to bounty hunter
    function releaseFunds() public isCompleted {
        require(address(this).balance >= amount, "Insufficient contract balance");
        uint paymentAmount = amount;
        amount = 0; // Reset amount before sending to prevent reentrancy

        // Transfer funds to bounty hunter
        (bool success, ) = bountyHunter.call{value: paymentAmount}("");
        require(success, "Transfer failed");

        emit FundsReleased(bountyHunter, paymentAmount);
    }

    // Function to cancel bounty and refund poster
    function cancelBounty() public onlyBountyPoster notCompleted {
        uint refundAmount = amount;
        amount = 0; // Reset amount before sending to prevent reentrancy

        // Refund bounty poster
        (bool success, ) = bountyPoster.call{value: refundAmount}("");
        require(success, "Refund failed");

        emit BountyCancelled(bountyPoster, refundAmount);
    }

    // Function to check contract balance
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}