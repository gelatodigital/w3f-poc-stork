import hre from "hardhat";
import { expect } from "chai";
import { before } from "mocha";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Web3FunctionResultV2 } from "@gelatonetwork/web3-functions-sdk";
import { Web3FunctionHardhat } from "@gelatonetwork/web3-functions-sdk/hardhat-plugin";
import { Contract } from "ethers";
import { ORACLE_ABI } from "../web3-functions/stork/ocale_abi";
const { w3f } = hre;

describe("Stork Tests", function () {
  this.timeout(0);

  let owner: SignerWithAddress;
  let oracle: Contract;
  let simpleW3f: Web3FunctionHardhat;
  let userArgs: {};

  before(async function () {
    [owner] = await hre.ethers.getSigners();

    const contractAbi = ORACLE_ABI; // Path of your smart contract ABI

    const contractAddress = "0xacc0a0cf13571d30b4b8637996f5d6d774d4fd62"; //'0x6Cd59830AAD978446e6cc7f6cc173aF7656Fb917'; // Address of your smart contract

    oracle = new Contract(contractAddress, contractAbi, hre.ethers.provider);

    simpleW3f = w3f.get("stork");

    userArgs = {};
  });

  it("canExec: true - First execution", async () => {
    let { result } = await simpleW3f.run("onRun", { userArgs });
    result = result as Web3FunctionResultV2;

    console.log(result);

    expect(result.canExec).to.equal(true);
    if (!result.canExec) throw new Error("!result.canExec");

    const calldataPrice = result.callData[0];
    const tx = await owner.sendTransaction({
      to: calldataPrice.to,
      data: calldataPrice.data,
      gasPrice: 160000000,
      gasLimit: 30000000,
    });
    await tx.wait();
  });
});
