import styled from "styled-components";

const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0.1em;
	border-top: 1px var(--light-grey-color) solid;

	p {
		padding-right: 30px;
		width: 20%;
	}

	div {
		width: 70%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input {
		border: var(--light-grey-color) 2px solid;
		outline: none;

		&:focus {
			box-shadow: 0 0 0 2pt var(--main-btn-color);
		}
	}

	@media only screen and (max-width: 500px) {
		margin: 0em 1em;

		input {
			width: 50%;
		}

		textarea {
			width: 50%;
		}

		select {
			width: 90%;
		}
	}
`;

export default Row;
