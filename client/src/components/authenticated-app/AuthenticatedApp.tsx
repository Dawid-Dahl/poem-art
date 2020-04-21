import React from "react";
import {Switch, Route} from "react-router";
import Main from "../Main";
import Fullscreen from "../fullscreen/Fullscreen";

export const AuthenticatedApp = () => {
	return (
		<>
			<Switch>
				<Route path="/main" component={Main} />
				<Route path="/fullscreen" component={Fullscreen} />
				<Route path="/" component={Main} />
			</Switch>
		</>
	);
};
