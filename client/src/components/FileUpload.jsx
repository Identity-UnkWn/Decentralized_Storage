import { useState } from "react"
import "./FileUpload.css"
import axios from "axios"


const FileUpload = ({account,contract})=>{
    const [file,setFile] = useState(null)
    const[FileName,setFileName] = useState(null)
    
    const handleSubmit = async(event)=>{
        event.preventDefault()
        if(file){
            try {
                const formData = new FormData();
                formData.append("file",file);
                const resFile = await axios({
                    method: 'post',
                    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
                    data: formData,
                    headers:{
                        pinata_api_key: 'd42fd4cb99f97a066774',
                        pinata_secret_api_key:'6fec156270d5393c658d95aca3bd76e2835f3c6529627438df53ac51783e3eaa',
                        "contentType":"multipart/form-data",
                    },
                  });
                  const imghash  = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`
                  contract.add(account,imghash)
                  alert("Successfully uploaded")
                  console.log(imghash)
                  setFileName("No image selected")
                  setFile(null)

            } catch (error) {
                console.log(error);
                
                alert("Error : ",error)

            }
        }
    }

    const retriveFile = (event)=>{
        const data = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data)
        reader.onloadend=()=>{
            setFile(event.target.files[0])
        }
        setFileName(event.target.files[0].name)
        event.preventDefault()
    }
    return(
        <div className="top">
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="file-upload" className="choose">Choose image</label>
                <input type="file" id="file-upload"
                name="data"
                onChange={retriveFile}
                />
                <span className="textArea">
                    Image: {FileName}
                </span>
                <button type="submit" className="upload" >Upload File 
                </button>
            </form>
        </div>
    )
}
export default FileUpload