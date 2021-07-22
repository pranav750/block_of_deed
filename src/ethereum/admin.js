import web3 from "./web3";
import Admin from "./build/Admin.json";

const deployInstance = (address) => {
  const instance = new web3.eth.Contract(Admin.abi, address);
  return instance;
};

export default deployInstance;
