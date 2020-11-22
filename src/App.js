import React, { useEffect, useState } from 'react';
import Motif from './components/Motif';
import MotifList from './components/MotifList';
import "./css/App.css"; 
import {Container, Row, Col} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Header from "./components/Header";
import TopBar from "./components/TopBar";
import Theme from "./components/Theme";
import { ThemeStore } from "./contexts/ThemeStore";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import {
  useQuery,
 } from "react-query";

const motifs = [
  {"name":"Snoflake", "url": "https://motif.knittedforyou.com/img/Motif/1123", "json": "https://motif.knittedforyou.com/download/download_json.php?f=1123", "tags":["animal", "bird", "child"]},
  {"name":"Snoman",  "url": "https://motif.knittedforyou.com/img/Motif/1124", "json": "https://motif.knittedforyou.com/download/download_json.php?f=1124", "tags":["animal", "bird", "child"]},
  {"name":"Bird", "url": "https://motif.knittedforyou.com/img/Motif/1125", "json": "https://motif.knittedforyou.com/download/download_json.php?f=1125", "tags":["animal", "bird", "child"]},
  {"name":"Cat", "url": "https://motif.knittedforyou.com/img/Motif/1104", "json": "https://motif.knittedforyou.com/download/download_json.php?f=1104", "tags":["animal", "bird", "child"]},
]


// A custom hook that builds on useLocation to parse
// the query string for you.
/*function useQuery() {
  return new URLSearchParams(useLocation().search);
}*/

const getMotif = async (key, id) => {
  const data = await axios.get(`https://motif.knittedforyou.com/download/download_json.php?f=${id}`);
  return await data; 
}

function useMotif(postId) {
    //const [motifJSON, setMotifJSON] = useState(null);
    return useQuery(["post", postId], getMotif, {
      f: postId,
    });
}

  
function MotifQuery(props) {
    //const [selectedMotif, setSelectedMotif] = useState({"id": 600, "json": {}});
    //const motifJSON = useMotif(props.selectedMotif); 
    
    let motifJSON = require('./input/'+props.selectedMotif+'.json');
    
    /*setSelectedMotif(prevState => ({
      ...prevState, 
      json: motifJSON
    }));*/

    return (
        <Motif input={motifJSON} ></Motif>
    )
}

function App() {
    //const {selectedMotif, onMotifClick1} = useContext(MotifListContext);
    const [selectedMotif, setSelectedMotif] = useState(1123);
    const [motifJSON, setMotif] = useState(selectedMotif);


    const onMotifClick = (item) => {
      setSelectedMotif(item);
    }; 

    useEffect(() => {
      const loadMotif = async () => {
        const motifJSON_ = await getMotif(selectedMotif);
        setMotif(motifJSON_);
      };
   
      loadMotif();
    }, []);

  return (
   <ThemeStore>
      <Theme>
          <Container fluid>
            <Row><Col>
              <TopBar />
            </Col></Row>
            <Row><Col>
          
                <Header> </Header>
             </Col></Row>
                  
              <Row><Col>
                  <MotifList motifs={motifs} onClick={onMotifClick}></MotifList>
                </Col></Row>
                <Row><Col>
                </Col></Row>
          </Container>
        </Theme>
        <Container fluid>
              <Row>
                <Col>
                  <Alert variant="success">
                    <Alert.Heading> <hr/>Follow the interactive knitting chart bellow <hr/></Alert.Heading>
                  </Alert>
                </Col>
              </Row>
              <Row><Col>
                  <MotifQuery selectedMotif={selectedMotif}>
                  </MotifQuery>
                 </Col>
              </Row>
          </Container>

  </ThemeStore>
  
  )
}

export default App;
