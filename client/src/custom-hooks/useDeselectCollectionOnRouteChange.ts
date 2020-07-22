import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {RootState} from "../store";
import {deselectCollection} from "../actions/collectionActions";
import {deselectPoem} from "../actions/syncPoemAction";
import {emptyRenderedComments, closeCommentSubmitSection} from "../actions/commentActions";

export const useDeselectionsOnRouteChange = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const collectionsSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);
	const poemSelected = useSelector((state: RootState) => state.syncPoemReducer.poemSelected);
	const renderedComments = useSelector(
		(state: RootState) => state.commentReducer.renderedComments
	);

	useEffect(() => {
		const unlisten = history.listen(
			() => collectionsSelected && dispatch(deselectCollection())
		);
		return () => unlisten();
	});

	useEffect(() => {
		if (poemSelected.id === 0) return;

		const unlisten = history.listen(() => poemSelected && dispatch(deselectPoem()));
		return () => unlisten();
	});

	useEffect(() => {
		if (renderedComments.length === 0) return;

		const unlisten = history.listen(
			() => (dispatch(emptyRenderedComments()), dispatch(closeCommentSubmitSection()))
		);
		return () => unlisten();
	});
};
