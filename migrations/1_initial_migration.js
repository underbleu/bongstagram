var Migrations = artifacts.require("./Migrations.sol");
var CopyrightToken = artifacts.require("./CopyrightToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CopyrightToken);
};
