import { widthOfStage } from "./helpers"

export const tetramino = [
	[
		[1, 1, 1],
		[0, 1, 0],
		[0, 0, 0]
	],
	[
		[1, 1],
		[1, 1],
	],
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
]

export const randomTetromino = () => {
	const rand = Math.floor(Math.random() * tetramino.length)

	const mtrx = JSON.parse(JSON.stringify(tetramino[rand]))

	const piece = {
		matrix: mtrx,
		pos: { x: Math.round(widthOfStage / 2 - mtrx.length / 2), y: 0 },
	}
	return piece
}



