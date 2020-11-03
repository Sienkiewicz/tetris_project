import React, { memo } from 'react'
import Cell from './Cell';
import StyledStage from './Styled/StyledStage';
import styled from 'styled-components'

export const StyledStageWrapper = styled.div`
border: 2px solid #333;
height: 409px;
display: flex;
max-width: 50vw;
min-width: 50vw;
align-items: flex-end;
overflow: hidden;

@media only screen and (min-width: 800px) {
	height: 609px;
	  grid-template-rows: repeat(
    ${ props => props.height },
    calc((30vw - 15px) / ${ props => props.width })
  );
 max-width: 20vw;
 min-width: 20vw;
}  

`




const Stage = ({ stage }) => {
	return (
		<StyledStageWrapper>
			<StyledStage height={stage.length} width={stage[0].length}>
				{stage.map(row => row.map((cell, x) => <Cell key={x} fillCell={cell} />))}
			</StyledStage>
		</StyledStageWrapper>
	)
}

export default memo(Stage)
