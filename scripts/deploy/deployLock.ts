import { ethers } from "hardhat";

import { setAddress } from "@/utils/address.util";

export async function deployLock() {
  const [owner] = await ethers.getSigners();

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.parseEther("1");

  const Lock = await ethers.getContractFactory("Lock", owner);
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.waitForDeployment();

  const lockAddress = await lock.getAddress();

  setAddress("lock", lockAddress);

  console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lockAddress}`);

  return lock;
}
