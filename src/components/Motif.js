import React from 'react';
import '../css/PixelImage.css'
import ExtentionTabs from './ExtensionTabs.js';
import arrayMove from 'array-move';

const PixelCounter = ({ color, count }) => {
	return (
		<li
			className="pixel-counter"
			style={{ backgroundColor: color }}>
			<div>
				{count}
			</div>
		</li>
	)
}

class PixelCounterNav extends React.Component {
	render() {
		const colors = this.props.colors;
		return (
			<nav>
				<ul className="colors">
					{this.props.row.map((pixel, i) =>
						<PixelCounter
							key={"pixel-counter" + this.props.index + "-" + i}
							count={pixel.count}
							color={colors[pixel.color]}
						/>
					)}
				</ul>
			</nav>
		)
	}
}

class Pagination extends React.Component {
	previousClick = () => this.props.onClick(this.props.row - 1)
	nextClick = () => this.props.onClick(this.props.row + 1)

	render() {
		return (
			<ul className="pagination">
				<li>
					<div className="prev" aria-label="Previous" onClick={this.previousClick}>
						<span aria-hidden="true">«</span>
					</div>
				</li>
				<li>
					<div className="display">Current row {this.props.motifHeight - this.props.row}</div>
				</li>
				<li>
					<div className="next" aria-label="Next" onClick={this.nextClick}>
						<span aria-hidden="true">»</span>
					</div>
				</li>
			</ul>
		)
	}
}

const Pixel = ({ colors, count }) => {
	return (
		<div>
			{colors.map((color, i) =>
				<div
					className="pixel-box"
					style={{ backgroundColor: color }}
					key={i}
				></div>
			)}
		</div>
	)
}

class MotifRow extends React.Component {
	handleClick = () => this.props.onClick(this.props.index)

	render() {
		const colors = this.props.colors;
		return (
			<div
				className={this.props.isActive ? 'selected_row' : "row "}
				onClick={this.handleClick}
			>
				<div className="pixel-box"> {this.props.rowNr}</div>
				{this.props.pixels.map((pixel, i) =>
					<Pixel colors={Array(pixel.count).fill(colors[pixel.color])}
						key={"pixel" + this.props.index + "-" + i}
						count={pixel.count}
					/>
				)}
				<div className="pixel-box"> {this.props.rowNr}</div>
				<div className="clearfix" key={"clearfix" + this.props.index}></div>
			</div>
		)
	}
}

class Motif extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: this.props.input,
			colors: this.props.input.colors,
			selectedIndex: 0,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleColorChange = this.handleColorChange.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this)
	}

	handleClick = (index) => {
		if (index >= 0 && index < this.state.current.height)
			this.setState({ selectedIndex: index })
	}

	handleColorChange(color, ind) {
		const colors = this.state.colors;
		colors[ind] = color;

		this.setState({colors: colors})
	}

	onSortEnd = ( oldIndex, newIndex ) => {
		const colors = this.state.colors;
		this.setState({colors: arrayMove(colors, oldIndex, newIndex)});
	}

	render() {
		let input = this.state.current;
		if (!input.width || input.width == 0) {
			input.rows = [];
			input.rows[this.state.selectedIndex] = {"pixels": []};
			return (<div>No motif to load</div>);  
		}	
		const colors = this.state.colors;
		let width = (input.width + 2) * 16 + 40;
		return (
			<div>
			<div className="motif-container">
			<div className="motif" style={{ width: width }}>
				{input.rows.map((item, k) =>
					<MotifRow index={k}
						key={k}
						isActive={this.state.selectedIndex === k}
						onClick={this.handleClick}
						pixels={item.pixels}
						colors={colors}
						rowNr={input.height - k}
					/>
				)}
				<div>
					<div className="row-end" key="last-row-block">
						<div className="pixel-box" key="last-row1"> </div>
						{[...new Array(input.width)].map((item, ind) =>
							<div className="pixel-box" key={"last-row" + (input.width - ind)}> {input.width - ind}</div>

						)}
					</div>
					<div className="pixel-box" key="last-row2"> </div>
					<div className="clearfix" key={"clearfix-at-end"}></div>
				</div>
				</div>
				</div>
				<PixelCounterNav
					row={input.rows[this.state.selectedIndex].pixels}
					colors={colors}
				/>
				<Pagination
					row={this.state.selectedIndex}
					motifHeight={input.height}
					onClick={this.handleClick}
				/>
				<ExtentionTabs
					colors={this.state.colors}
					onHandleColorChange={this.handleColorChange}
					onSortEnd={this.onSortEnd}
				/>
			</div>
		)
	}
}

export default Motif;
