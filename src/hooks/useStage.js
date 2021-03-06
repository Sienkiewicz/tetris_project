import { useEffect, useState } from "react"
import { createStage } from "../helpers"


const useStage = (piece, isStartedGame) => {

	const [initialStage, setInitialStage] = useState(createStage)
	const [stage, setStage] = useState(initialStage)
	const [clearedRows, setClearedRows] = useState(0)

	const sweepRows = stage => {
		setClearedRows(0)
		return stage.reduce((ack, row) => {
			if (row.findIndex(cell => cell === 0) === -1) {
				setClearedRows(prev => prev + 1)
				ack.unshift(new Array(stage[0].length).fill(0));
				return ack;
			}
			ack.push(row);
			return ack;
		}, [])
	}
	useEffect(() => {
		const updateStage = () => {
			let newStage = initialStage.map(row => row.map(cell => cell))

			if (isStartedGame) {
				piece.matrix.forEach((row, y) => row.forEach((cell, x) => {
					if (cell !== 0) {
						newStage[y + piece.pos.y][x + piece.pos.x] = [cell]
					}
				}))
			}
			return newStage
		}

		setStage(prev => updateStage(prev))
	}, [
		piece.matrix,
		piece.pos.x,
		piece.pos.y,
		initialStage
	])

	return [stage, initialStage, setInitialStage, sweepRows, clearedRows]
}

export default useStage