var log4js = require('./node_modules/log4js')
var Web3 = require('./node_modules/web3')
var fs = require("fs")

var logger = log4js.getLogger();
logger.level = 'info';

if (typeof web3 != 'undefined') {
  web3 = new Web3.currentProvider();
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:11111'))
}

var base = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1";

web3.eth.personal.getAccounts().then(function (c) {
  console.log(c);
});


var code = fs.readFileSync("./bin/SimpleStorage.bin");
var abi = JSON.parse(fs.readFileSync("./bin/SimpleStorage.abi"));
var sol_testcontract = new web3.eth.Contract(abi);
var send_opt = {from:base, gas : 4000000}


function test1(c) {
  var input = 123456789;
  c.methods.set(input).send(send_opt).then(() => c.methods.get().call().then(res => logger.info(res)));
}

function test(con, test_con) {
  test_con.deploy({data:code, arguments:[base, 987654321]}).send(send_opt).then(
    contract => {
      logger.info('test contract mined.');
      con(contract)
      logger.info("test contract finished.")
    }
  )
}

test(test1, sol_testcontract);
