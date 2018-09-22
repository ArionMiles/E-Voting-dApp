# RemoteVoting

An Ethereum smart contract for E-Voting with a focus on voter identity safety. Written at the TSEC CodeStorm 2018 (22-09-2018)

# Problem Statement

Electronic voting (e-voting), which uses electronic systems to aid casting and counting votes in an election, has been a research topic of interest for the past few decades in cryptography. 
 
Remote-voting can be viewed as special case of secure multi-party computation. Develop a secure, transparent and decentralized application for  remote voting system as a medium for voting for various purposes including views on different issues or political voting.

Showcase your idea, and propose an e-voting protocol based on the blockchain technology.

# Our Approach

The voter registration/authentication layer is separate from the blockchain layer. No trace of the user's identity is present on the blockchain.

The transactions only consist of the voter's ether address, which here is not used for voter auth but instead, VoterID and Aadhar + Biometrics are used for voter authentication.

# Installation

`npm install` to install all the dependencies.

# Usage

Run `.\node_modules\.bin\ganache-cli` to start your local RPC server to test the contract with.

While the RPC server is running, follow below commands to launch your contract on it:

```
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
> web3.eth.accounts
> code = fs.readFileSync('Voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
> compiledCode.contracts[':Voting'].bytecode
> compiledCode.contracts[':Voting'].interface
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> VotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = VotingContract.new(['BJP','CONGRESS','AAP'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
> contractInstance = VotingContract.at(deployedContract.address)
```

Add default account to be able to give right to vote to other voters:
```
> web3.eth.defaultAccount = web3.eth.accounts[0]
```

## Smart Contract functions
```
//voteForCandidate()
> contractInstance.voteForCandidate('BJP')

//Give rights
contractInstance.giveRightToVote(web3.eth.accounts[1])

//voteForCandidate
contractInstance.voteForCandidate('CONGRESS', {from: web3.eth.accounts[5]})

//Tally votes
> contractInstance.totalVotesFor('AAP').toString()
```

# Future
- Better frontend
- Mock Voter & Aadhaar DB
- Use a check `vote_flag` in VoterListDB to prevent users from using different wallets and voting as one person.
- Candidate list should be dynamic, not fixed to 3

# Contributors
Frontend:

[Mihir Kulkarni (TheAntiSnipe)](https://github.com/TheAntiSnipe/)

[Pranav Gharat (00Starlord00)](https://github.com/00Starlord00)

# License
MIT License
