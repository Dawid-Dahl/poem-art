import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {authService} from "./auth/authService";
import FlashMessage from "./components/FlashMessage";
import {AuthenticatedApp} from "./components/authenticated-app/AuthenticatedApp";
import {UnauthenticatedApp} from "./components/unauthenticated-app/UnauthenticatedApp";

const App: React.FC = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);

	useEffect(() => {
		authService.verifyXTokenClientSide(
			localStorage.getItem("x-token"),
			localStorage.getItem("x-refresh-token")
		);
	});

	return (
		<>
			<FlashMessage />
			{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</>
	);
};

export default App;
