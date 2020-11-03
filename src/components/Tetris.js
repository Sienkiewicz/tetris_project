import React, { memo, useState } from 'react'
import { usePiece } from '../hooks/usePiece'
import useStage from '../hooks/useStage'
import Stage from './Stage'
import StyledDisplay from './Styled/StyledDisplay'
import { StyledWrapper } from './Styled/StyledTetris'
import { collided, createStage } from './../helpers'
import { useAnimationFrame } from '../hooks/useInterval'
import {
	Row,
} from '@bootstrap-styled/v4';
import Button from '@bootstrap-styled/v4/lib/Button'
import DisplayDetailsCounter from './DisplayCounter'
import { useGameStatus } from '../hooks/useGameStatus'
import { useTgm3Randomizer } from '../tetramino'

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null)
	const [isStartedGame, setIsStartedGame] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	const [randTetramino, resetPool] = useTgm3Randomizer()
	const [bit, updateBitPosition, resetPiece, rotatePiece, nextBit] = usePiece(randTetramino, isStartedGame)
	const [stage, initialStage, setInitialStage, sweepRows, clearedRows] = useStage(bit, isStartedGame)
	const [level, cleanRows, points, setLevel, setPoints, setCleanRows] = useGameStatus(clearedRows, setDropTime)
	const [stopUseAnimationRequest, isThrow, toggleSetThrow] = useAnimationFrame(dropTime)


	const movePiece = (dir) => {
		if (!collided(bit, initialStage, { x: dir, y: 0 })) {
			updateBitPosition({ x: dir, y: 0 })
		}
	}

	const handlerTimeDrop = () => {
		toggleSetThrow()
		if (level > 1) {
			setDropTime(1000 / level * 1.5)
		} else setDropTime(1000)
	}

	const keyUp = ({ keyCode }) => {
		if (isStartedGame) {
			if (keyCode === 40) {
				handlerTimeDrop()
			}
		}
	}

	const movePieceDown = () => {
		if (isStartedGame) {
			if (dropTime !== 60) {
				toggleSetThrow()
				setDropTime(60)
			}
		}
	}

	const resetGame = () => {
		setIsStartedGame(false);
		setDropTime(null);
		setInitialStage(createStage());
		setLevel(1);
		setPoints(0);
		setCleanRows(0)
		stopUseAnimationRequest();
		resetPool()
	}

	const drop = () => {
		if (!collided(bit, initialStage, { x: 0, y: 1 })) {
			updateBitPosition({ x: 0, y: 1 })
		} else {
			setInitialStage(sweepRows(stage))
			resetPiece(isStartedGame);
			handlerTimeDrop();
			if (bit.pos.y < 4) {
				resetGame()
				console.log('GAME OVER');
				setDropTime(null)
			}
		}
	}

	if (isThrow) {
		if (dropTime != null) {
			toggleSetThrow()
			drop();
			if (dropTime === 60) {
				setPoints(prev => prev + 1)
			}
		}
	}

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
		// setIsPaused(!isPaused)
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
					<DisplayDetailsCounter label='Point' counter={points} isDisabled={true} />
					<DisplayDetailsCounter label='Cleans' counter={cleanRows} isDisabled={true} />
					<DisplayDetailsCounter label='Level' counter={level} isDisabled={true} />
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
