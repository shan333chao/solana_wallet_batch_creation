# 批量生成sol 助记词和地址
# generation of sol  mnemonic and wallet addresses

功能：

    1、生成一组单助记词多个钱包地址
    2、生成多组助记词和第一个钱包地址


运行时依赖 

        node >= 14.0
        npm list->
            ├── @solana/web3.js@1.41.3
            ├── bip32@3.0.1
            ├── dayjs@1.11.1
            ├── ed25519-hd-key@1.2.0
            ├── lodash@4.17.21
            └── tiny-secp256k1@2.2.1

安装依赖

           npm install

使用方法
    
        node solana3.js [数量] [模式 1:一组助记词 2:多组助记词]

        模式一： 生成一组助记词和 【数量】个钱包地址

        模式二： 生成【数量】组助记词 和 每组助记词的第一个地址


示例模式一、生成一组助记词 和 2个钱包地址

        node solana3.js 2 1
        
        生成文件成功:   /Users/xxx/xxx/solo_wallet/单助记词_2022-05-06_时_分_秒.json
        文件内容
        {
            "助记词": "xxxx,xxxx,xxx,xxx,xxx,xxx,xxx,xxx,xxx,xxx",
            "seed": "seedseedseedseedseedseedseedseedseedseedseed",
            "secret": [{
                "地址": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
                "私钥": "aaaaaaaaaaaaaaaaaaa"
            }, {
                "地址": "xxxxxxxxxxxxxxx",
                "私钥": "aaaaaaaaaaaaaa"
            }]
        }


示例模式二、生成一组助记词 和 2个钱包地址


        node solana3.js 2 2
        生成文件成功:   /Users/xxx/xxx/solo_wallet/多助记词__2022-05-06_时_分_秒.json

        [{
            "idx": 0,
            "助记词": "friend broken giant tourist circle electric lend moment shiver motor pipe skirt cigar shallow program",
            "seed": "seed1seed1seed1seed1seed1seed1seed1seed1",
            "地址": "xxxxxxxxxxxx",
            "私钥": "xxxxxxxxxxx"
        }, {
            "idx": 1,
            "助记词": "trophy tired increase foam protect police earn short obey wing pigeon attack remember identify joy cruise",
            "seed": "seed2seed2seed2seed2seed2seed2seed2",
            "地址": "xxxxxxxxxxxxxxxx",
            "私钥": "xxxxxxxxxxxxxxxx"
        }]






