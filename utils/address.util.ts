import * as fs from "fs";
import * as path from "path";
import hre from "hardhat";

export const getAddressPath = (networkName = hre.network.name) =>
  path.join(__dirname, `../address-lists/${networkName}.json`);

export const getAddressList = (
  networkName = hre.network.name
): Record<string, string> => {
  const addressPath = getAddressPath(networkName);
  try {
    const data = fs.readFileSync(addressPath);
    return JSON.parse(data.toString());
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const getAddress = (
  key: string,
  networkName = hre.network.name
): string | undefined => {
  const addressPath = getAddressPath(networkName);
  try {
    const data = fs.readFileSync(addressPath);
    const json = JSON.parse(data.toString());
    return json[key];
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const setAddress = (
  key: string,
  value: string,
  networkName = hre.network.name
) => {
  const addressPath = getAddressPath(networkName);
  const addressList = getAddressList();

  const pathArr = addressPath.split("/");
  const dirPath = [...pathArr].slice(0, pathArr.length - 1).join("/");

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  try {
    return fs.writeFileSync(
      addressPath,
      JSON.stringify({ ...addressList, [key]: value })
    );
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const setAddresses = (
  networkName = hre.network.name,
  newAddressList: Record<string, string>
) => {
  const addressPath = getAddressPath(networkName);
  const addressList = getAddressList();

  const pathAddress = addressPath.split("/");
  const dirPath = [...pathAddress].slice(-1).join("/");

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

  try {
    return fs.writeFileSync(
      addressPath,
      JSON.stringify({ ...addressList, ...newAddressList })
    );
  } catch (e) {
    console.log(e);
    return {};
  }
};

export default {
  getAddressPath,
  getAddressList,
  getAddress,
  setAddress,
  setAddresses,
};
