import { useEffect } from "react";
import "./Modal.css"

const Modal = ({setModalOpen,contract})=>{
    const sharing = async()=>{
        const address = document.querySelector(".address").value;
        await contract.allow(address);
        setModalOpen(false);
    }
    useEffect(()=>{
        const accessList = async()=>{
            const addressList = await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const options = addressList;

            for(let i=0;i<options.length;i++){
                let opt = options[i];
                let el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
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
                    <form id="myform">
                        <select id="selectNumber">
                            <option className="address">People with access</option>
                        </select>
                    </form>
                    <div className="footer">
                        <button id="cancelBtn" onClick={()=>setModalOpen(false)}>Cancel</button>
                        <button onClick={()=>sharing()}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal