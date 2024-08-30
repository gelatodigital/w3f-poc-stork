// web3-functions/oraclesigned_multipleasset/index.ts
import {
  Web3Function,
  Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import { PullServiceClient } from "./PullserviceClient";
import { ORACLE_ABI } from "./ocale_abi";
import { Contract } from "ethers";

Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs, multiChainProvider, secrets } = context;

  const provider = multiChainProvider.default();
  console.log("Running with the following chain id: ", (await provider.getNetwork()).chainId);

  const address =  await secrets.get('URL'); // Set the rest server address

  const client = new PullServiceClient(address, await secrets.get('AUTH_TOKEN'));
  const contractAddress = userArgs.oracle as string ?? "0xacc0a0cf13571d30b4b8637996f5d6d774d4fd62";

  const request = userArgs.assets as string ?? "BTCUSD";
  console.log("Requesting proof for price index : ", request);
  try {
    const response = await client.getLatestPrice(request);
    console.log("Data received:", response);
    const data = await callContract(
      response.data[request],
      provider,
      contractAddress
    );
    return {
      canExec: true,
      callData: [
        {
          to: contractAddress,
          data: data!,
        },
      ],
    };
  } catch (error: any) {
    console.log(error);
    console.error("Error:", error?.response?.data);
    return { canExec: false, message: "noop" };
  }
});

async function callContract(
  response: any,
  provider: any,
  contractAddress: string
) {
  const contractAbi = ORACLE_ABI; // Path of your smart contract ABI
  const contract = new Contract(contractAddress, contractAbi, provider);

  const timestamp = response.timestamp;
  const price = response.price;
  const quantizedValue = response.stork_signed_price.encoded_asset_id;
  const publisherMerkleRoot = response.stork_signed_price.publisher_merkle_root;
  const valueComputeAlgHash = `0x${response.stork_signed_price.calculation_alg.checksum}`;
  const signature = response.stork_signed_price.timestamped_signature.signature;

  const temporalNumericValue = {
    timestampNs: timestamp.toString(), // uint64
    quantizedValue: price.toString(), // int192
  };

  const tuple = {
    temporalNumericValue: temporalNumericValue,
    id: quantizedValue, // bytes32
    publisherMerkleRoot: publisherMerkleRoot, // bytes32
    valueComputeAlgHash: valueComputeAlgHash, // bytes32
    r: signature.r, // bytes32
    s: signature.s, // bytes32
    v: signature.v, // uint8
  };

  const fees = await contract.getUpdateFeeV1([tuple]);
  console.log("Update Fee: ", fees);

  const { data } =
    await contract.populateTransaction.updateTemporalNumericValuesV1([tuple], {
      value: 1,
    }); // function from you contract eg:GetPairPrice from example-contract.sol

  return data;
}
