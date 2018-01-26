/**
 * Created by mac on 18/1/26.
 */
import dva from 'dva';
import * as accountService from '../services/account'
import createAction from '../utils/createAction';
export default {
  namespace: 'AccountModel',
  state:{
    ModelName:"用户相关",
    privateKey:'afa9ceb283e0a1b6c6534cf237bf6a276889b72314c000f6abc9e997a9f09a9d',
    account:'',
    wallet:'',
  },
  reducers: {
    updateAccount(state, { payload }) {
      return { ...state, account:payload}
    },
    updateWallet(state, { payload }) {
      return { ...state, wallet:payload}
    },
  },
  effects: {
    *privateKeyToAccount({ payload }, { call, put, select }) {
      try{
        let privateKey = yield select(state=>state.AccountModel.privateKey);
        let account = yield call(accountService.privateKeyToAccount,{privateKey:privateKey});
        if(account){
          yield put(createAction('updateAccount')(account));
        }
      }catch(e) {
        console.error(e)
      }
    },
    *walletAdd({ payload }, { call, put, select }) {
      try{
        let privateKey = yield select(state=>state.AccountModel.privateKey);
        let wallet = yield call(accountService.walletAdd,{privateKey:privateKey});
        if(wallet){
          yield put(createAction('updateWallet')(wallet));
        }
      }catch(e) {
        console.error(e)
      }
    },
  },
}
