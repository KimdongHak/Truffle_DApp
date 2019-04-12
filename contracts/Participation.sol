pragma solidity ^0.5.0;

contract Participation {
	address[16] public participants;
	function participate(uint partyId) public returns (uint){
		require(partyId >= 0 && partyId <= 15);
		participants[partyId] = msg.sender;
		return partyId;
	}
	function getParticipants() public view returns (address[16] memory){
		return participants;
	}
}