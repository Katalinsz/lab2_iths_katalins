import React, {useState} from 'react'; 
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const MotifBox = styled.div`
  margin: 10px;
  padding: 3px; 
  width: auto; 
  border: 1px solid #ccc; 
  float:left;
  display: inline-box; 
`

function MotifListItem(props) {
    const [selectedMotif, setSelectedMotif] = useState();
   
    
    const onMotifClick = (item) => {
      setSelectedMotif(prevState => ({
        ...prevState, 
        id: 1103
      }));
    };

    return (
          <MotifBox onClick={onMotifClick}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.motif.url + ".png"} />
            <Card.Body>
              <Card.Title> {props.motif.name} </Card.Title>
              <Card.Text>
                {props.motif.description}
              </Card.Text>
              <Button variant="primary">Knit with Line by line</Button>
            </Card.Body>
          </Card>
             
          </MotifBox>
    )
}
  
const MotifListContainer = styled.div`
  color: ${(props) => props.theme.title};
  width: 100%;
`;

export default function MotifList(props) {
    let motifs = props.motifs ? props.motif : [];
    motifs = props.motifs; 
    
    return (
      <MotifListContainer>
        {motifs.map((motifData, key) =>
          <MotifListItem
            key={key}
            motif={motifData}
          />
        )}
      </MotifListContainer>
    )  
}
  