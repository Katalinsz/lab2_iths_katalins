import React from 'react';
//import '../css/PixelImage.css';
import ButtonPicker from './ColorPicker.js';
import styled from "styled-components";
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
/*For tabs*/
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
/*----*/

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div >
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const PlayColor = styled.div`
	width:  ${({width}) => width ? width+'px' : '300px'};
    border: 1px solid #ddd;
    box-shadow: #ddd 1px 1px 4px;
    border-radius: 4px;
	position: relative;
	padding: 15px 9px 9px 15px;
    margin: 20px;
	height: 32px;
	display: block;
`

const RootStyle = styled.div`
	border: 1px solid #ccc;
	background-color: #fafafa;
	margin-right: 30px;
	margin-left: 30px;
	margin-bottom: 60px;
`

class ExtentionTabs extends React.Component {
	constructor(props) {
		super(props);
		this.handleColorChange = this.handleColorChange.bind(this);
		this.state = {
			background: '#fff',
			color: "#ccc",
			displayColorPicker: false,
			playColorWidth: this.props.colors.length * 38,
			value: 0,
		};
	}

    handleTabChange = (event, newValue) => {
	    this.setState({value: newValue});
	};

	handleColorChange(color) {
		console.log("handle ColorChange ExtentionTabs picked: ", this.state.background, " color: ", color);
		this.props.onHandleColorChange(color);
	}

	changeColor = (color, ind) => {
		this.setState(
			{
				background: color,
			}
		)
		this.props.onHandleColorChange(color, ind);
		console.log("ExtentionTabs changeColor: ", color, ind);

	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		console.log("ExtensionTabs, onSortEnd")
		this.props.onSortEnd(oldIndex, newIndex);
	}

	render() {
		const value = this.state.value;

		const SortableColorsContainer = sortableContainer(({ children }) =>
							<PlayColor
									width={this.state.playColorWidth}
									color={this.props.colors[0]}
							>
								{children}
							</PlayColor>
		);

		const SortableColor = sortableElement(({ color, onColorChange }) =>
									<ButtonPicker
										color={color}
										onColorChange={onColorChange}
										key={color}
										ref={this.wrapper}
									/>
		);

		return (
			<RootStyle>
      	<AppBar position="static">
        		<Tabs value={value} onChange={this.handleTabChange} aria-label="simple tabs example">
  						<Tab label="Play With Color" {...a11yProps(0)} />
  						<Tab label="Embed" {...a11yProps(1)} />
					  </Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					{/*<SortableColorsContainer
								axis="x"
								onSortEnd={this.onSortEnd}
								width={this.state.playColorWidth}
								color={this.props.colors[0]}
						>
							{this.props.colors.map((color, k) =>
								<SortableColor
									color={color}
									onColorChange={this.changeColor}
									key={k}
									ind={k}
									index={k}
								/>
							)}
						</SortableColorsContainer>*/}

            <PlayColor
  						width={this.state.playColorWidth}
  						color={this.props.colors[0]}
  				  >
  					{this.props.colors.map((color, k) =>
  						<ButtonPicker
  							color={color}
  							onColorChange={this.changeColor}
  							key={k}
  							ind={k}
  							onDragStart={(e)=>this.onDragStart(e)}
  							draggable
  							className="draggable"
  						/>
  					)}
 					</PlayColor>
				</TabPanel>
				<TabPanel value={value} index={1}>
        {/*<div class="embed-tab">
             <div class="containment-wrapper">
              {if $owner}

                   Use the code bellow to insert the motif on your website.
                  <img class="opener4" src="{$link->getPageLink('index', true)|escape:'html':'UTF-8'}/img/info.png" />
                  <div id="dialog-message4" title="Embed motif help">
                     {include file="themes/stickningsmotiv/text_embed_motif.tpl"}
                  </div>

                  <xmp style='text-align:left;'>
    <iframe width="100%" height="{$embed_height}"
             src="{$link->getPageLink('index', true)|escape:'html':'UTF-8'}{$embed_code}" frameborder="0" >
    </iframe>
                          </xmp>

                            By embedding Knitted for Yous motif on your site, you are agreeing to Knitted for You API Terms of Service
              {else}
                  You are able to embed your motifs only. Create own motifs and embed them into your site.

              {/if}


                  </div>


          </div>*/}

          <div className="embed-tab">
							<div className="containment-wrapper">
								Use the code bellow to insert the motif on your website.
								<img className="opener4" src="https://motif.knittedforyou.com//img/info.png" alt="embed" />
								<xmp>
									{/*<iframe width="100%" height="2320" src="https://motif.knittedforyou.com/embed/oz_hg.motif"
										frameBorder="0" title="Your motif to embed" >
									</iframe>
									*/}
								</xmp>
                You are able to embed your motifs only. Create own motifs and embed them into your site.

								By embedding Knitted for Yous motif on your site, you are agreeing to Knitted for You API Terms of Service
							</div>
					</div>
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item Three
				</TabPanel>
			</RootStyle>
		);

		}
}

export default ExtentionTabs;
