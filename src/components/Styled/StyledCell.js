import styled from 'styled-components'

const StyledCell = styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color: rgba(158, 173, 134, 0.2);
border: 1px solid rgba(${props => (props.cell === 0 ? '158, 173, 134, 0.3' : '40, 40, 40, 0.7')});
& div {
	width: 70%;
	height: 70%;
	background-color: rgba(${props => (props.cell === 0 ? '158, 173, 134, 0.3' : '40, 40, 40, 0.7')});
	/* border: 1px solid rgba(${props => (props.cell === 0 ? '40, 40, 40, 0.2' : '40, 40, 40')}); */
}
`

export default StyledCell;