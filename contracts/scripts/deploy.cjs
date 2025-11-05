const { ethers } = require("hardhat");

async function main() {
  console.log("Desplegando contrato RPSNFT...");
  
  const RPSNFT = await ethers.getContractFactory("RPSNFT");
  const rpsNFT = await RPSNFT.deploy();
  
  await rpsNFT.waitForDeployment();
  const address = await rpsNFT.getAddress();
  
  console.log("✅ Contrato desplegado en:", address);
  console.log("🔗 Enlace BaseScan:");
  console.log(`https://sepolia.basescan.org/address/${address}`);
  console.log("📝 Para verificar manualmente después:");
  console.log(`npx hardhat verify --network baseSepolia ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});