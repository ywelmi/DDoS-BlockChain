const { Console } = require('console');
var fs = require('fs');
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"num","type":"uint256"}],"name":"getIpList","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ipAddress","type":"string"},{"name":"currenttime","type":"uint256"}],"name":"updateIpList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"ipArray","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ipList","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getListLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
code = fs.readFileSync('Ip.sol','utf-8').toString();
solc = require('solc');
compiledCode = solc.compile(code, 1);

abiDefinition = JSON.parse(compiledCode.contracts[':Ip'].interface);
byteCode = compiledCode.contracts[':Ip'].bytecode;


var attackers = require('./logs.json')

var attackers_list = []
var len = attackers.length 
attackers_list = attackers.ipAddress;

deployedContract = new web3.eth.Contract(abiDefinition)
 deployedContract.deploy({
    data: byteCode,
    arguments: {}
  }).send({
    from: '0x96B30184D9Dd2ae732ED2E5C02FeD2c3b8096Db6',
    gas: 1500000,
    gasPrice: web3.utils.toWei('0.0000003', 'ether')
  }).then((newContractInstance) => {
    deployedContract.options.address = newContractInstance.options.address
    console.log("Deploy SmartContract Success !!");
    var contractInstance = newContractInstance;
    
    var ip1 = Date.now()
    console.log("Timestamp Now:"+ ip1);
    console.log("Reading Blacklisted Ip .....");
    fs.closeSync(fs.openSync('block.txt', 'w'));
    for(let i = 0;i<attackers_list.length;i++)
    {
    console.log("Adding BlackListed Ip to blockchain :")
    console.log(attackers_list[i])
    
    contractInstance.methods.updateIpList(attackers_list[i],ip1).send({from: '0x96B30184D9Dd2ae732ED2E5C02FeD2c3b8096Db6',
    gas: 1500000,
    gasPrice: web3.utils.toWei('0.0000003', 'ether')}).then(
        console.log("Add BlackIp Success !")
    );
    //let val = contractInstance.getIpList(attackers_list[i]).toString();
    //console.log(val);
    console.log('\n')
    }
    console.log("Update SmartContract done !");
    




    console.log("Extract SmartContract .....");
    contractInstance.methods.getListLength().call().then((count) => { 
        var val = count;
        console.log(count);
        console.log("GetListIpLength done !");
        var data = {}
        data.table = []
        console.log("List IP:")
        for(let i=0;i<val;i++)
        {
         contractInstance.methods.getIpList(i).call().then((val) => {
            
            console.log(val[0]);
            var str = (val[0]).toString();
           console.log('Ip address:'+str)
           var time = Date.now();
           console.log('Timestamp Now:'+time);
           var ip_time = val[1];
           console.log('Ip Timestamp:'+ip_time)
           if(((time-ip_time)/(1000*60))<30)
              {
                console.log("IP:"+str+  " need to be blocked\n")
                console.log("Writing to file\n")
                fs.appendFileSync('block.txt',str+'\n',function(err){
                    console.log(err);
                 })
                    var obj = {
                        ipAddress: str,
                        Timestamp: ip_time
                    }
                    data.table.push(obj)
                    fs.writeFile ("BlackListIP.json", JSON.stringify(data), function(err) {
                      if (err) throw err;
                      console.log('Write to file success !');
                      }
                  );
                
              }
            })
            
        }
        
});
});




//console.log(contractInstance.ipList(0));
//console.log("output:")
//console.log(val)
