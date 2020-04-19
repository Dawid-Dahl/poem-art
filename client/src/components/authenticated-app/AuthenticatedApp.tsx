import React from "react";
import {Switch} from "react-router";
import {PrivateRoute} from "../PrivateRoute";
import {AdminRoute} from "../AdminRoute";
import Main from "../Main";
import Admin from "../Admin";

export const AuthenticatedApp = () => {
	return (
		<>
			<Switch>
				<PrivateRoute path="/main" component={Main} />
				<AdminRoute path="/admin" component={Admin} />
				<PrivateRoute path="/" component={Main} />
			</Switch>
			;
		</>
	);
};
