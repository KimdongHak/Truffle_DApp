pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Participate.sol"; // 계약에서 Particiate 참여.sol import 명령

contract TestParty {
	// The address of the participation contract to be tested
	Participate participate = Participate(DeployedAddresses.Participate());

	// The id of the participant that will be used for testing
	uint expectedParticipatantId = 8;
	//The expected owner of participated person is this contract
	address expectedParticipatantId = address(this);

}
