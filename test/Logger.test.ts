import { expect } from "chai";
import { ethers } from "hardhat";

describe("Logger Contract", () => {
  const deployLogger = async () => {
    const [owner] = await ethers.getSigners();

    const Logger = await ethers.deployContract("Logger");

    return { Logger, owner };
  };
  it("Should deploy the Logger contract", async () => {
    const { Logger } = await deployLogger();

    // expect(await logger).to.not.equal(0);
    console.log("Logger deployed to:", await Logger.getAddress());
  });

  it("Should log a message", async () => {
    const { Logger } = await deployLogger();

    await Logger.log("Hello World");

    expect(await Logger.message()).to.equal("Hello World");
  });
});
