Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var fs = require('fs');
code = fs.readFileSync('Ip.sol','utf-8').toString();
solc = require('solc');
compiledCode = solc.compile(code, 1);
//console.log(compiledCode);
abiDefinition = JSON.parse(compiledCode.contracts[':Ip'].interface);

byteCode = compiledCode.contracts[':Ip'].bytecode;

//deployedContract = new web3.eth.Contract({data: byteCode, from: web3.eth.accounts[0], gas: 4700000});
//VotingContract.methods.TestLogIp().call().then(console.log());

    
    //let acct = web3.eth.getAccounts();
    
   //var VotingContract = new web3.eth.Contract(abiDefinition,"0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",{data: byteCode, from: "0x50ca855414479073093c280b4fF2DA24c8260a82", gas: 6721975});
    //contractInstance = VotingContract;
     //console.log(contractInstance.options.address);
 //VotingContract.methods.TestLogIp().call().then(console.log);




 deployedContract = new web3.eth.Contract(abiDefinition)
 listOfCandidates = ['Rama', 'Nick', 'Jose']
 deployedContract.deploy({
    data: byteCode,
    arguments: [listOfCandidates.map(name => web3.utils.asciiToHex(name))]
  }).send({
    from: '0xFBf73bD5670918a5A65e8883c8F75E9A13a12349',
    gas: 1500000,
    gasPrice: web3.utils.toWei('0.0000003', 'ether')
  }).then((newContractInstance) => {
    deployedContract.options.address = newContractInstance.options.address
    //console.log(newContractInstance.options.address)
    //newContractInstance.methods.TestLogIp().call().then(console.log);
    newContractInstance.methods.updateIpList('43',1233214).send({from: '0xFBe12ef5Cb4b53FAA7788d979D2AB3338e5c59B7',
    gas: 1500000,
    gasPrice: web3.utils.toWei('0.0000003', 'ether')}).then(() => {
    newContractInstance.methods.getListLength().call().then((count)=> {
      console.log(count);
    });
      
    })
        
    
    
  });
 
  module.exports.address = deployedContract.options.address;


//abiDefinition = JSON.parse(compiledCode.contracts[':Ip'].interface)
//VotingContract = web3.eth.contract(abiDefinition)
//byteCode = compiledCode.contracts[':Ip'].bytecode
//deployedContract = VotingContract.new({data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
//contractInstance = VotingContract.at(deployedContract.address)
