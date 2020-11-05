import styled from 'styled-components'

const StyledButton = styled.div`
width: ${props => props.width};
height: ${props => props.width};
border-radius: calc(${props => props.width}/2);
background-color: pink;
border: 1px solid #012880;
	box-shadow:
							0 -0.25rem 1.5rem rgba(110, 15, 155, 1) inset,
							0 0.75rem 0.5rem rgba(255,255,255, 0.4) inset,
							0 0.25rem 0.5rem 0 rgba(180, 70, 207, 1) inset;

`

export default StyledButton;
