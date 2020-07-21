import React, {useEffect} from "react";
import styled from "styled-components";
import PoemSection from "./PoemSection";
import LikesSection from "./LikesSection";
import {useQuery} from "../../custom-hooks/useQuery";
import {useDispatch, useSelector} from "react-redux";
import {getPoem} from "../../actions/asyncPoemActions";
import {RootState} from "../../store";
import TopBar from "./TopBar";
import {selectPoem, renderPoems} from "../../actions/syncPoemAction";
import {ReduxArtPoem} from "../../types/types";
import {welcomePoem, poemNotFound, initPoem} from "../../utils/defaultPoems";
import CommentSection from "../comments/CommentSection";

type Props = {};

const FullscreenPicture: React.FC<Props> = () => {
	const dispatch = useDispatch();

	const query = useQuery();

	const artPoemId = Number(query.get("id"));

	const selectedArtPoem = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);
	const cachedPoems = useSelector((state: RootState) => state.asyncPoemReducer.cachedPoems);
	const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);

	const selectArtPoemFromCache = (
		cachedPoems: ReduxArtPoem[],
		id: ReduxArtPoem["id"]
	): ReduxArtPoem | undefined => cachedPoems.filter(poem => poem.id === id)[0];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(renderPoems(new Array(initPoem)));
	}, []);

	useEffect(() => {
		if (cachedPoems.length === 0 && artPoemId === -1) {
			dispatch(selectPoem(poemNotFound));
		} else if (cachedPoems.length === 0 && artPoemId === 0) {
			dispatch(selectPoem(initPoem));
		} else if (cachedPoems.length === 0 && artPoemId === 1) {
			dispatch(selectPoem(welcomePoem));
		} else {
			const artPoem = selectArtPoemFromCache(cachedPoems, artPoemId);

			if (artPoem) {
				dispatch(selectPoem(artPoem));
			} else {
				dispatch(getPoem(artPoemId));
			}
		}
	}, [cachedPoems]);

	return (
		<>
			<Wrapper>
				<StyledDiv imageUrl={selectedArtPoem.imageUrl ? selectedArtPoem.imageUrl : ""}>
					<TopBar
						title={isLoading ? "" : selectedArtPoem.title}
						buttonKind="white"
						backType="history"
					/>
					<Grid>
						<PoemSection
							poemUserId={selectedArtPoem.userId}
							poem={selectedArtPoem.content}
						/>
						<SidebarWrapper>
							<LikesSection
								likes={selectedArtPoem.likes ? selectedArtPoem.likes : 0}
							/>
							<CommentSection />
						</SidebarWrapper>
					</Grid>
				</StyledDiv>
			</Wrapper>
		</>
	);
};

export default FullscreenPicture;

const Wrapper = styled.div``;

type StyledDivProps = {
	imageUrl: string;
};

const StyledDiv = styled.div<StyledDivProps>`
	position: absolute;
	height: 70vh;
	width: 100%;
	background-image: ${props => `url(${props.imageUrl})`};
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	z-index: -1;

	@media only screen and (max-width: 800px) {
		background-size: cover;
		background-position: center;
		height: 50vh;
	}
`;

const Grid = styled.div`
	width: 60%;
	margin: 1em auto;
	justify-content: center;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1em 1em;
	grid-template-areas: "PoemSection Sidebar" "PoemSection Sidebar";

	@media only screen and (max-width: 1280px) {
		width: 70%;
	}

	@media only screen and (max-width: 800px) {
		width: 90%;

		p {
			padding: 1em;
		}
	}

	@media only screen and (max-width: 500px) {
		width: 85%;
		display: block;
	}
`;

const SidebarWrapper = styled.div`
	grid-area: Sidebar;
`;
