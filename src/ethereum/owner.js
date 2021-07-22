import web3 from "./web3";
import Owner from "./build/Owner.json";

const deployInstance = (address) => {
  const instance = new web3.eth.Contract(Owner.abi, address);
  return instance;
};

export default deployInstance;
