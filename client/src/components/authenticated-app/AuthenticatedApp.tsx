import React from "react";
import {Switch, Route} from "react-router";
import Main from "../Main";
import {Navbar} from "../Navbar";

export const AuthenticatedApp = () => {
	return (
		<>
			<Switch>
				<Route path="/main" component={Main} />
				<Route path="/" component={Main} />
			</Switch>
		</>
	);
};
