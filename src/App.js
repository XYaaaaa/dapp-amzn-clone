import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'

function App() {

  const [provider,setProvider] = useState(null)
  const [account, setAccount] = useState(null) //set account state

  const loadBlockchainData = async() => {
    //connect blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    //connect to smart contracts
    const network = await provider.getNetwork()
    console.log(network)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])


  return (
    <div>
      <Navigation account={account}/>
      
      <h2>Dappazon best sellers</h2>
      
    </div>
  );
}

export default App;
