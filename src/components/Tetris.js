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
import Col from '@bootstrap-styled/v4/lib/Col'
import StyledButton from './helpers/Button'
import Container from '@bootstrap-styled/v4/lib/Container'
import Small from '@bootstrap-styled/v4/lib/Small'
import { useEffect } from 'react'

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null)
	const [isStartedGame, setIsStartedGame] = useState(false)
	const [isTouched, setIsTouched] = useState(false)
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
	const cancelMovePieceDown = () => {
		if (isStartedGame) {
			handlerTimeDrop()
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
		resetPiece(isStartedGame);
		setDropTime(1000);
		createStage();
		setIsStartedGame(true);
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
			<Row className='mx-auto my-2 '>
				<Col className='mx-3 d-flex flex-column'>
					<Small>start</Small>
					<StyledButton
						width='25px'
						role='button'
						tabIndex='0'
						className='m-1'
						onClick={startGame}
					// onTouchStart={startGame}
					></StyledButton>
				</Col>
				<Col className='mx-3 d-flex flex-column'>
					<Small>reset</Small>
					<StyledButton
						width='25px'
						role='button'
						tabIndex='0'
						className='m-1'
						onClick={resetGame}
					// onTouchStart={resetGame}
					></StyledButton>
				</Col>
			</Row>
			{/* Control Buttons */}
			<Container className='container-fluid'>
				<Row className='d-flex'>
					<Col className='d-flex flex-column mr-4'>
						<Row className='d-flex justify-content-center'>
							<StyledButton
								width='40px'
								role='button'
								tabIndex='0'
								className='m-1 '
							>
							</StyledButton>
						</Row>
						<Container className='d-flex'>
							<Col className='mr-3'>
								<Row className='d-flex justify-content-center'>
									<StyledButton
										width='40px'
										role='button'
										tabIndex='0'
										className='m-1 d-flex align-items-center justify-content-center'
										onTouchStart={() => movePiece(-1)}
									>
										<i className="fas fa-arrow-left text-white"></i>
									</StyledButton>
								</Row>
							</Col>
							<Col className='ml-3'>
								<Row className='d-flex justify-content-center'>
									<StyledButton
										width='40px'
										role='button'
										tabIndex='0'
										className='m-1 d-flex align-items-center justify-content-center'
										onTouchStart={() => movePiece(1)}
									>
										<i className="fas fa-arrow-right text-white"></i>
									</StyledButton>
								</Row>
							</Col>
						</Container>
						<Row className='d-flex justify-content-center'>
							<StyledButton
								width='40px'
								role='button'
								tabIndex='0'
								className='m-1 d-flex align-items-center justify-content-center'
								onTouchStart={() => movePieceDown()}
								onTouchEnd={() => cancelMovePieceDown()}
							>
								<i className="fas fa-arrow-down text-white"></i>
							</StyledButton>
						</Row>
					</Col>
					<Col className='d-flex align-items-center'>
						<Container>
							<Small className='d-flex justify-content-center'>
								rotate
								</Small>
							<Row className='d-flex justify-content-center'>
								<StyledButton
									width='60px'
									role='button'
									tabIndex='0'
									className='m-1'
									onTouchStart={() => rotatePiece(initialStage, 1)}
								></StyledButton>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		<Container className='container-fluid'>
				<Row className=' d-flex justify-content-center text-info '>
					<div className='my-1'>You will have more fun with control of Tetris when you try it on PC</div>
					<div className='w-100'></div>
					<Small className=''>Use the arrow keys on the keyboard</Small>
				</Row>
		</Container>
		</StyledWrapper>
	)
}

export default Tetris
