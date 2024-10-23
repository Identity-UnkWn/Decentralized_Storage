import { useEffect, useState } from "react";
import "./Disallow.css"


const Modal = ({setModalOpen1,contract})=>{
    const [addressList,setAddressList] = useState([]);
    const dissharing = async()=>{
        const address = document.querySelector(".address").value;
        await contract.disallow(address);
        setAddressList((prev)=>prev.filter((addr) => addr!==address))
        alert("Disallowed successfully")
        setModalOpen1(false);
    }
    useEffect(()=>{
        const accessList = async()=>{
            const addresses = await contract.shareAccess();
            setAddressList(addresses)
        }
        contract && accessList()
    },[contract])
    
    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <div className="body">
                        <input type="text" className="address"
                        placeholder="Enter Address" />
                    </div>
                    {/* <form id="myform">
                        <select id="selectNumber">
                            <option className="address">People with access</option>
                        </select>
                    </form> */}
                    <div className="footer">
                        <button id="cancelBtn" onClick={()=>setModalOpen1(false)}>Cancel</button>
                        <button onClick={()=>dissharing()}>DisAllow</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal