const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const Upload = await hre.ethers.getContractFactory("Upload");

  // Deploy the contract
  const upload = await Upload.deploy();

  // At this point, the contract is already deployed, so no need for .deployed()

  // Log the contract instance to check if it's properly deployed
  console.log("Upload contract deployed to:", upload.target); // Log the address directly from the contract instance
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
