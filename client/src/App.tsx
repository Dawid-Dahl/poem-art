import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import FlashMessage from "./components/FlashMessage";
import {AuthenticatedApp} from "./components/authenticated-app/AuthenticatedApp";
import {UnauthenticatedApp} from "./components/unauthenticated-app/UnauthenticatedApp";
import {useTokensToVerifyAndRefreshIfNeeded} from "./custom-hooks/useTokensToVerifyAuth";
import {authService} from "./auth/authService";
import {saveUserInStoreWithXToken} from "./utils/utils";

const App: React.FC = () => {
	const user = useSelector((state: RootState) => state.userReducer.user);

	const xToken = localStorage.getItem("x-token");
	const xRefreshToken = localStorage.getItem("x-refresh-token");

	(async () => {
		try {
			const validOrRefreshedXToken = await useTokensToVerifyAndRefreshIfNeeded(
				xToken,
				xRefreshToken
			);

			validOrRefreshedXToken
				? !user && saveUserInStoreWithXToken(validOrRefreshedXToken)
				: authService.logout("You're not allowed to access that page. Please log in!");
		} catch (e) {
			authService.logout("You're not allowed to access that page. Please log in!");
		}
	})();

	return (
		<>
			<FlashMessage />
			{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
		</>
	);
};

export default App;
