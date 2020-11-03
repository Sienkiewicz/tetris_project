import { useState } from "react"
import { widthOfStage } from "./helpers"

export const tetramino = [
	{
		letter: 'I',
		shape: [
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		amount: 0,
	},
	{
		letter: 'L',
		shape: [
			[0, 0, 1],
			[1, 1, 1],
			[0, 0, 0],
		],
		amount: 0,
	},
	{
		letter: 'J',
		shape: [
			[1, 0, 0],
			[1, 1, 1],
			[0, 0, 0],
		],
		amount: 0,
	},
	{
		letter: 'O',
		shape: [
			[1, 1],
			[1, 1],
		],
		amount: 0,
	},
	{
		letter: 'Z',
		shape: [
			[1, 1, 0],
			[0, 1, 1],
			[0, 0, 0],
		],
		amount: 0,
	},
	{
		letter: 'S',
		shape: [
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0],
		],
		amount: 0,
	},
	{
		letter: 'T',
		shape: [
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0],
		],
		amount: 0,
	},
]


// const arrayOfLetters = ['I', 'L', 'J', 'O', 'S', 'Z', 'T',
// 	'I', 'L', 'J', 'O', 'S', 'Z', 'T',
// 	'I', 'L', 'J', 'O', 'S', 'Z', 'T',
// 	'I', 'L', 'J', 'O', 'S', 'Z', 'T',
// 	'I', 'L', 'J', 'O', 'S', 'Z', 'T',
// ]

// export const useRandomizerTetramino = () => {
// 	const [pool, setPool] = useState(arrayOfLetters)

// 	const resetPool = () => {
// 		setPool(arrayOfLetters)
// 		// console.log('reset');
// 	}

// 	const randTetramino = () => {
// 		console.log(`____pool ${ pool }`);
// 		const fullCopyArrOfTetramino = JSON.parse(JSON.stringify(tetramino))

// 		// find the number of letters of the same type
// 		pool.forEach(letter => {
// 			let i = fullCopyArrOfTetramino.findIndex(item => item.letter === letter);
// 			fullCopyArrOfTetramino[i].amount = fullCopyArrOfTetramino[i].amount + 1
// 		});
// 		// sort array of letters from smaller amount to lager
// 		fullCopyArrOfTetramino.sort((a, b) => b.amount - a.amount)

// 		// find less used letters
// 		const arrOfSmallerAmountLetters = fullCopyArrOfTetramino.filter(item => item.amount === fullCopyArrOfTetramino[0].amount)

// 		// randomize letter from arr less used letters
// 		const randLetter = arrOfSmallerAmountLetters[Math.floor(Math.random() * arrOfSmallerAmountLetters.length)].letter
// 		const rand = Math.floor(Math.random() * tetramino.length)


// 		const piece = {
// 			matrix: tetramino[rand].shape,
// 			pos: { x: Math.round(widthOfStage / 2 - tetramino[rand].shape.length / 2), y: 0 },
// 		}

// 		return piece
// 	}

// 	return [randTetramino, resetPool]
// }

// export const randomTetromino = () => {
// 	const rand = Math.floor(Math.random() * tetramino.length)

// 	const mtrx = JSON.parse(JSON.stringify(tetramino[rand]))

// 	const piece = {
// 		matrix: mtrx.shape,
// 		pos: { x: Math.round(widthOfStage / 2 - mtrx.shape.length / 2), y: 0 },
// 	}
// 	return piece
// }


const letters = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

// Create 35 pool.
let initialPool = letters.concat(letters, letters, letters, letters);

// First piece special conditions
const firstLetter = ['I', 'J', 'L', 'T'][Math.floor(Math.random() * 4)];

let initialHistory = ['S', 'Z', 'S', firstLetter];

export const useTgm3Randomizer = () => {

	const [history, setHistory] = useState(initialHistory)
	const [pool, setPool] = useState(initialPool)
	const [order, setOrder] = useState([])


	const randTetramino = () => {
		let tempPool = pool.map(item => item)
		let tempOrder = order.map(item => item);
		let tempHistory = history.map(item => item);
		

		while (true) {
			let roll;
			let i;
			let letter;

			// Roll For letter
			for (roll = 0; roll < 6; ++roll) {
				i = Math.floor(Math.random() * 35);
				letter = pool[i];
				if (history.includes(letter) === false || roll === 5) {
					break;
				}
				if (order.length) {
					tempPool[i] = order[0];
					setPool(tempPool)
				}
			}

			// Update letters order
			if (order.includes(letter)) {
				tempOrder.splice(order.indexOf(letter), 1);
				setOrder(tempOrder)
			} else {
				let tempOrder = order;
				tempOrder.push(letter);
				setOrder(tempOrder)
			}

			tempPool[i] = order[0];
			setPool(tempPool)
			// Update history
			tempHistory.shift();
			tempHistory[3] = letter;
			setHistory(tempHistory)


			const index = tetramino.findIndex(item => item.letter === letter)

			const piece = {
				matrix: tetramino[index].shape,
				pos: { x: Math.round(widthOfStage / 2 - tetramino[index].shape.length / 2), y: 0 },
			}

			return piece;
		}
	}
	const resetPool =() => {
		setHistory(initialHistory)
		setPool(initialPool)
		setOrder([])
	}
	return [randTetramino, resetPool]
}