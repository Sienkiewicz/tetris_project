import React, { useState } from 'react'
import { usePiece } from '../hooks/usePiece'
import useStage from '../hooks/useStage'
import Stage from './Stage'
import StyledDisplay from './Styled/StyledDisplay'
import { StyledWrapper } from './Styled/StyledTetris'
import { collided, createStage } from './../helpers'
import { useInterval } from '../hooks/useInterval'
import {
	Row,
} from '@bootstrap-styled/v4';
import Button from '@bootstrap-styled/v4/lib/Button'
import DisplayDetailsCounter from './DisplayCounter'

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null)
	const [isStartedGame, setIsStartedGame] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	const [bit, updateBitPosition, resetPiece, rotatePiece, nextBit] = usePiece()
	const [stage, initialStage, setInitialStage, sweepRows] = useStage(bit, isStartedGame)


	const movePiece = (dir) => {
		if (!collided(bit, initialStage, { x: dir, y: 0 })) {
			updateBitPosition({ x: dir, y: 0 })
		}
	}

	const keyUp = () => {
		setDropTime(1000)
	}

	const movePieceDown = () => {
		drop();
		setDropTime(null)
	}

	const drop = () => {
		if (!collided(bit, initialStage, { x: 0, y: 1 })) {
			updateBitPosition({ x: 0, y: 1 })
		} else {
			setInitialStage(sweepRows(stage))
			resetPiece(isStartedGame);
			if (bit.pos.y < 4) {
				resetGame()
				console.log('GAME OVER');
				setDropTime(null)
			}
		}
	}


	useInterval(() => {
		drop();
	}, dropTime);

	const move = ({ keyCode }) => {
		switch (keyCode) {
			case 40:
				movePieceDown()
				break;
			case 39:
				movePiece(1)
				break;
			case 37:
				movePiece(-1)
				break;
			case 38:
				rotatePiece(initialStage, 1)
				break;
			default: ;
		}
	}


	const startGame = () => {
		setIsStartedGame(true);
		resetPiece(isStartedGame);
		setDropTime(1000);
		createStage();
		
	}

	const stopGame = () => {
		setIsPaused(!isPaused)
	}

	const resetGame = () => {
		setIsStartedGame(false);
		setDropTime(null);
		setInitialStage(createStage());
	}

	return (
		<StyledWrapper
			role='button'
			tabIndex='0'
			onKeyDown={e => move(e)}
			onKeyUp={keyUp}
		>
			<StyledDisplay>
				<Stage stage={stage} />
				<div className='styledDisplay__container'>
					<DisplayDetailsCounter label='Point' counter='' isDisabled={true} />
					<DisplayDetailsCounter label='Cleans' counter='' isDisabled={true} />
					<DisplayDetailsCounter label='Level' counter='' isDisabled={true} />
					<DisplayDetailsCounter label='Next' isDisabled={false} piece={nextBit} isStartedGame={isStartedGame} />
				</div>
			</StyledDisplay>
			<Row className='mx-auto'>
				<Button
					className='m-1'
					onClick={startGame}
				>start</Button>
				<Button
					className='m-1'
					onClick={stopGame}
				>stop</Button>
				<Button
					className='m-1'
					onClick={resetGame}
				>reset</Button>
			</Row>
		</StyledWrapper>
	)
}

export default Tetris
