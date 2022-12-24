var MyContract = artifacts.require("EscrowFundManagement");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
