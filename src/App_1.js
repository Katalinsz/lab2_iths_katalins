import React, { useContext, useEffect, useState } from 'react';
import Motif from './components/Motif';
import MotifList, { SelectedMotifContext } from './components/MotifList';
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";
import axios from 'axios';
import {
  useQuery,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";

const motifs = [
  {"name":"Snoflake", "url": "https://motif.knittedforyou.com/download/download_json.php?f=1123", "tags":["animal", "bird", "child"]},
  {"name":"Snoman",  "url": "https://motif.knittedforyou.com/img/Motif/1124", "tags":["animal", "bird", "child"]},
  {"name":"Bird", "url": "https://motif.knittedforyou.com/img/Motif/1125", "tags":["animal", "bird", "child"]},
  {"name":"Tetris", "url": "https://motif.knittedforyou.com/img/Motif/1126", "tags":["animal", "bird", "child"]},
  {"name":"City", "url": "https://motif.knittedforyou.com/img/Motif/1127", "tags":["animal", "bird", "child"]},
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
  let motifJSON = useQuery(["post", postId], getMotif, {
    f: postId,
  });
  return motifJSON;
}

function MotifQuery() {
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
    selectedMotif: 0, 
    motifJSON: {},
  });

  
  
  //let query = useQuery();
  // let img = query.get("img");
  //img = img ? img : 359;
  let img = 359;
  // let motif = require('../../../workspace/motifKfY/img/Motif/'+img+'.json');


 // console.log("imported motifjson: ", motif);
  useEffect(() => {
    setAppState({ loading: true });
  
    let motifJSON = useQuery(["post", postId], getMotif, {
      f: postId,
    });
    
    console.log(motifJSON);
    setAppState({ loading: false, motifJSON: motifJSON});
    console.log('This is your data', motifJSON); 

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
    <Motif input={appState.motifJSON}></Motif>
  
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
