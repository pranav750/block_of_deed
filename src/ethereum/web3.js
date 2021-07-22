import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "cat lottery tunnel say tobacco marble dune uniform follow shy marriage skirt",
    "https://rinkeby.infura.io/v3/65edd92724a44af99200483e4155fe41"
  );
  web3 = new Web3(provider);
}

export default web3;
