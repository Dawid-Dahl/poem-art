import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {RootState} from "../store";
import {deselectCollection} from "../actions/collectionActions";

export const useDeselectCollectionOnRouteChange = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const collectionsSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);

	useEffect(() => {
		const unlisten = history.listen(
			() => collectionsSelected && dispatch(deselectCollection())
		);
		return () => unlisten();
	});
};
