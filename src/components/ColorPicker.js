import React from 'react'
import { SketchPicker } from 'react-color'
import styled from "styled-components"; 

const ColorPickerButton = styled.div`
  width: 30px; 
  height: 30px; 
  border-radius: 4px;
  border: 0px solid #ccc;
  box-shadow: #333 2px 1px 4px;
  margin: 0px 8px 8px 0px; 
  position: relative;
  cursor: pointer;  
  float: left;  
  display: block; 
  background-color: ${({color}) => color ? color : 'black'};
`

class ButtonPicker extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        displayColorPicker: false,
        background: this.props.color,
      }; 
      this.changeColor = this.changeColor.bind(this); 
      this.handleClick = this.handleClick.bind(this); 
    }

    handleClick = () => {
      console.log("handleClick i ColorPicker *"); 
      this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
      console.log("ColorPicker handleClose *") 
      this.setState({ 
          displayColorPicker: false 
      })
    };

    changeColor = (color) => {
      let ind = this.props.ind; 
      this.props.onColorChange(color.hex, ind); 
      console.log("ColorPicker changeColor pickkkkkked * : ", "color: ", color, "index: ", ind);
      console.log(this.props)
    }
    
    render() {
      const popover = {
        position: 'absolute',
        zIndex: '2',
      }
      const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }
      return (
        <span>
          <ColorPickerButton color={this.props.color} onClick={ this.handleClick } ></ColorPickerButton>
          { this.state.displayColorPicker ? 
                <div style={ popover }>
                  <div 
                    style={ cover } 
                    onClick={ this.handleClose }
                  />
                  <SketchPicker
                    color={this.props.color}
                    onChangeComplete={this.changeColor}
                  />
                  </div> : null 
          }

        </span>
      )
    }
}

export default ButtonPicker

