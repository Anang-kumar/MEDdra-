import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Row, Col, Container } from 'react-grid-system';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./Medra.css"
import { getAllSearchLevel, getIndividualSearch, getUpperLowerSearchLevel } from './FileUploadService';


function MedDRA() {


  const [searchTerm, setSearchTerm] = useState("");
  const [searchAllResults, setSearchAllResults] = useState([]);
  const [searchPtResults, setSearchPtResults] = useState([]);
  const [searchHlgtResults, setSearchHlgtResults] = useState([]);
  const [searchHltResults, setSearchHltResults] = useState([]);
  const [searchSocResults, setSearchSocResults] = useState([]);
  const [table, setTable] = useState([]);
  const [searchIndTerm, setSearchIndTerm] = useState("");
  const [searchId, setSearchId] = useState("");
  const [code,setCode] = useState([]);
  const [searchLevelResults, setSearchLevelResults] = useState([]);
  const [upperTable, setUpperTable] = useState([]);
  const [lowerTable, setLowerTable] = useState([]);

  // const [filteredData,setFilterData]=useState([]);
  // const focusSearch = useRef(null);


  // useEffect(() => {focusSearch.current.focus()}, [])


  const onChangeAllSearch = (event) => {

    setSearchTerm(event.target.value);

    // setLoading(true)
    // searchAll();
  }

  const onChangeIndSearch = (event, table) => {

    setTable(table);
    setSearchIndTerm(event.target.value)
    console.log("invalue", event.target.value)
    console.log("indddtable:-", table)
  }

  // useEffect(() => {
  //   const results = people.filter(person =>
  //     person.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);


  const searchAll = () => {

    getAllSearchLevel(searchTerm)

      .then(res => {
       
        if (searchTerm) {
          setSearchAllResults(res.data.pt)
          console.log("getAlll....", res.data)
          console.log("getAlll", res.data.pt)
          //       const abc = res.data.pt
          //    abc.map((val, index)=>
          //  console.log("name....",val.pt_name)
          //  )
        }
      })

      .catch(err => {
        setSearchAllResults([]);
        console.log("error:-", err)
      });


    // const results = searchAllResults.filter(t =>
    //   t.toLowerCase().includes(searchTerm)
    // );
    console.log("eeeeeee", searchAllResults)
    // setSearchAllResults(results);


  }



  const individualSearchAll = () => {

    getIndividualSearch(searchIndTerm, table)
      // .then(res=> res.json())

      .then(res => {
        
        if (table === "hlgt") {
          
          setSearchHlgtResults(res.data.hlgt)
         
        }

        if (table === "pt") {
          setSearchPtResults(res.data.pt)
        }

        if (table === "hlt") {
          setSearchHltResults(res.data.hlt)
        }

        if (table === "soc") {
          setSearchSocResults(res.data.soc)
        }

        console.log("getInd", res.data)
      })

      .catch(err => {
        // setSearchIndResults([]);
        console.log("error:-", err)
      });


    // const results = searchResults.filter(pt =>
    //   pt.toLowerCase().includes(searchTerm)
    // );

    // setSearchResults(results);
  }


  const searchLevel = () => {
        console.log("llllllllllllll")
    getUpperLowerSearchLevel(searchId, table)
    
      // .then(res=> res.json())

      .then(res => {

             console.log("table",table)
        if (table === "soc") {
        
          setLowerTable(res.data.hlgt)

        }

        if (table === "hlgt") {
      
          setUpperTable(res.data.soc)
          setLowerTable(res.data.hlt)

        }

        if (table === "hlt") {
         
          setUpperTable(res.data.hlgt)
          setLowerTable(res.data.pt)
          
        }

        if (table === "pt") {
      
          setUpperTable(res.data.hlt)
        
        }
           
        // setSearchLevelResults(res.data)
        console.log("getlevel..", res.data)
        
      })

      .catch(err => {
        // setSearchLevelResults([]);
        console.log("error:-", err)
      });


     // const results = searchResults.filter(pt =>
    //   pt.toLowerCase().includes(searchTerm)
    // );
    // console.log("eeeeeeell", searchLevelResults)
    // setSearchResults(results);

  }



  const onContentClick = (searchId) => {
     
      setSearchId(searchId)
     console.log("searchidddtabletable",searchId, table)
   
      //  searchLevel();
  }


  useEffect(() => {
    searchAll();
  }, [searchTerm])


  useEffect(() => {
    individualSearchAll();
  }, [searchIndTerm, table])


  useEffect(() => {
console.log("smhgjgfuyuyg")
 if(searchId && table){
    searchLevel();
 }
  
  }, [searchId,table])


  const medraSmq =[
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    }
  ]


  return (

    <div >

      <Container>
        <div className="contentLabel" style={{ width: "72rem", color: 'white', backgroundColor: '#707fcf', textAlign: "center" }}>MedDRA Browser</div><br />
        <Row>
          <Col sm={3}>

               <Autocomplete
                size="small"
                options={medraSmq}
              getOptionLabel={(option) => option.value}
              style={{ width:"20rem",marginLeft:"1rem" }}
              renderInput={(params) => (
                <TextField {...params} label="Terminology" variant="outlined"  />
                )}
              />

          </Col>

          <Col sm={6}>
            
                <Autocomplete
                size="small"
                options={medraSmq}
                getOptionLabel={(option) => option.label}
                style={{ width:"20rem",marginLeft:"8rem" }}
                renderInput={(params) => (
                  <TextField {...params} label="MedDRA SMQ" variant="outlined"  />
                )}
                />
               <br />

              <TextField type="text" variant="outlined"  id="outlined-basic" label="Search All Level" style={{ width:"20rem",marginLeft:"8rem" }} size="small" name="search" onChange={onChangeAllSearch} value={searchTerm} ></TextField>

          </Col>

          <Col sm={3} >
            <input type="checkbox" name="fullSearch" ></input> <label >Full Search</label> <button type="button" style={{ marginLeft:"3.5rem"}} className="btn btn-primary btn-sm">Clear</button><br />
            <input type="checkbox" name="nonCurrentTerms"></input> <label>Include non-current terms</label>
          </Col>

        </Row>

        <Row>
          <Col sm={2}>
            <div className="medcard1">

              <Card.Header><span className="headerChip" style={{ backgroundColor: '#d1b892' }}>SOC</span> <input type="text" className="headerInput" onChange={(e) => onChangeIndSearch(e, "soc")}></input></Card.Header>
              {/* <Card  border="light" style={{ width: '12rem',marginLeft:'1rem' }}>  */}
              <Card border="primary" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body >
                    
                    {/* {
                      lowerTable !== [] ?
                        <div>
                          <span>map {JSON.stringify(lowerTable)}</span>
                          {
                            lowerTable.map((val, i) =>
                              <div>{i}</div>
                            )
                          }

                        </div> : <div>Data</div>
                    } */}

                   
                    <ul>
                      {searchAllResults.map(item => (

                        <li key={item.soc_name}>{item.soc_name}</li>
                      ))}
                    </ul> 
                    
                    

                    {/* {
                      searchAllResults.hasOwnProperty("soc") && (
                        <ul>
                          {[searchAllResults.soc].map(item => (

                            <li key={item.soc_name}>{item.soc_name}</li>
                          ))}
                        </ul>
                      )
                    } */}



                    <ul>
                      {searchSocResults.map(item => (
                        // console.log("allseare",item),
                        <li key={item.soc_code} onClick={()=>onContentClick(item.soc_code)}>{item.soc_name}</li>
                      ))}
                    </ul>


                    { searchId && table === "hlgt" ?
                    (<ul>
                      {upperTable.map(item => (
                        // console.log("allseare",item),
                        <li key={item.soc_code}>{item.soc_name}</li>
                      ))}
                    </ul>) : (<div></div>)
                    }


                    {/* { searchId ?
                    (<ul>
                      {lowerTable.map(item => (
                        // console.log("allseare",item),
                        <li key={item.soc_code}>{item.soc_name}</li>
                      ))}
                    </ul>) : (<div></div>)
                       } */}




                    <ul>

                      {/* {
                        Object.keys(searchLevelResults).map((item, i) =>
                          <div key={i}>
                            hello
                            {searchLevelResults[item].map((tab, ind) =>
                            <div>{tab.soc_name} hello</div>
                          )}
                          </div>
                        )
                      } */}


                      {/* {searchLevelResults.map(item => (
                        // console.log("allseare",item),
                        <li key={item.soc_name}>{item.soc_name}</li>
                      ))} */}
                    </ul>





                  </Card.Body>
                </div>
              </Card>

              <Card border="info" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                  </Card.Body>
                </div>
              </Card>
              {/* </Card> */}
            </div>
          </Col>


          <Col sm={2} >
            {/* <Card border="light" style={{ width: '12rem',marginLeft:'2rem' }}> */}
            <div className="medcard1">
              <Card.Header><span className="headerChip" style={{ backgroundColor: '#b5d67c' }}>HLGT</span><input type="text" className="headerInput" onChange={(e) => onChangeIndSearch(e, "hlgt")}></input></Card.Header>
              <Card border="success" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                    {/* {
        searchIndResults.hasOwnProperty("hlgt")?  (
          <div>hi</div>):(<div>hello</div>)
        
      } */}
                    
                    <ul>
                      {searchAllResults.map(item => (

                        <li key={item.hlgt_code}>{item.hlgt_name}</li>
                      ))}
                    </ul>

                    {/* {
                      searchAllResults.hasOwnProperty("hlgt") && (
                        <ul>
                          {[searchAllResults.hlgt].map(item => (

                            <li key={item.hlgt_name}>{item.hlgt_name}</li>
                          ))}
                        </ul>
                      )
                    } */}



                    <ul>
                      {searchHlgtResults.map(item => (
                        // console.log("allseare",item),
                        <li key={item.hlgt_code} onClick={(e)=>onContentClick(item.hlgt_code)}>{item.hlgt_name}</li>
                      ))}
                    </ul>



                    { searchId && table === "hlt" ?
                    (<ul>
                      {upperTable.map(item => (
                        // console.log("allseare",item),
                        <li key={item.hlgt_code} >{item.hlgt_name}</li>
                      ))}
                    </ul>) : (<div></div>)
                    }


                   
                   { searchId && table === "soc" ?
                   (<ul>
                      {lowerTable.map(item => (
                        // console.log("allseare",item),
                        <li key={item.hlgt_code}>{item.hlgt_name}</li>
                      ))}
                    </ul>) :(<div></div>)
                     }


                   

                  </Card.Body>
                </div>
              </Card>

              <Card border="info" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                  </Card.Body>
                </div>
              </Card>
              {/* </Card> */}
            </div>
          </Col>


          <Col sm={2}>
            {/* <Card  border="light" style={{ width: '12rem',marginLeft:'3rem' }}> */}
            <div className="medcard1">
              <Card.Header ><span className="headerChip" style={{ backgroundColor: '#d49b83' }}>HLT</span><input type="text" className="headerInput" onChange={(e) => onChangeIndSearch(e, "hlt")}></input></Card.Header>
              <Card border="warning" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                    <ul>
                      {searchAllResults.map(item => (

                        <li key={item.hlt_code}>{item.hlt_name}</li>
                      ))}
                    </ul>

                    {/* {
                      searchAllResults.hasOwnProperty("hlt") && (
                        <ul>
                          {[searchAllResults.hlt].map(item => (

                            <li key={item.hlt_name}>{item.hlt_name}</li>
                          ))}
                        </ul>
                      )
                    } */}


                    <ul>
                      {searchHltResults.map(item => (
                        // console.log("allseare",item),
                        <li key={item.hlt_code} onClick={(e)=>onContentClick(item.hlt_code)}>{item.hlt_name}</li>
                      ))}
                    </ul>


                   { searchId && table === "pt" ?
                    (<ul>
                      {upperTable.map(item => (
                        // console.log("allseare",item),
                        <li key={item.hlt_code} >{item.hlt_name}</li>
                      ))}
                    </ul>) : (<div></div>)
                    }



                    { searchId && table === "hlgt" ?
                    (<ul>
                      {lowerTable.map(item => (
                        // console.log("allseare",item),
                        <li key={item.hlt_code} >{item.hlt_name}</li>
                      ))}
                    </ul>) : (<div></div>)
                      }

                    {/* <ul>
                      {searchLevelResults.map(item => (
                        // console.log("allseare",item),
                        <li key={item.hlt_name}>{item.hlt_name}</li>
                      ))}
                    </ul> */}


                  </Card.Body>
                </div>
              </Card>

              <Card border="info" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                  </Card.Body>
                </div>
              </Card>
              {/* </Card> */}
            </div>
          </Col>


          <Col sm={2}>
            {/* <Card  border="light" style={{ width: '12rem',marginLeft:'4rem' }}> */}
            <div className="medcard1">
              <Card.Header><span className="headerChip" style={{ backgroundColor: '#d4bd83' }}>PT</span><input type="text" className="headerInput" onChange={(e) => onChangeIndSearch(e, "pt")}></input></Card.Header>
              <Card border="warning" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>
                      
                    
                    <ul>
                      {searchAllResults.map(item => (
                        <li key={item.pt_code} >{item.pt_name}</li>
                      ))}
                    </ul> 
                     

                    {/* {
                      searchAllResults.hasOwnProperty("pt") && (
                        <ul>
                          {Object.keys(searchAllResults.pt).map( (item ,index)=> (

                            <li key={item.pt_name}>Ptnm</li>
                          ))}
                        </ul>
                      )
                    } */}


                    <ul>
                      {searchPtResults.map(item => (
                        <li key={item.pt_code} onClick={(e)=>onContentClick(item.pt_code)}>{item.pt_name}</li>
                      ))}
                    </ul>



                    { searchId && table === "hlt" ?
                    (<ul>
                      {lowerTable.map(item => (
                        <li key={item.pt_code} >{item.pt_name}</li>
                      ))}
                    </ul>) : (<div></div>)
                      }

                   {/* { searchId ?
                    (<ul>
                      {upperTable.map(item => (
                        <li key={item.pt_code}>{item.pt_name}</li>
                      ))}
                    </ul>) : (<div></div>)
                       } */}

                  </Card.Body>
                </div>
              </Card>

              <Card border="info" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                  </Card.Body>
                </div>
              </Card>
              {/* </Card> */}
            </div>
          </Col>

          <Col sm={2}>
            {/* <Card  border="light" style={{ width: '12rem',marginLeft:'5rem' }}> */}
            <div className="medcard1">
              <Card.Header><span className="headerChip" style={{ backgroundColor: '#83b9d4' }}>LLT</span><input type="text" className="headerInput"></input></Card.Header>
              <Card border="warning" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                  </Card.Body>
                </div>
              </Card>

              <Card border="info" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                  </Card.Body>
                </div>
              </Card>
              {/* </Card> */}
            </div>
          </Col>

          <Col sm={2}>
            {/* <Card  border="light" style={{ width: '12rem',marginLeft:'6rem' }}> */}
            <div className="medcard1">
              <Card.Header><span className="headerChip" style={{ backgroundColor: '#b7ed5a' }}>Synonyms</span><input type="text" className="headerInput"></input></Card.Header>
              <Card border="warning" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                  </Card.Body>
                </div>
              </Card>

              <Card border="info" style={{ width: '10rem', marginRight: "25rem" }}>
                <div className="center-scroll">
                  <Card.Body>

                  </Card.Body>
                </div>
              </Card>
              {/* </Card> */}
            </div>
          </Col>
        </Row>


        <Row>
          <Col sm={12}>
            <div style={{ border: "1px solid #cbf5f0", marginTop: '-17.5rem', width: '71.8rem' }}>
              <label className="contentLabel" style={{ width: '8rem' }}>SOC</label> <input className="contentInput" style={{ width: '10.5rem' }} type="text"></input> <input className="contentInput" style={{ width: '52.4rem' }} type="text"></input>
              <label className="contentLabel" style={{ width: '8rem' }}>HLGT</label> <input className="contentInput" style={{ width: '10.5rem' }} type="text"></input> <input className="contentInput" style={{ width: '52.4rem' }} type="text"></input>
              <label className="contentLabel" style={{ width: '8rem' }}>HLT</label> <input className="contentInput" style={{ width: '10.5rem' }} type="text"></input> <input className="contentInput" style={{ width: '52.4rem' }} type="text"></input>
              <label className="contentLabel" style={{ width: '8rem' }}>PT</label> <input className="contentInput" style={{ width: '10.5rem' }} type="text"></input> <input className="contentInput" style={{ width: '52.4rem' }} type="text"></input>
              <label className="contentLabel" style={{ width: '8rem' }}>LLT</label> <input className="contentInput" style={{ width: '10.5rem' }} type="text"></input> <input className="contentInput" style={{ width: '52.4rem' }} type="text"></input>
              <label className="contentLabel" style={{ width: '8rem' }}>Synonyms</label> <input className="contentInput" style={{ width: '10.5rem' }} type="text"></input> <input className="contentInput" style={{ width: '52.4rem' }} type="text"></input>
            </div>
          </Col>
        </Row>

        <div style={{ marginLeft: '28rem', marginTop: '-4.5rem' }}> <button className="button3">Export</button> <button className="button3">Print</button> <button className="button3">Cancel</button> </div>


      </Container>
    </div>

  )
}
export default MedDRA;