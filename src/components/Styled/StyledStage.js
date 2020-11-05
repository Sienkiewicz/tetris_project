import styled from 'styled-components'

const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${ props => props.height },
    calc(160px / ${ props => props.width })
  );
  grid-template-columns: repeat(${ props => props.width }, 1fr);
  grid-gap: 1px;
  padding: 1px;
  width: 100%;
  /* max-width: 50vw;
  min-width: 50vw; */

@media only screen and (min-width: 800px) {
	  grid-template-rows: repeat(
    ${ props => props.height },
    calc(160px / ${ props => props.width })
  );
 max-width: 160px;
 min-width: 160px;
}  
@media only screen and (max-width: 320px) {
	  grid-template-rows: repeat(
    ${ props => props.height },
    calc(140px / ${ props => props.width })
  );
 max-width: 140px;
 min-width: 140px;
}  
`

export default StyledStage;