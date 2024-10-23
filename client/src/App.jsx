import { useEffect, useState } from 'react';
import Upload from './artifacts/contracts/Upload.sol/Upload.json'
import './App.css';
import { ethers } from 'ethers';
import FileUpload from './components/FileUpload';  
import Display from './components/Display';
import Modal from './components/Modal'
import DisAllow from './components/Disallow';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);

  useEffect(() => {
    const wallet = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          await provider.send("eth_requestAccounts", []);
          
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log("Connected address:", address);
          
          setAccount(address);
  
   
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );
          
          console.log("Contract:", contract);
 
          setContract(contract);
          setProvider(signer);
        } else {
          alert("MetaMask is not installed");
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };
  
    wallet();
    
    return () => {
    };
  
  }, []);  
  
  return (
    <>
    {!modalOpen && (
      <button className='share' onClick={()=>setModalOpen(true)}>Share</button>
    )}
    {
      modalOpen &&(
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )
    }
    {!modalOpen1 && (
      <button className='share1' onClick={()=>setModalOpen1(true)}>Disallow</button>
    )}
    {
      modalOpen1 &&(
        <DisAllow setModalOpen1={setModalOpen1} contract={contract}></DisAllow>
      )
    }
      <div className="App">
        <h1 style={{ color: "white" }}>Decentralized Storage</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account}
        </p>
        <FileUpload account={account} contract={contract}></FileUpload>
        <Display account={account} contract={contract}></Display>
    
      </div>
    </>
  );
}

export default App;
