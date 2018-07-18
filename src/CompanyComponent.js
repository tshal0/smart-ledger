import React, { Component } from 'react';
import './App.css';
import { drizzleConnect, DrizzleProvider } from "drizzle-react";
import { Drizzle , generateStore} from "drizzle";
import  Company  from "../src/contracts/Company.json";

const options = {
  contracts: [
    Company
  ]
}
const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    Company: state.contracts.Company
  }
}

var drizzleStore = generateStore(options);
var drizzle = new Drizzle(options, drizzleStore)

class CompanyComponent extends Component {

  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
    
    var state = drizzle.store.getState();
    console.log(state);
    // console.log(state);
    // if (state.drizzleStatus.initialized) {
    //   const stackId = drizzle.contracts.SimpleStorage.methods.set(2, {from: '0x3f...'})

    // // Use the dataKey to display the transaction status.
    //   if (state.transactionStack[stackId]) {
    //     const txHash = state.transactionStack[stackId]

    //     return state.transactions[txHash].status
    //   }  
    // }
  }
  render() {
    return (
      <div>{this.state}</div>
    );
  }
}

const CompanyComponentContainer = drizzleConnect(CompanyComponent, mapStateToProps);

export default CompanyComponentContainer;
