import web3 from "./web3";
import MainContract from "./build/MainContract.json";
const ADDRESS = "MAINCONTRACT_ADDRESS";

const instance = new web3.eth.Contract(MainContract.abi, ADDRESS);

export default instance;
