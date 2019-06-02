 
# Document Exchange/Verification System on Ethereum Blockchain using IPFS!

### Overview
Companies, Universities, and Firms require verifiable documents and communication methods.However, the easy manipulation of digital documents and transaction data creates challenges for the advancement of digital transformation,
So I propose a document exchange and Verification system that offers new possibilities and use cases. Some benefits include cost reduction, risk mitigation, safely, securely and directly share/verify the documents without any intermediaries also it will  Improved the productivity thanks to simplified digitization of organizational processes that maintain a high level of trust between all parties and comply with security regulations.

### Certification
[2018 ConsenSys Academy Developer Program Online Bootcamp Certification - Rumeel Hussain](https://drive.google.com/file/d/1L91AjxK_xkxLSAbkU_Wl0lzjj7muNovE/view)

### Prerequisites
  - Node -v 
    - v8.11.4
  - npm --version 
    - 5.6.0
  - Truffle Versiom
    - Truffle v4.1.14 (core: 4.1.14)
    - Solidity v0.4.24 (solc-js)
  - Ganache-cli --version
    - Ganache-cli v6.1.8 (ganache-core: 2.2.1)

### Setup

```sh
  # Clone the repository
  $ https://github.com/RumeelHussain/Consensys-Academy-Dev-BootCamp-2018-Final-Project
  # change the current directory
  # install ganache and truffle
  $ npm install -g ganache-cli truffle@v4.1.14
  # open a new terminal, run below command and keep it alive
  $ ganache-cli
  # run solidity unit tests to check if environment is ready
  $ truffle test
  # install node modules
  $ npm install
  # compile smart contracts
  $ npm run recompile
  # once compile is complete run react app
  $ npm run start
```
### Available Script
```sh
  $ truffle compile
  $ truffle migrate
  $ truffle test
  $ npm run recompile
  $ npm run compile
  $ npm run migrate
  $ npm run solhint
  $ npm run start
  $ npm run build
  $ npm run test
  $ npm run dev
  $ npm run lint
  $ npm run fix
```
### Structure
```sh

├── config
├── contracts
│   ├── Accounts.sol
│   ├── Documents.sol
│   ├── EmailRegex.sol
│   ├── Migrations.sol
│   ├── SimpleStorage.sol
│   └── StringUtils.sol
├── eslintrc.json
├── migrations
│   ├── 1_initial_migration.js
│   ├── 2_deploy_simple_storage.js
│   ├── 3_deploy_accounts.js
│   └── 4_deploy_documents.js
├── package.json
├── public
├── README.md
├── scripts
├── src
│   ├── App.js
│   ├── assets
│   │   ├── abis    ## Smart Contract Application Binary Interface (ABI) Folder
│   │   ├── css
│   │   └── images
│   ├── components
│   │   ├── account
│   │   ├── common
│   │   ├── documents
│   │   ├── forms
│   │   ├── main
│   │   └── menu
│   ├── constants
│   ├── contracts
│   ├── index.js
│   ├── redux
│   │   ├── actions
│   │   ├── reducers
│   │   ├── store
│   │   └── type
│   ├── registerServiceWorker.js
│   └── utils
├── test
│   ├── accounts.test.js
│   ├── documents.test.js
│   ├── helpers
│   ├── simplestorage.test.js
│   └── TestSimpleStorage.sol
├── truffle-config.js
├── truffle.js
└── webpack.config.js
```
## How it Works

### Check List
```sh
    gananche-cli # running
    npm run recompile # complete once ganache is running
    npm run start # after recompile completes
    meta mask # chrome addon installed and connected to localhost:8545
    import 3 accounts # import accounts from localhost:8545 either by private key or json file
```

### How To
```sh
   Step:1 open browser and go to http://localhost:3000
   Step:2 select account from meta mask.
   Step:3 go to login and select account from drop down.
   Step:4 update profile with either requester or verifier from the profile screen in the drop down menu of top right.
   Step:5 requester submits documents for verification.
   Step:6 verifier verifies documents.
   Step:7 once login Documents would be visible in to menu.
   Step:8 click on the Documents and the screen of document counts would be visible.
   Step:9 Verify Document from the verifier account
   Step:10 Add documents from requester account
```
## Unit Test Coverage
```sh
TestSimpleStorage
    ✓ testItStoresAValue (66ms)

  Contract: Accounts
    ✓ ...should register a valid verifier information. (316ms)
    ✓ ...should not register with invalid email address. (64ms)
    ✓ ...should register a another valid verifier information. (254ms)
    ✓ ...should register a valid requester information. (190ms)
    ✓ ...should register another valid requester information. (236ms)

  Contract: Documents
    ✓ ...should add a document and mark as verified for requester. (439ms)
    ✓ ...should add another document and mark as rejected from verifier. (444ms)

  Contract: SimpleStorage
    ✓ ...should store the value 89. (44ms)

  9 passing (3s)
```
### Contact

For more inquiries and conversations, feel free to contact me at rumeelhussain@live.com | rumeelhussain123@gmail.com




