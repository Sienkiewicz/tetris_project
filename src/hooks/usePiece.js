import { useState } from "react"
import { collided } from "../helpers"
import { randomTetromino } from "../tetramino"

const piece = randomTetromino()

export const usePiece = () => {
	const [bit, setBit] = useState(piece)
	const [nextBit, setNextBit] = useState([])

	const rotate = (piece, dir) => {
		const mtrx = piece.matrix.map((_, i) => piece.matrix.map(column => column[i]))

		if (dir > 0) return mtrx.map(row => row.reverse());
		return mtrx.reverse()
	}

	const rotatePiece = (initialStage, dir) => {
		const clonedPiece = JSON.parse(JSON.stringify(bit))
		clonedPiece.matrix = rotate(clonedPiece, dir)

		const pos = clonedPiece.pos.x;
		let offset = 1;
		while (collided(clonedPiece, initialStage, { x: 0, y: 0 })) {
			clonedPiece.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));

			if (offset > clonedPiece.matrix.length) {
				rotate(clonedPiece, -dir);
				clonedPiece.pos.x = pos;
				return
			}
		}
		setBit(clonedPiece)
	}

	const updateBitPosition = ({ x, y }) => {
		setBit(prev => ({
			...prev,
			pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) }
		}))
	}

	const randomRotateFigure = figure => {
		let mtrx = JSON.parse(JSON.stringify(figure))

		let i = Math.floor(Math.random() * 3 + 1);
		while (i) {
			mtrx.matrix = rotate(mtrx, +1)
			i--;
		}

		const offset = arr =>
			arr.reduce((ack, row) => {
				if (row.findIndex(cell => cell === 1) === -1) {
					++ack;
					return ack;
				}
				ack = 0
				return ack;
			}, 0)

		const shift = 4 - (mtrx.matrix.length - offset(mtrx.matrix));
		mtrx.pos.y = shift;

		return mtrx
	}

	const resetPiece = (isStartedGame) => {
		if (isStartedGame) {
			setBit(randomRotateFigure(nextBit));
		} else setBit(randomRotateFigure(randomTetromino()));
		setNextBit(randomTetromino());
	}


	return [bit, updateBitPosition, resetPiece, rotatePiece, nextBit]
}