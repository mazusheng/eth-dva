/**
 * Created by mac on 18/1/25.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import createAction from '../utils/createAction';
import { Table, Divider , Form , Icon, Input, Button , Avatar } from 'antd';

const FormItem = Form.Item;
const columns = [{
  title: '数量',
  dataIndex: 'returnValues.inventoryNumber',
  key: 'inventoryNumber',
}, {
  title: '类型',
  dataIndex: 'returnValues.inventoryType',
  render:(text, record, index)=>{
      if(text==1){
        return "出库"
      }else{
        return "入库"
      }
  },
  key: 'inventoryType',
}, {
  title: '创建时间',
  dataIndex: 'returnValues.createTime',
  render:(text, record, index)=>{
    if(text){
      try{
        let createTime=new Date(parseInt(text+"000"));
        return createTime.toDateString()
      }catch (e){
        return "时间格式不正确"
      }
    }else{
      return ""
    }
  },
  key: 'createTime',
}, {
  title: '备注',
  dataIndex: 'returnValues.remark',
  render:(text, record, index)=>{
    if(text){
      try{
        let createTime=new Date(parseInt(text+"000"));
        return createTime.toDateString()
      }catch (e){
        return "时间格式不正确"
      }
    }else{
      return ""
    }
  },
  key: 'remark',
}, {
  title: '记录区块地址',
  width:200,
  dataIndex: 'blockHash',
  key: 'blockHash',
}];
@connect(({ TestModel,AccountModel}) => ({...TestModel,...AccountModel}))
export default class TestPage extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.props.form.validateFields();
    console.log("componentDidMount============TestPage")
    this._refresh();
  }
  _refresh = () => {
     this.props.dispatch(createAction('TestModel/getLatestBlockNumber')())
     .then(()=>{
         this.props.dispatch(createAction('TestModel/getContractTransactionCount')())
           .then(()=>{
             this.props.dispatch(createAction('TestModel/Contract')())
               .then(()=>{
                this.props.dispatch(createAction('TestModel/getPastEvents')())
                  .then(()=>{
                    this.props.dispatch(createAction('TestModel/getBlock')());
                  });;
               });
           });
       });
    this.props.dispatch(createAction('AccountModel/privateKeyToAccount')());
   // this.props.dispatch(createAction('AccountModel/walletAdd')());
  };
  _AddInventorys = () =>{
    this.props.dispatch(createAction('TestModel/AddInventorys')({inventoryNumber:10,inventoryType:1}))

  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("start======")
    this._AddInventorys();
    console.log("end======")
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;

    const {account,blockNumber,block,transactionReceipt,transactionCount,contractTransactionCount,storageAt,contract,pastEvents} = this.props;
    return(
      <div className={styles.normal}>
        <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
          user
        </Avatar>
        <Button size="small" style={{ marginLeft: 16, verticalAlign: 'middle' }} >
          {account?account.address:''}
        </Button>
        <ul className={styles.list}>
          <li>当前区块长度</li>
          <li><p>{blockNumber?blockNumber:""}</p></li>

          <Divider />
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('inventoryNumber', {
                rules: [{ required: true, message: '请输入数量!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入数量" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('inventoryType', {
                rules: [{ required: true, message: '请输入类型!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入类型" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: '请输入备注!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入备注" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交
              </Button>
            </FormItem>
          </Form>
          <Divider />
          <li>历史记录</li>
          {/*{*/}
            {/*pastEvents.map((item,index)=>(*/}
                {/*<ul>*/}
                  {/*<li>{item.address}</li>*/}
                  {/*<li>{item.blockHash}</li>*/}
                  {/*<li>{item.blockNumber}</li>*/}
                  {/*<li>{item.returnValues.toString()}</li>*/}
                {/*</ul>*/}
              {/*))*/}
          {/*}*/}
        </ul>
        <div>
          <Table dataSource={pastEvents} columns={columns} />
        </div>
      </div>
    )
  }
}
TestPage = Form.create({})(TestPage);
