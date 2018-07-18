import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { drizzleConnect, DrizzleProvider } from "drizzle-react";
import { Drizzle, generateStore } from "drizzle";
import Company  from "../src/contracts/Company.json";
import CompanyComponentContainer  from "./CompanyComponent";
import LoadingContainer from "./LoadingContainer";
const options = {
  contracts: [
    Company
  ]
}

class App extends Component {

  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <DrizzleProvider options={options}>
        <LoadingContainer></LoadingContainer>
      </DrizzleProvider>
    );
    
  }
}

export default App;
