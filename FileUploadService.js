import axios from "axios";

const apiUrl = `http://165.22.212.30:8080`
const mApiUrl = `http://localhost:8008`

function getHeaders() {
  // const loginResponse = JSON.parse(localStorage.getItem('loginResponse'))
  const config = {
     headers: { 'Authorization': "28b5b2c6-557a-4b32-99b9-b1a88956ca10",
                   'content-type': 'multipart/form-data'
                }
    // headers: { Authorization: loginResponse.data.responseData.sessionToken }
  }

  return config;
}

let headers = {
  'Authorization': '28b5b2c6-557a-4b32-99b9-b1a88956ca10',
  'Content-Type': 'application/json',
  

}





export const createCaseByFileUpload = (data) => {
  
  const config = getHeaders();
  return axios.post(`${apiUrl}/file-upload`, data, config)
}

export const createDB = (data) => {
  
  return axios.post(`${apiUrl}/createclientdb`,data,{headers:headers})
}

export const getAllSearchLevel = (searchTerm) => {
  
  const params1 ={
    "clientId":"567",
    "search_term":searchTerm
  }
  return axios.post(`${mApiUrl}/searchall`,params1,{headers:headers})
}

export const getIndividualSearch = (searchTerm,table) => {
 
  const params2 ={
    "clientId":"567",
    "search_term":searchTerm,
    "table":table
  }  
  return axios.post(`${mApiUrl}/searchall`,params2,{headers:headers})
}

export const getUpperLowerSearchLevel = (searchId,table) =>{
  console.log("searchid and table :::--",searchId,table)
  const params3 ={
    "clientId":"567",
    "search_id": searchId,
    "table":table
  }

  return axios.post(`${mApiUrl}/searchlevel`,params3,{headers:headers})

}
