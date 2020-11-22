import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
    display: flex;
    flex-direction: center;
  height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

export default ContentContainer;
