import styled from "styled-components";
import Alert from 'react-bootstrap/Alert';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Title = styled.h1`
  color: ${(props) => props.theme.title};
    width: 100%;
`;

function Header () {

    return (
        <div className="header">
            <Title>Let's knit these motifs together</Title>
     
            <Alert variant="success">
                <Alert.Heading >Choose a motif below and start using the Line by line tool to knit.</Alert.Heading>
                <p>
                    When you click on a motif, the motif will be loaded as a knitting chart. The program highlights the row that 
                    you knit right now, so that it is easy to follow. The stitches needed in different colors are also calculated 
                    below the chart, so you do not need to count the similar stitches, just read the number from below. 
                    If you will you can also move forward  and backward in rows with the forward and backward buttons. 
                    Would you like to knit with different colors? Check out how the motif will look with your colors. Just click on 
                    the colors below the chart and change to the ones that you want. 
                    Hope you like!    
                </p>
                <hr />
                <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice
                and tidy.
                </p>
            </Alert>
        </div>
    )
}

export default Header;