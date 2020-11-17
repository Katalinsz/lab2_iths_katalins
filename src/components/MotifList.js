import React from 'react'; 
import styled from 'styled-components'

let globalSelectedMotif = 0; 
export const SelectedMotifContext = React.createContext(globalSelectedMotif);

const MotifBox = styled.div`
  margin: 10px;
  padding: 3px; 
  width: auto; 
  border: 1px solid #ccc; 
  float:left;
  display: inline-box; 
`

function MotifListItem(props) {
    console.log("Motif.props", props);

    const onMotifClick = (item) => {
      console.log("clicked", item); 
      //setImageSelected(item);
    };

    return (
      <MotifBox onClick={onMotifClick}>
          <img src={props.motif.url + ".png"} className="motif-image" alt="motifimage" />
          <label>{props.motif.name}</label>
      </MotifBox>
    )
}
  
export default function MotifList(props) {
    console.log(props); 
    return (
      <div className="motif-container">
        {props.motifs.map((motifData, key) =>
          <MotifListItem
            key={key}
              motif={motifData}
          />
        )}
      </div>
    )  
}
  