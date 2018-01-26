/**
 * Created by mac on 18/1/25.
 */
import {web3} from '../utils/web3';
// import Eth from 'web3-eth';


//根据私钥获取account
export const privateKeyToAccount = async (params) => {
  const {privateKey} = params;
  return web3.eth.accounts.privateKeyToAccount(privateKey);
}

//添加钱包帐户
export const walletAdd = async (params) => {
  const {privateKey} = params;
  return web3.eth.accounts.wallet.add(privateKey);
}

