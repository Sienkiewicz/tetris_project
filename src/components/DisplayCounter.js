import React from 'react'
import styled from 'styled-components'
import DisplayDetailsNextPiece from './DisplayDetailsNextPiece';


export const StyledDisplayDetailsCounter = styled.div`
box-sizing: border-box;
margin: 10px 0 20px 5px;
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
	const arrNumbersOfCounter = ['00000', '00000', ''];
	let point = '';
	switch (label) {
		case 'Point': point = arrNumbersOfCounter[0];
			break;
		case 'Cleans': point = arrNumbersOfCounter[1];
			break;
		case 'Level': point = arrNumbersOfCounter[2];
			break;
		default: point = ''
	}

	return (
		<StyledDisplayDetailsCounter>
			<div className='pl-1 pb-1'>{label}</div>
			{isDisabled ? <div className='pr-1'>{point}<span>{+counter}</span></div> : <DisplayDetailsNextPiece piece={piece} isStartedGame={isStartedGame} />}
		</StyledDisplayDetailsCounter>
	)
}

export default DisplayDetailsCounter
