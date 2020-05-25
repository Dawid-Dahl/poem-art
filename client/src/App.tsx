import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "./store";
import FlashMessage from "./components/FlashMessage";
import {AuthenticatedApp} from "./components/authenticated-app/AuthenticatedApp";
import {UnauthenticatedApp} from "./components/unauthenticated-app/UnauthenticatedApp";
import AddCollectionPopup from "./components/AddCollectionPopup";
import {Overlay} from "./components/Overlay";
import {hidePopup} from "./actions/popupActions";
import {checkIfLoggedIn} from "./actions/loginActions";

const App: React.FC = () => {
	const isLoggedIn = useSelector((state: RootState) => state.loginReducer.isLoggedIn);
	const isShowingPopup = useSelector((state: RootState) => state.popupReducer.isShowingPopup);

	const dispatch = useDispatch();

	const handleClick = () => dispatch(hidePopup());

	useEffect(() => {
		dispatch(
			checkIfLoggedIn({
				xToken: localStorage.getItem("x-token"),
				xRefreshToken: localStorage.getItem("x-refresh-token"),
			})
		);
	}, []);

	return (
		<>
			<Overlay isShowingPopup={isShowingPopup} handleClick={handleClick} />
			<AddCollectionPopup />
			<FlashMessage />
			{isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</>
	);
};

export default App;
