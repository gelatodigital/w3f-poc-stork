How to use web3 Functions to update On-Chain prices with Stork
===============

Gelato Web3 Functions together with Stork offer the ability to create fine-tuned customized oracles getting and pushing prices on-chain following predefined logic within the Web3 Function and verifying prices on-chain through the Stork network.

In this repository, you will find the following demo here:

[W3F to Stork](https://github.com/gelatodigital/w3f-poc-stork/tree/main/web3-functions/stork): this demo directly interacts with the Stork network.


> [!NOTE]
> The gelato fees are payed with [1Balance](https://docs.gelato.network/developer-services/1balance). 
> 1Balance allows to deposit USDC on polygon and run the transactions on every network.

Stork: Logic
---------------

- `PullserviceClient.ts`:
The provided code defines and utilizes the PullServiceClient class within a Web3 function to interact with an oracle service. The Web3 function requests data for specific asset price indexes from the oracle (in our example `BTCUSD`). The PullServiceClient sends a request to the oracle's rpc and retrieves the data.

Here is an example of response:

```json
{
    "data": {
        "BTCUSD": {
            "timestamp": 1725003294628238268,
            "asset_id": "BTCUSD",
            "signature_type": "evm",
            "trigger": "clock",
            "price": "59518067955999998000000",
            "stork_signed_price": {
                "public_key": "0x0a803F9b1CCe32e2773e0d2e98b37E0775cA5d44",
                "encoded_asset_id": "0x7404e3d104ea7841c3d9e6fd20adfe99b4ad586bc08d8f3bd3afef894cf184de",
                "price": "59518067955999998000000",
                "timestamped_signature": {
                    "signature": {
                        "r": "0xada5b62117378477fc177c66b271ee6223eb5c868961b017c97e5635195f04d0",
                        "s": "0x470ffea7918d2f9da46ae98165bd5a926d4ad9101172522e3d7fd8b6d060d1d0",
                        "v": "0x1c"
                    },
                    "timestamp": 1725003294635520242,
                    "msg_hash": "0xf0ca177c265464931f9cb9e7aeddfbcfc26f1409abccfb53f7b7a94a73e77565"
                },
                "publisher_merkle_root": "0x912b1298e1130ec7d05d26c71e1681bfb7a84575a7f5f6fa1a3516d365f02590",
                "calculation_alg": {
                    "type": "median",
                    "version": "v1",
                    "checksum": "9be7e9f9ed459417d96112a7467bd0b27575a2c7847195c68f805b70ce1795ba"
                }
            },
            "signed_prices": [
                {
                    "publisher_key": "0xf024a9aa110798e5cd0d698fba6523113eaa7fb2",
                    "external_asset_id": "BTCUSD",
                    "signature_type": "evm",
                    "price": "59513167739550011000000",
                    "timestamped_signature": {
                        "signature": {
                            "r": "0x556df19d1b80387a2b2c2777ffc38ba82576781db282ad789b3f7c46f67c73f0",
                            "s": "0x05afac02fdb70cefc9080425502b2fe18e8226e5ef84d7074c95a7016e011c0e",
                            "v": "0x1b"
                        },
                        "timestamp": 1725003294628238268,
                        "msg_hash": "0x8fbaccb6976de2b0e2e4e05c2c7030b209e4fa936ef887ba0860df581c6ea724"
                    }
                },
                {
                    "publisher_key": "0x51aa9e9c781f85a2c0636a835eb80114c4553098",
                    "external_asset_id": "BTCUSD",
                    "signature_type": "evm",
                    "price": "59518328169999997000000",
                    "timestamped_signature": {
                        "signature": {
                            "r": "0x1f81814281b298ba8d29223f9b92449d05e9c4cbdda7cbf0346264e2afea69f4",
                            "s": "0x67686704c8751098ba651746b9d75b131b9ff0c4be3d4779c6e8de00cf654cf6",
                            "v": "0x1b"
                        },
                        "timestamp": 1725003294266000000,
                        "msg_hash": "0x4506bc8b82546b06fa0960af1e9327e1185d803fa28f5eee077a77c06b1c6b10"
                    }
                },
                {
                    "publisher_key": "0xa3c28d4e939ce2927d3b29b7bf53d3aeaab09350",
                    "external_asset_id": "BTCUSD",
                    "signature_type": "evm",
                    "price": "59520132346000000000000",
                    "timestamped_signature": {
                        "signature": {
                            "r": "0x37d328b34f3869ae6e102203e2eb2aa8c179e02d98ff20327243036de93348fe",
                            "s": "0x5a94255ca00223d2e1b3f67b5e8b071928beab7fdfdf37b4e1bd152bed23f83f",
                            "v": "0x1c"
                        },
                        "timestamp": 1725003294266000000,
                        "msg_hash": "0x8f1cb82af52a2c92e021fb1921a090544b449e9af7f1f3ec6358d443f6a42395"
                    }
                },
                {
                    "publisher_key": "0xb91c675e0c0ecfd4c16f97b110376c3c224061d8",
                    "external_asset_id": "BTCUSD",
                    "signature_type": "evm",
                    "price": "59517807742000000000000",
                    "timestamped_signature": {
                        "signature": {
                            "r": "0x8201b99bce259723a4b0a0244cd9767bb709cbc8a76cd3a4c1855ebdd1c7d5ed",
                            "s": "0x709f7a8f4116a34d4c4989ab958ba13701764f488f425d914056d8b48b7388e7",
                            "v": "0x1c"
                        },
                        "timestamp": 1725003294399000000,
                        "msg_hash": "0xe70dbe3dc90e31d7295a5dba7a0c3e60ec52886632c2e59bde9b221d9b8345b4"
                    }
                }
            ]
        }
    }
}
```

This  data is then used to call a smart contract function `getUpdateFeeV1` from `callContract` function on the blockchain to get the fees to paid for calling then `updateTemporalNumericValuesV1`.


Oracle contract address has been hard-coded in the script as:
```ts
const contractAddress = '0xacc0a0cf13571d30b4b8637996f5d6d774d4fd62'
```

However, you can also specify the contract address in the `userArgs.json` file for flexibility.
This contract is a proxy linked directly to the oracle's contract, allowing you to call the necessary functions to verify the oracle proof data. 

```ts
const response = await client.getLatestPrice(request);
console.log("Proof received:", response);
const data = await callContract(
    response.data[request],
    provider,
    contractAddress
);
return { canExec: true, callData:[{
    to:contractAddress,
    data:data!
}] };
```

- `async function callContract(response:any, provider:any,contractAddress:string)`
The callContract function is responsible for interacting with a smart contract to update the data received from the oracle service. 
- `updateTemporalNumericValuesV1`
```ts
    function updateTemporalNumericValuesV1(
        StorkStructs.TemporalNumericValueInput[] calldata updateData
    ) public payable;
```
In the following demo, we will use the `updateTemporalNumericValuesV1` method. This method is crucial for updating the price on-chain. The arguments are extracted from the RPC call response:

```ts
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
```


Demo W3F: Stork Contract
---------------



Development
---------------

### Testing

> [!WARNING]
> Contracts are not audited by a third-party. Please use at your own discretion.

1. Install project dependencies:
```
yarn install
```

2. Create a `.env` file with your private config:
```
cp .env.example .env
```
You will need to input your `PROVIDER_URL`, your RPC.
Inside the `web3-functions/stork/.env` file, provide the following inputs:

```
AUTH_TOKEN=
URL=
```

`AUTH_TOKEN` should contain the Basic token required to access the Stork service, and `URL` should be set to the Stork service endpoint.


3. Test the  web3 function

```
npx hardhat w3f-run stork --logs
```

### Deployment

1. Deploy the web3 function on IPFS

```
npx hardhat w3f-deploy stork
```

2. Create the task following the link provided when deploying the web3 to IPFS in our case:

```
 ✓ Web3Function deployed to ipfs.
 ✓ CID: QmNquxsJCABNf1AvQSKGJLdcqis4kpfxYxVx6Bocneb2hP

To create a task that runs your Web3 Function every minute, visit:
> https://app.gelato.network/new-task?cid=QmNquxsJCABNf1AvQSKGJLdcqis4kpfxYxVx6Bocneb2hP
```


### W3F command options

- `--logs` Show internal Web3Function logs
- `--runtime=thread|docker` Use thread if you don't have dockerset up locally (default: thread)
- `--debug` Show Runtime debug messages
- `--chain-id=number` Specify the chainId (default is Sepolia: 11155111)

Example: `npx hardhat w3f-run stork --logs --debug`