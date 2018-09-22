web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"chairperson","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"voter","type":"address"}],"name":"giveRightToVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"voted","type":"bool"},{"name":"weight","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x5ab6a492aa585ec2ee787d2ea47c50bb8776af1f');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate(candidate) {
  candidateName = $("#candidate").val();
  voterToken = $("#token").val();
  try {
    contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[1]}, function() {
      let div_id = candidates[candidateName];
      $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());

    });
  } catch (err) {
    console.log(err);
  }
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  var array_of_votes = []
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
    array_of_votes.push(val)
  var data = [{
    labels: candidateNames,
    values: array_of_votes,
    type: 'pie'
  }];
  
  var layout = {
    height: 400,
    width: 500
  };

  Plotly.newPlot('votingGraph', data, layout);
  //plotVotingGraph(candidateNames, array_of_votes)
  }
});

function plotVotingGraph() {
  candidateNames = Object.keys(candidates);
  var array_of_votes = []
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
    array_of_votes.push(val)
  var data = [{
      labels: candidateNames,
      values: array_of_votes,
      type: 'pie'
  }];
  var layout = {
    height: 400,
    width: 500
  };
  Plotly.newPlot('votingGraph', data, layout);
}}

function setTokenCookie(tokenVal) {
  // Set Token Cookie
  document.cookie = `token=${tokenVal}; path=/`
  document.getElementById("index_block").hidden = false;
  document.getElementById("login").hidden = true;
}

function getTokenCookie() {
  // Extracts and returns the token cookie; Handle when cookie not present
  let tokenCookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");   
  return tokenCookieValue
}

function getTokenVal() {
  // Get Token From DOM
  return document.querySelector("#token").value
}