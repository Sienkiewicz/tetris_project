import React, { useEffect, useState } from 'react'
import Cell from './Cell'
import styled from 'styled-components'
import StyledStage from './Styled/StyledStage'


export const StyledDisplayDetailsNextPiece = styled(StyledStage)`
  grid-template-rows: repeat(
    ${ props => props.height },
    calc((4rem - 5px) / ${ props => props.width })
  );
  grid-template-columns: repeat(${ props => props.width }, 1fr);
  border: none;
  width: 100%;
  max-width: 4rem;
  min-width: 4rem;
  margin: auto;

`


const DisplayDetailsNextPiece = ({ piece, isStartedGame }) => {
	const stage = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	]
	const [prevPiece, setPrevPiece] = useState(stage)

	useEffect(() => {

		const updateStage = () => {
			let newStage = stage.map(row => row.map(cell => cell))

			if (piece.matrix !== undefined) {
				piece.matrix.forEach((row, y) => row.forEach((cell, x) => {
					if (cell !== 0) {
						newStage[y][x] = [cell];
					}
				}));
			}
			return newStage
		}
		setPrevPiece(updateStage())

	}, [piece.matrix])

	useEffect(() => {
		if (!isStartedGame) {
			setPrevPiece(stage)
		}
	}, [isStartedGame])

	return (
		<StyledDisplayDetailsNextPiece height={prevPiece.length} width={prevPiece[0].length}>
			{prevPiece.map(row => row.map((cell, x) => <Cell key={x} fillCell={cell} />))}
		</StyledDisplayDetailsNextPiece>
	)
}

export default DisplayDetailsNextPiece
