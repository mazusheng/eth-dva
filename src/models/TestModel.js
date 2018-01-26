/**
 * Created by mac on 18/1/25.
 */
import dva from 'dva';
import * as web3 from '../services/web3'
import createAction from '../utils/createAction';
export default {
    namespace: 'TestModel',
    state:{
        ModelName:"首页",
        blockNumber:'',
        block:{},
        transactionReceipt:{},
        transactionCount:'',
        contractTransactionCount:'',
        storageAt:{},
        contractAddress:'0x60d0cce72856122074136c5b0b9739122644b25a',
        contractABI:[
          {
            "constant": false,
            "inputs": [
              {
                "name": "inventoryNumber",
                "type": "uint256"
              },
              {
                "name": "inventoryType",
                "type": "uint256"
              }
            ],
            "name": "AddInventorys",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "inventoryNumber",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "inventoryType",
                "type": "uint256"
              },
              {
                "indexed": true,
                "name": "createAddress",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "createTime",
                "type": "uint256"
              }
            ],
            "name": "InventoryUnitLog",
            "type": "event"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "index",
                "type": "uint256"
              }
            ],
            "name": "getMyInventoryUnitHistorys",
            "outputs": [
              {
                "name": "inventoryNumber",
                "type": "uint256"
              },
              {
                "name": "inventoryType",
                "type": "uint256"
              },
              {
                "name": "createAddress",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "getMyInventorys",
            "outputs": [
              {
                "name": "inputNumber",
                "type": "uint256"
              },
              {
                "name": "outputNumber",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "inventoryNumber",
                "type": "uint256"
              },
              {
                "name": "inventoryType",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          }
        ],
        contract:{},
        event:"InventoryUnitLog",
        pastEvents:[],
    },
    reducers: {
        updateBlockNumber(state, { payload }) {
            return { ...state, blockNumber:payload}
        },
        updateBlock(state, { payload }) {
            return { ...state, block:payload}
        },
        updateTransactionReceipt(state, { payload }) {
            return { ...state, transactionReceipt:payload}
        },
        updateTransactionCount(state, { payload }) {
            return { ...state, transactionCount:payload}
        },
        updateContractTransactionCount(state, { payload }) {
            return { ...state, contractTransactionCount:payload}
        },
        updateStorageAt(state, { payload }) {
            return { ...state, storageAt:payload}
        },
        updateContract(state, { payload }) {
            return { ...state, contract:payload}
        },
        updatePastEvents(state, { payload }) {
            return { ...state, pastEvents:payload}
        },
    },
    effects: {
      *getLatestBlockNumber({ payload }, { call, put, select }) {
          try{
              let blockNumber = yield call(web3.getLatestBlockNumber,{});
              if(blockNumber){
                yield put(createAction('updateBlockNumber')(blockNumber));
              }
          }catch(e) {
            console.error(e)
          }
      },
      *getBlock({ payload }, { call, put, select }) {
            try{
                let number = yield select(state=>state.TestModel.blockNumber);
                let blockData = yield call(web3.getBlock,{number:number});
                if(blockData){
                  yield put(createAction('updateBlock')(blockData));
                }
            }catch(e) {
              console.error(e)
            }
        },
      *getTransactionReceipt({ payload }, { call, put, select }) {
            try{
              const {address} = payload;
              let transactionReceiptData = yield call(web3.getTransactionReceipt,{address:address});
              if(transactionReceiptData){
                yield put(createAction('updateTransactionReceipt')(transactionReceiptData));
              }
            }catch(e) {
              console.error(e)
            }
      },
      *getTransactionCount({ payload }, { call, put, select }) {
            try{
              const {address} = payload;
              let countData = yield call(web3.getTransactionCount,{address:address});
              if(countData){
                yield put(createAction('updateTransactionCount')(countData));
              }
            }catch(e) {
              console.error(e)
            }
      },
      *getContractTransactionCount({ payload }, { call, put, select }) {
            try{
              let contractAddress = yield select(state => state.TestModel.contractAddress);
              yield console.log(contractAddress)
              let countData = yield call(web3.getTransactionCount,{address:contractAddress});
              console.log(countData)
              if(countData){
                yield put(createAction('updateContractTransactionCount')(countData));
              }
            }catch(e) {
              console.error(e)
            }
      },
      *getStorageAt({ payload }, { call, put, select }) {
            try{
              let contractAddress = yield select(state=>state.TestModel.contractAddress);
              let blockNumber = yield select(state=>state.TestModel.blockNumber);
              let storageData = yield call(web3.getStorageAt,{contractAddress:contractAddress,blockNumber:blockNumber});
              if(storageData){
                yield put(createAction('updateStorageAt')(storageData));
              }
            }catch(e) {
              console.error(e)
            }
      },
      *Contract({ payload }, { call, put, select }) {
            try{
              let contractABI = yield select(state=>state.TestModel.contractABI);
              let contractAddress = yield select(state=>state.TestModel.contractAddress);
              let contractData = yield call(web3.Contract,{contractAddress:contractAddress,jsonInterface:contractABI});
              if(contractData){
                yield put(createAction('updateContract')(contractData));
                //yield call(web3.AddInventorys,{contract:contractData,...payload,accountAdress:account.address});
              }
            }catch(e) {
              console.error(e)
            }
      },
      *getPastEvents({ payload }, { call, put, select }) {
            try{
              let contract = yield select(state=>state.TestModel.contract);
              let event = yield select(state=>state.TestModel.event);
              let events = yield call(web3.getPastEvents,{contract:contract,event:event});
              if(events){
                yield put(createAction('updatePastEvents')(events));
              }
            }catch(e) {
              console.error(e)
            }
      },
      *AddInventorys({ payload }, { call, put, select }) {
        try{
          let contract = yield select(state=>state.TestModel.contract);
          let account = yield select(state=>state.AccountModel.account);
          if(contract){
            let events = yield call(web3.AddInventorys,{contract:contract,...payload,accountAdress:account.address});
          }
        }catch(e) {
          console.error(e)
        }
      },

    },
}
