import React, { memo } from 'react'
import styled from 'styled-components'
import DisplayDetailsNextPiece from './DisplayDetailsNextPiece';


export const StyledDisplayDetailsCounter = styled.div`
box-sizing: border-box;
margin: 10px 0 20px 5px;
width: 120px;
& :first-child{
	text-align: left;
	font-family:  Roboto, regular;
	font-size:0.8rem;
}

& :last-child{
	text-align: right;
	font-family:  Digital, regular;
	font-size: 1.3rem;
	color: rgba(158, 173, 134, 0.3);
	& span {
		color: black;
	}
}
`


const DisplayDetailsCounter = ({ label, counter, isDisabled, piece, isStartedGame }) => {
	const arrNumbersOfCounter = ['000000', '00000', ''];

	const zeroes = (num) => {
		const numOfCounter = counter.toString().length;
		let point = arrNumbersOfCounter[num].slice(numOfCounter);
		return point
	}


	let point = '';
	switch (label) {
		case 'Point':
			point = zeroes(0);
			break;
		case 'Cleans': point = zeroes(1);
			break;
		default: point = ''
	}

	return (
		<StyledDisplayDetailsCounter>
			<div className='pl-1 pb-1'>{label}</div>
			{isDisabled ? <div className='pr-1'>{point}<span>{counter}</span></div> : <DisplayDetailsNextPiece piece={piece} isStartedGame={isStartedGame} />}
		</StyledDisplayDetailsCounter>
	)
}

export default memo(DisplayDetailsCounter)
