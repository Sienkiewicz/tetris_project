export const widthOfStage = 10;
export const heightOfStage = 23;

export const createStage = () =>
	Object.values(Array.from(Array(heightOfStage ), () => Array(widthOfStage).fill(0)))


export const collided = (bit, initialStage, { x: moveX, y: moveY }) => {
	const m = bit.matrix;
	const o = bit.pos;

	for (let y = 0; y < m.length; ++y) {
		for (let x = 0; x < m[y].length; ++x) {
			if (m[y][x] !== 0 &&
				(initialStage[y + o.y + moveY] &&
					initialStage[y + o.y + moveY][x + o.x + moveX]) !== 0
			) {
				return true;
			}
		}
	}
	return false
}