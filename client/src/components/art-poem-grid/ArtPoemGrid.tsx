import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import ArtPoem from "./ArtPoem";
import {useSyncReduxState} from "../../custom-hooks/useSyncReduxState";

export const ArtPoemGrid = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);
	const poems = useSelector((state: RootState) => state.poemReducer.poems);

	if (!user) return;

	useSyncReduxState(user, "poem");

	return (
		<>
			<Wrapper>
				<Grid>
					{poems?.map(({artpoem_id, title, content, imageUrl, createdAt, likes}) => (
						<ArtPoem
							key={artpoem_id}
							artpoem_id={artpoem_id}
							title={title}
							imageUrl={imageUrl}
							content={content}
							createdAt={createdAt}
							likes={likes}
						/>
					))}
				</Grid>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Grid = styled.div`
	height: 500px;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 2em;
	align-items: center;
	justify-content: center;
`;
