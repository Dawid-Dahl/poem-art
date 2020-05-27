import React, {useEffect} from "react";
import {Switch, Route} from "react-router";
import Main from "../Main";
import Fullscreen from "../fullscreen/Fullscreen";
import Upload from "../upload/Upload";
import Profile from "../profile/Profile";
import {useDeselectCollectionOnRouteChange} from "../../custom-hooks/useDeselectCollectionOnRouteChange";

export const AuthenticatedApp = () => {
	useDeselectCollectionOnRouteChange();

	return (
		<>
			<Switch>
				<Route path="/main" component={Main} />
				<Route path="/fullscreen" component={Fullscreen} />
				<Route path="/upload" component={Upload} />
				<Route path="/profile" component={Profile} />
				<Route path="/" component={Main} />
			</Switch>
		</>
	);
};
