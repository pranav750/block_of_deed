const solc = require("solc");
const fs = require("fs-extra");
const path = require("path");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const mainContractPath = path.resolve(
  __dirname,
  "contract",
  "MainContract.sol"
);
const source = fs.readFileSync(mainContractPath, "utf8");

let input = {
  language: "Solidity",
  sources: {
    "MainContract.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
if (output.errors) {
  console.log(output.errors);
} else {
  const contracts = output.contracts["MainContract.sol"];
  fs.ensureDirSync(buildPath);
  for (let contractName in contracts) {
    const contract = contracts[contractName];
    fs.writeFileSync(
      path.resolve(buildPath, `${contractName}.json`),
      JSON.stringify(contract, null, 2),
      "utf8"
    );
  }
}
