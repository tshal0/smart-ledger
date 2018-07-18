import React, { Component, Children } from 'react'
import { PropTypes } from "prop-types";
import { buffers } from '../node_modules/redux-saga';

var ipfsAPI = require('ipfs-api')

// // connect to ipfs daemon API server
// var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values

// // or connect with multiaddr
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001');


// or using options
// var ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

// or specifying a specific API path
// var ipfs = ipfsAPI({host: '1.1.1.1', port: '80', 'api-path': '/ipfs/api/v0'})


// const IPFS = require('ipfs');
// const node = new IPFS();

// node.on('ready', (msg) => {
//   // Your node is now ready to use \o/
//   console.log("test");
const validCID = 'QmWRcpPHU9GLkKtGGLWfKHxNYqMtKXDbJqYtnQuodibYxF';
//   // console.log(node);
//   node.files.get(validCID, (resp) => {
//     console.log(resp);
//   })
//   // stopping a node
//   // node.stop(() => {
//   //   // node is now 'offline'
//   // })
// })

class Loading extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts

    this.state = {
      added_file_hash: null
    }
    this.ipfsApi = ipfsAPI('localhost', '5001')

    // bind methods
    this.captureFile = this.captureFile.bind(this)
    this.saveToIpfs = this.saveToIpfs.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getIPFSJSON = this.getIPFSJSON.bind(this)
  }

  captureFile (event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(file)
  }

  saveToIpfs (reader) {
    let ipfsId
    const buffer = Buffer.from(JSON.stringify({name: "New"}));
    this.ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log(ipfsId)
        this.setState({added_file_hash: ipfsId})
      }).catch((err) => {
        console.error(err)
      })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  getIPFSJSON() {
    console.log("test");
    var x = this.ipfsApi.cat(this.state.added_file_hash, (err, file) => {
      console.log(file.toString('utf8'));
    });

    console.log(x);
  }

  // handleUploadImage(ev) {
  //   ev.preventDefault();

  //   const data = new FormData();
  //   data.append('file', this.uploadInput.files[0]);
  //   data.append('filename', this.fileName.value);

  //   var upload = {
  //     "path": "company.json",
  //     "content": new buffer.Buffer
  //   }
  //   ipfs.files.add(this.uploadInput.files[0], (resp)=> {
  //     console.log(resp);
  //   });

  // }

  render() {
    if (this.props.web3.status === 'failed')
    {
      return(
        // Display a web3 warning.
        <main>
          <h1>⚠️</h1>
          <p>This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
        </main>
      )
    }

    if (this.props.drizzleStatus.initialized)
    {
      // Load the dapp.
      console.log(this.contracts);
      
      return (
         <div>
        <form id='captureMedia' onSubmit={this.handleSubmit}>
          <button onClick={this.saveToIpfs}>Save JSON</button>
        </form>
        <div>
          <br/>
          <button onClick={this.getIPFSJSON}>Get JSON</button>
        </div>
      </div>
      )
    }

    return(
      // Display a loading indicator.
      <main>
        <h1>⚙️</h1>
        <p>Loading dapp...</p>
      </main>
    )
  }
}

Loading.contextTypes = {
    drizzle: PropTypes.object
}

export default Loading