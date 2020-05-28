import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {RootState} from "../store";
import {deselectCollection} from "../actions/collectionActions";
import {deselectPoem} from "../actions/poemActions";

export const useDeselectCollectionOnRouteChange = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const collectionsSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);
	const poemSelected = useSelector((state: RootState) => state.poemReducer.poemSelected);

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
};
