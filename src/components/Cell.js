import React from 'react'
import StyledCell from './Styled/StyledCell';


const Cell = ({fillCell}) => {
	
	return (

		<StyledCell cell={fillCell}>
			<div></div>
		</StyledCell>

	)
}

export default Cell
