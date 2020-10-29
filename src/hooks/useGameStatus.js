import { useCallback, useEffect } from "react"
import { useState } from "react"


export const useGameStatus = (clearedRows, setDropTime) => {
	const [level, setLevel] = useState(1)
	const [cleanRows, setCleanRows] = useState(0)
	const [points, setPoints] = useState(0)

	const lineScore = [100, 300, 500, 800]

	const calcScore = useCallback(() => {
		if (clearedRows > 0) {
			setCleanRows(prev => prev + clearedRows);
			setPoints(prev => prev + lineScore[clearedRows - 1])
		}
	}, [clearedRows])


	useEffect(() => {
		calcScore();
	}, [clearedRows])

	useEffect(() => {
		if (cleanRows >= level) {
			setLevel(prev => prev + 1);
			setDropTime(1000 / (level + 1) * 1.5)
		}
	}, [cleanRows, level])

	return [level, cleanRows, points, setLevel, setPoints, setCleanRows]
}