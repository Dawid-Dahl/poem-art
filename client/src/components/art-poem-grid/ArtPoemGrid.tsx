import React, {useEffect} from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store";
import ArtPoem from "./ArtPoem";
import {getAllPoems} from "../../actions/poemActions";
import Loading from "../Loading";
import {getAllCollections} from "../../actions/collectionActions";

const ArtPoemGrid: React.FC = () => {
	const poems = useSelector((state: RootState) => state.poemReducer.poems);
	const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllPoems());
		dispatch(getAllCollections());
	}, []);

	return (
		<>
			<Wrapper>
				<Grid>
					{isLoading ? (
						<Loading />
					) : poems.length === 0 ? (
						<h2>Couldn't find any Art Poems...</h2>
					) : (
						poems?.map(({id, title, content, imageUrl, createdAt, likes}) => (
							<ArtPoem
								key={id}
								id={id}
								title={title}
								imageUrl={imageUrl}
								content={content}
								createdAt={createdAt}
								likes={likes}
							/>
						))
					)}
				</Grid>
			</Wrapper>
		</>
	);
};

export default ArtPoemGrid;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--light-grey-color);
	border-radius: var(--border-radius);
	width: 90%;
	margin: 0 0 3em 0;
`;

const Grid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 2em;
	align-items: center;
	justify-content: center;
	margin: 1em 2em;

	h2 {
		color: var(--main-grey-color);
		text-align: center;
	}
`;
