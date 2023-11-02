import { ethers } from "hardhat";

import { setAddress } from "../../utils/address.util";

export async function deployLogger() {
  const [owner] = await ethers.getSigners();

  const Logger = await ethers.getContractFactory("Logger", owner);
  const logger = await Logger.deploy();


  await logger.waitForDeployment();

  const loggerAddress = await logger.getAddress();

  setAddress("logger", loggerAddress);

  console.log(`Deployed to ${loggerAddress}`);

  return logger;
}

deployLogger().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});