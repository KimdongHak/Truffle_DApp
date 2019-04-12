pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Participation.sol"; // 계약에서 Participate 참여.sol import 명령

contract TestParticpation {
	// The address of the participation contract to be tested
	Participation participation = Participation(DeployedAddresses.Participation());

	// The id of the participant that will be used for testing
	uint expectedPartyId = 8;
	
	//The expected owner of participated person is this contract
	address expectedParticipant = address(this);

	function testUserCanParticipateParty() public {
		uint returnedId = participation.participate(expectedPartyId);
		Assert.equal(returnedId,expectedPartyId, "Participation of the expected party should match what is returned");
	}

	function testGetParticipantAddressByPartyId() public {
		address participant = participation.participants(expectedPartyId);
		Assert.equal(participant,expectedParticipant,"Owner of the expected party should be this contract");
	}
	function testGetParticipantAddressByPartyIdInArray() public {
		address[16] memory participants = participation.getParticipants();

		Assert.equal(participants[expectedPartyId], expectedParticipant, "Owner of the expected party should be this contract");
	}
}
