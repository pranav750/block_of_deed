const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledMainContract = require("./build/MainContract.json");

const provider = new HDWalletProvider(
  "cat lottery tunnel say tobacco marble dune uniform follow shy marriage skirt",
  "https://rinkeby.infura.io/v3/65edd92724a44af99200483e4155fe41"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from", accounts[0]);

  const result = await new web3.eth.Contract(compiledMainContract.abi)
    .deploy({
      data: compiledMainContract.evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: "10000000",
    });

  console.log("Contract deployed to", result.options.address);
};

deploy();
