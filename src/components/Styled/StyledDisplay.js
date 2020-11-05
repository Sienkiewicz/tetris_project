import styled from 'styled-components'

const StyledDisplay = styled.div`
border: 1px solid red;
display: flex;
width: 300px;

/* align-items: flex-end; */
/* height: 300px; */
background-color: rgba(158, 173, 134, 0.2);
padding: 5px;
/* margin: 30px; */


& .styledDisplay__container {
	/* width: 100%; */
}
`

export default StyledDisplay;