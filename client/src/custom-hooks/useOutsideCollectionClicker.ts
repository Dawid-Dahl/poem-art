import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import {renderSocialFeed} from "../actions/syncPoemAction";

export const useOutsideCollectionClicker = () => {
	const collectionSelected = useSelector(
		(state: RootState) => state.collectionReducer.collectionSelected
	);
	const cachedPoems = useSelector((state: RootState) => state.asyncPoemReducer.cachedPoems);
	const dispatch = useDispatch();

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (collectionSelected) {
				const targetId = e.target.getAttribute("data-collection-id");

				if (targetId === collectionSelected.id.toString()) {
					return;
				}

				dispatch(renderSocialFeed(cachedPoems));
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [collectionSelected]);
};
