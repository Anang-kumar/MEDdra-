import React from 'react';
import Stepper from 'react-stepper-horizontal';
import axios from 'axios';
 import './Medra.css';
import { useState } from 'react';
import { useToasts } from "react-toast-notifications";
import { createCaseByFileUpload,createDB } from './FileUploadService';


const initialState = {
       clientId:" ",
       expDate:" ",
       path:" ",
}

function MedraFileUpload (){

    const [selectedFile,setSelectedFile]=useState([]);
    const [dataObj,setDataObj]=useState(initialState)
    const [activeStep,setActiveStep]=useState(0);
    const [currentState, setCurrentState] = useState(0);
    const { addToast } = useToasts();

    

    const handleChange = (e,value,clientId) => {
    
      setDataObj({
       ...dataObj,
        [e.target.name]: e.target.value,
        clientId:clientId
      });
      
    }

  

  const onChangeHandler = (e) => {
    setSelectedFile([...selectedFile, e.target.files]);
  };
      

    //   const onClickHandler = () =>{
    //     let formData= new FormData();
    //     let fileItem = document.getElementById('file-uploader');
    //     console.log(fileItem.files[0]);
    //     formData.append('file', fileItem.files[0]);
    //     for(let x of formData.entries()){
    //       console.log("rrrrr",x[0]);
    //       console.log("pppppp",x[1]);
    //     }

    //     createCaseByFileUpload(formData)

    //     .then(res=>{
    //       console.log("success",res)
    //     })
    //     .catch(err=>{
    //       console.log("error",err)
    //     })
 
    //  }


    const onClickHandler = () => {
      // debugger;
      let formdata = new FormData();

      for(var i = 0; i<selectedFile.length; i++) {
      for (let file of selectedFile[i]) {
        formdata.append("file", file, file["name"]);
      }
    }

      formdata.append("input", JSON.stringify({}));

      createCaseByFileUpload(formdata)
        .then((resp) => {
          console.log("Success:-", resp);
          toast('File Uploaded Successfully')
        })
        .catch((err) => {
          console.log("Error:-", err);
        });
    };

   

    const onSubmit=(data)=>{
      createDB(data)
      .then((createdData) => {
        if (createdData.data.statusCode == "200") {

          console.log("data....",createdData)
          toast("Create Successfully");
        }
      })
      .catch((err) => {
        console.log("error",err)
      });
    }


    const toast = (toastName) => {
      addToast(`${toastName}`, {
        appearance: "success",
        autoDismiss: true,
        pauseonhover: true,
      });
    };



    return(
        <div>

             
            <div style={{ marginLeft:'32rem',marginTop:'2rem'}}>  
            <label for="exDate">License Expiry Date :- </label>
            <input type="date" name="expDate" style={{ border:"1px solid red"}} onChange={handleChange}></input><br/>
            </div>

              <div className="medcard">
                 
                  <div style={{ marginLeft:'1.5rem'}}>
                <label >Upload File :- </label>
                <input type="file" id="file-uploader" name="file" onChange={onChangeHandler} multiple></input>
                </div>
                <br/>
                
                <button type="button" style={{ marginLeft:"9rem"}} onClick={onClickHandler} className="button3">Upload</button><br/><br/>
              <div  style={{ marginLeft:'1rem'}}>   <Stepper
                        steps={[
                          {
                            title: 'SOC',
                            href: 'http://example1.com',
                            onClick: e => {
                              e.preventDefault();
                              console.log('onClick', 1);
                              //  toast('File Upload Successfully');
                              // nextStep();
                              
                            },
                          },
                          {
                            title: 'HLGT',
                            href: 'http://example2.com',
                            onClick: e => {
                              e.preventDefault();
                              console.log('onClick', 2);
                              // toast('File Upload Successfully');
                              // nextStep();
                            },
                          },
                          {
                            title: 'HLT',
                            href: 'http://example3.com',
                            onClick: e => {
                              e.preventDefault();
                              console.log('onClick', 3);
                              // nextStep();
                            },
                          },
                          {
                            title: 'PT',
                            href: 'http://example3.com',
                            onClick: e => {
                              e.preventDefault();
                              console.log('onClick', 3);
                              // nextStep();
                            },
                          },

                          {
                            title: 'LLT',
                            href: 'http://example3.com',
                            onClick: e => {
                              e.preventDefault();
                              console.log('onClick', 3);
                              // nextStep();
                            },
                          },

                          {
                            title: 'Synonyms',
                            href: 'http://example3.com',
                            onClick: e => {
                              e.preventDefault();
                              console.log('onClick', 3);
                              // nextStep();
                            },
                          },
                        ]}
                        activeStep={1}
                      /></div>
                </div>
               
                <button type="submit" className="button3" style={{ marginLeft:"38rem"}} onSubmit={onSubmit}>Create DB</button>
              
        </div>
    )
}
export default MedraFileUpload;