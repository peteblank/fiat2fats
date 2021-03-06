var express = require('express');
var app = express();
//var bodyParser = require('body-parser');
//var urlencodedParser = bodyParser.urlencoded({ extended: false});
var cors=require('cors');
const {
        EnigmaUtils, Secp256k1Pen, SigningCosmWasmClient, pubkeyToAddress, encodeSecp256k1Pubkey, unmarshalTx
      } = require("secretjs");
require('dotenv').config()
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


app.post('/',cors(), function(req, res){
    var wallet2=req.body.wallet;
    var amount2=req.body.amount;
    console.log(wallet2);
    console.log(amount2);
    res.send("<h1>Please wait a few minutes</h1>");
    
    var balance=0;
var response="";
  // Load environment variables

  const customFees = {
    upload: {
        amount: [{ amount: "2000000", denom: "uscrt" }],
        gas: "2000000",
    },
    init: {
        amount: [{ amount: "500000", denom: "uscrt" }],
        gas: "500000",
    },
    exec: {
        amount: [{ amount: "500000", denom: "uscrt" }],
        gas: "500000",
    },
  }

  const main = async () => {
   

    const httpUrl = process.env.SECRET_REST_URL;

    // Use key created in tutorial #2
    const mnemonic = process.env.MNEMONIC;
    
      // A pen is the most basic tool you can think of for signing.
      // This wraps a single keypair and allows for signing.
      const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
    
      // Get the public key
      const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    
      // get the wallet address
      const accAddress = pubkeyToAddress(pubkey, 'secret');
    
      const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
      
      const client = new SigningCosmWasmClient(
          httpUrl,
          accAddress,
          (signBytes) => signingPen.sign(signBytes),
          txEncryptionSeed, customFees
      );
      console.log(`Wallet address=${accAddress}`)
      
      // Upload the wasm of a simple contract
    
      // Get the code ID from the receipt
  
  
    
      // Create an instance of the token contract, minting some tokens to our wallet
      // Entropy: Secure implementation is left to the client, but it is recommended to use base-64 encoded random bytes and not predictable inputs.
  
      var contractAddress='secret1e2s03nd3r7avepdl22ddsz6l550jrwveplu2qq';
      const secretkey="bananapapaya";
  
      // Convert the UTF8 bytes to String, before parsing the JSON for the api key.
     
  
      // Query balance with the api key
      const balanceQuery = { 
          balance: {
              key: secretkey, 
              address: accAddress
          }
      };
 
     // Transfer some tokens
     const handleMsg = {
      transfer: 
      {
          owner: accAddress, amount: amount2, recipient: wallet2 //the amount and wallet values will be passed down to here
      }
  };
  console.log(handleMsg);
  console.log('Transferring tokens');
  response = await client.execute(contractAddress, handleMsg);
  console.log('Transfer response: ', response)
  
  balance = await client.queryContractSmart(contractAddress, balanceQuery);
  console.log('New token balance', balance)
  };
  response = main();
})

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});