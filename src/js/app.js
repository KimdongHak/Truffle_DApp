App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../partys.json', function(data) {
      var partysRow = $('#partysRow');
      var partyTemplate = $('#partyTemplate');

      for (i = 0; i < data.length; i ++) {
        partyTemplate.find('.panel-title').text(data[i].name);
        partyTemplate.find('img').attr('src', data[i].picture);
        partyTemplate.find('.party-name').text(data[i].breed);
        partyTemplate.find('.party-personnel').text(data[i].age);
        partyTemplate.find('.party-location').text(data[i].location);
        partyTemplate.find('.btn-participate').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
		App.web3Provider = window.ethereum;
		try {
			// Request account access
			await window.ethereum.enable();
		} catch (error) {
			// User denied account access...
			console.error("User denied account access")
		}
	}	
	else if (window.web3) {
		App.web3Provider = window.web3.currentProvider;
	}
	else {
		App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
	}
	web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Participation.json', function(data) {
	  // Get the necessary contract artifact file and instantiate it with truffle-contract
  	var ParticipationArtifact = data;
  	App.contracts.Participation = TruffleContract(ParticipationArtifact);

	// Set the provider for our contract
  	App.contracts.Participation.setProvider(App.web3Provider);

  	// Use our contract to retrieve and mark the adopted pets
  	return App.markParticipated();
	});
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-participate', App.handleParticipate);
  },

  markParticipated: function(Participants, account) {
    var participationInstance;
	App.contracts.Participation.deployed().then(function(instance) {
		participationInstance = instance;
		return participationInstance.getParticipants.call();
	}).then(function(participants) {
		for (i = 0; i < participants.length; i++) {
			if (participants[i] !== '0x0000000000000000000000000000000000000000') {
				$('.panel-party').eq(i).find('button').text('Success').attr('disabled', true);
			}
		}
	}).catch(function(err) {
		console.log(err.message);
	});
  },

  handleParticipate: function(event) {
    event.preventDefault();

    var partyId = parseInt($(event.target).data('id'));

    var participationInstance;
	web3.eth.getAccounts(function(error, accounts) {
		if (error) {
			console.log(error);
	}
	var account = accounts[0];
	App.contracts.Participation.deployed().then(function(instance) {
		participationInstance = instance;
		// Execute adopt as a transaction by sending account
		return participationInstance.participate(partyId, {from: account});
	}).then(function(result) {
		return App.markParticipated();
	}).catch(function(err) {
		console.log(err.message);
	});
	}); 
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
