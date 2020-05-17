import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "./store";
import FlashMessage from "./components/FlashMessage";
import {AuthenticatedApp} from "./components/authenticated-app/AuthenticatedApp";
import {UnauthenticatedApp} from "./components/unauthenticated-app/UnauthenticatedApp";
import {useTokensToRefreshIfNeeded} from "./custom-hooks/useTokensToRefreshIfNeeded";
import {authService} from "./auth/authService";
import {saveUserInStoreWithXToken, syncReduxCollectionsStateWithDb} from "./utils/utils";
import AddCollectionPopup from "./components/AddCollectionPopup";
import {Overlay} from "./components/Overlay";
import {hidePopup} from "./actions/popupActions";

const App: React.FC = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);
	const collections = useSelector((state: RootState) => state.collectionReducer.collections);
	const isShowingPopup = useSelector((state: RootState) => state.popupReducer.isShowingPopup);

	const dispatch = useDispatch();

	const handleClick = () => dispatch(hidePopup());

	const xToken = localStorage.getItem("x-token");
	const xRefreshToken = localStorage.getItem("x-refresh-token");

	useEffect(() => {
		if (!user) return;
		if (collections?.length === 0) syncReduxCollectionsStateWithDb(user);
		console.log("INSIDE USE EFFECT");
	});

	(async () => {
		try {
			const validOrRefreshedXToken = await useTokensToRefreshIfNeeded(xToken, xRefreshToken);

			validOrRefreshedXToken
				? (authService.setXToken(validOrRefreshedXToken),
				  !user && saveUserInStoreWithXToken(validOrRefreshedXToken))
				: authService.logout("You're not allowed to access that page. Please log in!");
		} catch (e) {
			authService.logout("You're not allowed to access that page. Please log in!");
		}
	})();

	return (
		<>
			<Overlay isShowingPopup={isShowingPopup} handleClick={handleClick} />
			<AddCollectionPopup />
			<FlashMessage />
			{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</>
	);
};

export default App;
