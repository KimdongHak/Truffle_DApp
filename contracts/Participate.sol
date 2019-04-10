pragma solidity ^0.5.0;

contract Participate {
	address[16] public participants;
	function participate(uint participantId) public returns (uint){
		require(participantId >= 0 && participantId <= 15);
		participants[participantId] = msg.sender;
		return participantId;
	}
	function getParticipants() public view returns (address[16] memory){
		return participants;
	}
}