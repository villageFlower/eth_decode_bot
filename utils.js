// Masks to extract certain bits of commands
// bytes1 internal constant FLAG_ALLOW_REVERT = 0x80;
// bytes1 internal constant COMMAND_TYPE_MASK = 0x1f;
// bytes1 internal constant NFT_TYPE_MASK = 0x10;
// bytes1 internal constant SUB_IF_BRANCH_MASK = 0x08;

// Command Types. Maximum supported command at this moment is 0x1F.

// Command Types where value<0x08, executed in the first nested-if block
const V3_SWAP_EXACT_IN = '0x00';
const V3_SWAP_EXACT_OUT = '0x01';
const PERMIT2_TRANSFER_FROM = '0x02';
const PERMIT2_PERMIT_BATCH = '0x03';
const SWEEP = '0x04';
const TRANSFER = '0x05';
const PAY_PORTION = '0x06';
const COMMAND_PLACEHOLDER_0x07 = '0x07';

// Command Types where 0x08<=value<=0x0f, executed in the second nested-if block
const V2_SWAP_EXACT_IN = '0x08';
const V2_SWAP_EXACT_OUT = '0x09';
const PERMIT2_PERMIT = '0x0a';
const UNWRAP_WETH = '0x0c';
const PERMIT2_TRANSFER_FROM_BATCH = '0x0d';
const COMMAND_PLACEHOLDER_0x0e = '0x0e';
const COMMAND_PLACEHOLDER_0x0f = '0x0f';

// Command Types where 0x10<=value<0x18, executed in the third nested-if block
const SEAPORT = '0x10';
const LOOKS_RARE_721 = '0x11';
const NFTX = '0x12';
const CRYPTOPUNKS = '0x13';
const LOOKS_RARE_1155 = '0x14';
const OWNER_CHECK_721 = '0x15';
const OWNER_CHECK_1155 = '0x16';
const SWEEP_ERC721 = '0x17';

// Command Types where 0x18<=value<=0x1f, executed in the final nested-if block
const X2Y2_721 = '0x18';
const SUDOSWAP = '0x19';
const NFT20 = '0x1a';
const X2Y2_1155 = '0x1b';
const FOUNDATION = '0x1c';
const SWEEP_ERC1155 = '0x1d';
const COMMAND_PLACEHOLDER_0x1e = '0x1e';
const COMMAND_PLACEHOLDER_0x1f = '0x1f';


decode = function (length, data, isNumber) {
    for (let index = 0; index < length; index++) {
        const element = array[index];

    }

}



const COMMANDS = {
    "0b": {
        name: "WRAP_ETH",
        params: [{
            name: "recipient",
            type: "address",
            length: 20,
            value: function (data) {
                return '0x' + data.slice(46, 66);
            }
        },
        {
            name: "amountMin",
            type: "uint256",
            length: 32,
            value: function (data) {
                return parseInt(data.slice(66, 130), 16);
            }
        }],
        decode: function (data) {
            return {
                name: this.name,
                params: this.params.map((param) => {
                    return {
                        name: param.name,
                        type: param.type,
                        value: param.value(data)
                    }
                })
            }
        }
    },

    "08": {
        name: "V2_SWAP_EXACT_IN",
        params: [{
            name: "recipient",
            type: "address",
            length: 20,
            value: function (data) {
                return '0x' + data.slice(46, 66);
            }
        },
        {
            name: "amountIn",
            type: "uint256",
            length: 32,

            value: function (data) {
                return parseInt(data.slice(66, 130), 16);
            }
        },
        {
            name: "amountOutMin",
            type: "uint256",
            length: 32,
            value: function (data) {
                return parseInt(data.slice(130, 194), 16);
            }
        },
        {
            name: "path",
            type: "address[]",
            length: 64,
            value: function (data) {
                return '0x' + data.slice(194, 258);
            }
        },
        {
            name: "payerIsUser",
            type: "bool",
            length: 1,
            value: function (data) {
                return parseInt(data.slice(258, 322), 16) == 1;
            }
        },
        ],
        decode: function (data) {
            return {
                name: this.name,
                params: this.params.map((param) => {
                    return {
                        name: param.name,
                        type: param.type,
                        value: param.value(data)
                    }
                }
                )
            }
        }
    }
};

// make this js file a module and can be imported by other js files use require()
module.exports = {



    decodeCommandParam: function (command, data) {
        return COMMANDS[command].decode(data);
    }


}




