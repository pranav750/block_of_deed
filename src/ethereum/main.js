import web3 from "./web3";
import MainContract from "./build/MainContract.json";

const instance = new web3.eth.Contract(
  MainContract.abi,
  "0xFd0f03a3ca083389c2B59126dAdfE4A0d64Abb3A"
);

export default instance;
