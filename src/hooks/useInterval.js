import { useEffect, useRef, useState } from 'react';

// export const useInterval = (callback, delay) => {
// 	const savedCallback = useRef();
// 	// Remember the latest callback.
// 	useEffect(() => {
// 		savedCallback.current = callback;
// 	}, [callback]);

// 	// Set up the interval.
// 	useEffect(() => {
// 		const tick = () => {
// 			savedCallback.current();
// 		}
// 		if (delay !== null) {
// 			const id = setInterval(tick, delay);
// 			return () => {
// 				clearInterval(id);
// 			};
// 		}
// 	}, [delay]);
// }

let count = 0
export const useAnimationFrame = delay => {
	const [isThrow, setIsThrow] = useState(false)
	// Use useRef for mutable variables that we want to persist
	// without triggering a re-render on their change
	const requestRef = useRef();
	const previousTimeRef = useRef();

	const animate = time => {
		if (delay !== null) {
			if (previousTimeRef.current != undefined) {
				const deltaTime = time - previousTimeRef.current;
				count += deltaTime

				if (count > delay) {
					if (isThrow === false) {
						setIsThrow(isThrow => !isThrow)
						count = 0
					}
				}
			}
			previousTimeRef.current = time;
			requestRef.current = requestAnimationFrame(animate);
		}
	}

	const toggleSetThrow = () => {
		setIsThrow(isThrow => !isThrow)
		count = 0
	}

	const stopUseAnimationRequest = () => {
		cancelAnimationFrame(requestRef.current);
		count = 0
	}
	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}, [delay]); // Make sure the effect runs only once

	return [stopUseAnimationRequest, isThrow, toggleSetThrow]
}