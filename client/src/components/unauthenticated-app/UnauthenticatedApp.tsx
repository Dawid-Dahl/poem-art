import React from "react";
import {Switch, Route} from "react-router";
import Registration from "../Registration";
import Login from "../Login";

export const UnauthenticatedApp = () => {
	return (
		<>
			<Switch>
				<Route path="/register" component={Registration} />
				<Route path="/login" component={Login} />
				<Route path="/" component={Login} />
			</Switch>
			;
		</>
	);
};
