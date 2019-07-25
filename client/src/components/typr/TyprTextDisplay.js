import React from "react";
//import {textToArrayOfWords} from '../actions/text_conversions';

export class TyprTextDisplay extends React.Component {
	constructor(props) {
		//console.log("TyprTextDisplay constructor() called");
		super(props);
		this.textArray = this.props.textArray;
	}

	render() {
		//Note: using index as key is only safe here because the index for each item is stable (i.e items arent being inserted / order being changed
		const elements = this.textArray.map((word, key) => {
			return (
				<div className="word" key={key}>
					{word.map((char, key) => {
						return (
							<div className={char.className} key={key}>
								{char.char}
							</div>
						);
					})}
				</div>
			);
		});

		return (
			<div className="textDisplay">
				{elements}
				<div className="endFill" />
			</div>
		);
	}
}
