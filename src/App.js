import React, { useContext, useEffect, useState } from 'react';
import Motif from './components/Motif';
import MotifList, { SelectedMotifContext } from './components/MotifList';
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";
import axios from 'axios';


const motifs = [
  {"name":"Snoflake", "url": "https://motif.knittedforyou.com/download/download_json.php?f=1123", "tags":["animal", "bird", "child"]},
  {"name":"Snoman",  "url": "https://motif.knittedforyou.com/img/Motif/1124", "tags":["animal", "bird", "child"]},
  {"name":"Bird", "url": "https://motif.knittedforyou.com/img/Motif/1125", "tags":["animal", "bird", "child"]},
  {"name":"Tetris", "url": "https://motif.knittedforyou.com/img/Motif/1126", "tags":["animal", "bird", "child"]},
  {"name":"City", "url": "https://motif.knittedforyou.com/img/Motif/1127", "tags":["animal", "bird", "child"]},
]


// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MotifQuery() {
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
    selectedMotif: 0, 
    motifJSON: {},
  });

  
   
   
    /*fetch (motifJSONurl, { mode: 'no-cors'})
      .then((response) => response.json())
      .then((motifJSON) => {
        setAppState({ loading: false, motifJSON: motifJSON});
        console.log('This is your data', motifJSON); 
      })
      .catch(e => {
        console.log("fetch failed on motif, ", motifJSONurl, e);
        return e;
      });
  }, [setAppState]);   
  */
//let motif = require();
  return (
    <Motif input={appState.motifJSON}></Motif>
  )
}

function App() {

  return (
    <Router>
      <SelectedMotifContext.Provider value="0">
        <MotifList motifs={motifs}></MotifList>
        <MotifQuery>
        </MotifQuery>
      </SelectedMotifContext.Provider>  
    </Router>
  )
}

export default App;
