const{ Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('2c6912417dc75e84a60decc87886752e26163d89dccdd18ddb9bc76e45c55afc');
const myWalletAddress = myKey.getPublic('hex');

let nikitaCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
nikitaCoin.addTransaction(tx1);

console.log('\nStarting the miner ...');
nikitaCoin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of Nikita is ' + nikitaCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid? ', nikitaCoin.isChainValid());

nikitaCoin.chain[1].transactions[0].amount = 20;
console.log('A transaction has been tampered.');
console.log('Is chain valid? ', nikitaCoin.isChainValid());