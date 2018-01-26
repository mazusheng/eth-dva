/**
 * Created by mac on 18/1/25.
 */
import {web3} from '../utils/web3';
// import Eth from 'web3-eth';


//获取最新区块number
export const getLatestBlockNumber = async () => {
    console.log(web3.eth.currentProvider)
    return web3.eth.getBlockNumber().then(data=>{
      console.log("BlockNumber====");
      console.log(data);
      return data;
    });;
}
export const getBlock = async (params) => {
    const {number} =params;
    return web3.eth.getBlock(number)
        .then(data=>{
            console.log("blockdata====");
            console.log(data);
            return data;
        });
}
export const getTransactionReceipt = async (params) => {
    const {address} =params;
    return web3.eth.getTransactionReceipt(address)
        .then(data=>{
            console.log("trashData===========");
            console.log(data);
            return data;
        });
}
export const getTransactionCount = async (params) => {
    const {address} =params;
    return web3.eth.getTransactionCount(address)
        .then(data=>{
            console.log("transactionCount===========");
            console.log(data);
            return data;
        });
}
export const getStorageAt = async (params) => {
    const {contractAddress,blockNumber} =params;
    return web3.eth.getStorageAt(contractAddress,blockNumber)
        .then(data=>{
            console.log("state==============="); // "0x03"
            console.log(data);
            return data;
        });
}
export const Contract = async (params) => {
    const {contractAddress,jsonInterface} =params;
    return new web3.eth.Contract(jsonInterface,contractAddress)
}
export const getPastEvents = async (params) => {
    const {contract,event} =params;
    return contract.getPastEvents(event,{
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
            toBlock: 'latest',
            // topics:[searchTopic]
        },
        function(error, events){
            return events;
        }
    );
}
export const AddInventorys = async (params) => {
    const {contract,accountAdress,inventoryNumber,inventoryType,} =params;
    console.log(params)
    return contract.methods.AddInventorys(inventoryNumber,inventoryType).send({from:accountAdress,gas:3000000});
}
