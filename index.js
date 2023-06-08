
const axios = require('axios');
const ethers = require('ethers');
const fs = require('fs');
const decoder = require('abi-decoder');
const util = require('./utils');

const address = '0xc2d031299faf2f50b5df34e674d8f68c5ebe1a1c3dcc380ba86cc3ddb3d98dff'
const abi = fs.readFileSync('uniswapabi.json', 'utf8');
decoder.addABI(JSON.parse(abi));

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/9110a9490de6477184406113ce4854a4");
const transaction = provider.getTransaction('0xc2d031299faf2f50b5df34e674d8f68c5ebe1a1c3dcc380ba86cc3ddb3d98dff')
    .then((transaction) => {
        console.log(`decoding transaction ${transaction.hash}`);
        //decode the data according to function abi
        decodedData = decoder.decodeMethod(transaction.data);

        //get the command count
        const commandCount = parseInt(transaction.data.slice(138, 202), 16);
        var commands = [];

        //get the command
        for (let index = 0; index < commandCount; index++) {
            commands.push(decodedData.params[0].value.slice(2 + index * 2, 4 + index * 2));
        }

        for (let index = 0; index < commands.length; index++) {
            // const element = array[index];
                console.log(util.decodeCommandParam(commands[index], decodedData.params[1].value[index]));
   
        }

        
        // console.log(decodedData.params[1].value[1]);
        // console.log(util.decodeCommandParam("08", decodedData.params[1].value[1]));
        
        


        // commands.forEach(com => {

        // });
        // console.log(transaction.data.slice(330, 394));
        // console.log(transaction.data.slice(202, 266));
        // console.log(transaction.data.slice(266, 330));
        // console.log(transaction.data.slice(330, 394));
        // console.log(transaction.data.slice(394, 458));
    });


// const getAbi = async () => {
//     const res = await axios.get('https://api.etherscan.io/api?module=contract&action=getabi&address=0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B&apikey=35248DCBB9EQA84WG1FSSC3376X2DMX2NZ')
//     const abi = JSON.parse(res.data.result)
//     fs.writeFile("uniswapabi.json", JSON.stringify(abi), 'utf8', function (err) {
//         if (err) {
//             console.log("An error occured while writing JSON Object to File.");
//             return console.log(err);
//         }
     
//         console.log("JSON file has been saved.");
//     });
// }
// getAbi()

