import Loading from './Loading.js'
import { drizzleConnect } from 'drizzle-react'
import  Company  from "../src/contracts/Company.json";
// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    state: state,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    Company: state.contracts.Company
  }
}

const LoadingContainer = drizzleConnect(Loading, mapStateToProps);

export default LoadingContainer