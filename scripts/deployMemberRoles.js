const hre = require('hardhat');

async function main() {
  const MemberRole = await hre.ethers.getContractFactory('MemberRole');
  const memberRole = await MemberRole.deploy();

  await memberRole.deployed();

  console.log('MemberRole deployed successfully to:', memberRole.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
