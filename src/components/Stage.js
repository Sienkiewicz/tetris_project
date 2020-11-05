import React, { memo } from 'react'
import Cell from './Cell';
import StyledStage from './Styled/StyledStage';
import styled from 'styled-components'

export const StyledStageWrapper = styled.div`
border: 2px solid #333;
height: 323px;
display: flex;
max-width: 160px;
min-width: 160px;
align-items: flex-end;
overflow: hidden;
grid-template-rows: repeat(
${ props => props.height },
calc(160px / ${ props => props.width })
);
max-width: 160px;
min-width: 160px;

@media only screen and (max-width: 320px) {
	height: 286px;
	  grid-template-rows: repeat(
    ${ props => props.height },
    calc(130px / ${ props => props.width })
  );
 max-width: 144px;
 min-width: 144px;
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
