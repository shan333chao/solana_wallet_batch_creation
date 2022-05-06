const {
    derivePath
} = require('ed25519-hd-key')
const web3 = require("@solana/web3.js")
const bs58 = require('bs58')
const _ = require('lodash')
const dayjs = require('dayjs')
const fs = require('fs')
const {
    json
} = require('express/lib/response')
const path = require('path')


async function generateMnemonicAndSeed() {
    const bip39 = await import('bip39');
    const mnemonic = bip39.generateMnemonic(256);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return {
        mnemonic,
        seed: Buffer.from(seed).toString('hex')
    };
}

function create(mnemonic, newSeed, count) {
    let json_res = {
        "助记词": mnemonic,
        "newSeed": newSeed,
        "secret": []
    }
    for (var i = 0; i < count; i++) {
        json_res["secret"].push(gen_addr(newSeed, i))
    }
    return json_res
}



function gen_addr(seed, index) {
    let path44 = `m/44'/501'/${index}'/0'`;
    let derivedSeed = derivePath(path44, seed).key;
    let account = web3.Keypair.fromSeed(derivedSeed)
    let item = {
        "地址": account.publicKey.toBase58(),
        "私钥": bs58.encode(account.secretKey)
    }
    return item
}

async function gen_type2(count) {
    let all_mmnemonic = []
    for (let i = 0; i < count; i++) {
        const res = await generateMnemonicAndSeed()
        all_mmnemonic.push(res)
    }
    return all_mmnemonic
}






/**
 * 
 * @param {生成数量} count 
 * @param {生成模式 1：单助记词多地址 2：多助记词每个助记词一个地址} type 
 */
function gen_data_by_type(num, mode) {

    if (mode == 1) {
        generateMnemonicAndSeed().then(
            (result) => {
                let all_keys = create(result.mnemonic, result.seed, count)
                save_result(JSON.stringify(all_keys))
            }
        );
    } else if (mode == 2) {
        gen_type2(num).then(function (all_mmnemonic) {
            let all_res = []
            for (var i = 0; i < num; i++) {
                let item = all_mmnemonic[i]
                let json_res = {
                    "idx": i,
                    "助记词": item.mnemonic,
                    "seed": item.seed
                }
                all_res.push(_.merge(json_res, gen_addr(item.seed, "0")))
            }
            save_result(JSON.stringify(all_res))
        })
    } else {
        console.timeLog("error  mode")
    }
}


let args = process.argv.slice(2)
let count = Number(args[0])
let type = Number(args[1])
let mode_dic = {
    1: "单助记词",
    2: "多助记词"
}

let file_time = mode_dic[type] + "_" + dayjs(new Date()).format('YYYY-MM-DD_HH_mm_ss') + ".json"

function save_result(content) {
    let file_name = path.join(__dirname, file_time)
    fs.writeFile(file_time, content, 'utf8', err => {
        if (err) {
            console.error(err)
            return
        }
        console.log(`生成文件成功:   ${file_name}`)
    })
}

gen_data_by_type(count, type)