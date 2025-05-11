//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Bounty{

    /*
        @title Payment Escrow Contract 
        @notice This contract is created to facilitate payments beetween the bountyProvider and the bountyHunter 
        @dev This implements an Escrow contract with a buyer and seller
    */

   
    //CREATE BOUNTY BY PROVIDER WITH FUNDS, AN OPEN STATUS AND TIME PERIOD
    //HUNTERS JOIN THE BOUNTY
    //HUNTER FINDS SOLUTION AND PR MERGED BEFORE TIME PERIOD ENDS
    //BOUNTY AS COMPLETED
    //BOUNTY MARKED AS CLOSED
    //BOUNTY RELEASED TO HUNTER AFTER BOUNTY CLOSED IF MARKED COMPLETED
    //BOUNTY CANCELLED AND FUNDS RETURNED TO BOUNTY PROVIDER IF TIME PERIOD ENDS AND NOT COMPLETED


    //errors
    error Bounty__TransferFailed();
    error Bounty__UpkeepNotNeeded();

    //emits
    event BountyCreated(address indexed provider, uint256 amount);
    event HunterAddedSuccessfully(address indexed hunter);
    event BountyCancelled(address indexed bountyProvider, uint256 amount);


    enum BountyState{
        OPEN,
        COMPLETED,
        CLOSED,
        CANCELLED
    }

    address immutable private i_bountyProvider;
    address [] private s_bountyHunters;
    mapping(address => bool) private s_isBountyHunter; //false by default
    uint256 immutable private i_bountyAmount;
    uint256 immutable private i_timeInterval;
    uint256 private s_initialTimestamp;
    address private s_winnerHunter;

    BountyState private s_bountyState;

    constructor(uint256 _timeInterval) payable{
        require(msg.value >0, "must send some funds to create Bounty");

        i_bountyProvider= msg.sender;
        i_bountyAmount= msg.value;
        i_timeInterval= _timeInterval;
        s_initialTimestamp= block.timestamp;

        emit BountyCreated(i_bountyProvider, i_bountyAmount);
    }

    modifier onlyBountyProvider{
        require(msg.sender == i_bountyProvider);
        _;
    }

    function addHunter() public{
        require(!s_isBountyHunter[msg.sender], "Already added");
        require(msg.sender != i_bountyProvider, "Bounty Provider can't join as hunter");
        require(block.timestamp - s_initialTimestamp < i_timeInterval, "Bounty has expired");

        s_isBountyHunter[msg.sender] = true;
        s_bountyHunters.push(msg.sender);

        emit HunterAddedSuccessfully(msg.sender);
    }

    function checkUpkeep(bytes memory /*CheckData*/) public view returns(bool upkeepNeeded, bytes memory /*performData*/){

        bool timePassed= (block.timestamp - s_initialTimestamp) > i_timeInterval;
        bool isClosed= getBountyisClosed();

        upkeepNeeded= timePassed && isClosed;
        return(upkeepNeeded, ""); //performData blank
        
    }

    function performUpkeep() public payable{
        (bool upkeepNeeded, ) = checkUpkeep("");
        if(!upkeepNeeded){
            revert Bounty__UpkeepNotNeeded();
        }

    }

    function markBountyAsCompleted() onlyBountyProvider private {
        s_bountyState= BountyState.COMPLETED;
    }

    function markBountyAsClosed() onlyBountyProvider private {
        s_bountyState= BountyState.CLOSED;
    }

    function markBountyAsCancelled() onlyBountyProvider private {
        (bool success,)= i_bountyProvider.call{value: address(this).balance}("");
        if(!success){
            revert Bounty__TransferFailed();
        }
        s_bountyState= BountyState.CANCELLED;
        emit BountyCancelled(i_bountyProvider, i_bountyAmount);
    }

    function markBountyAsOpen() onlyBountyProvider private {
        s_bountyState= BountyState.OPEN;
    }


    //getters

    function getBountyProvider() public view returns(address){
        return i_bountyProvider;
    }

    function getBountyHunters() public view returns(address [] memory){
        return s_bountyHunters;
    }

    function getBountyAmount() public view returns(uint256){
        return i_bountyAmount;    }

    function getBountyIsIOpen() public view returns(bool){
        return (s_bountyState == BountyState.OPEN);
    }

    function getBountyIsCompleted() public view returns(bool){
        return (s_bountyState == BountyState.COMPLETED);
    }

    function getBountyisClosed() public view returns(bool){
        return (s_bountyState == BountyState.CLOSED);
    }

    function getBountyIsCancelled() public view returns(bool){
        return (s_bountyState == BountyState.CANCELLED);
    }
     


    
}