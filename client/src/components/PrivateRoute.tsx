import React from "react";
import {Route, RouteProps, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface Props extends RouteProps {
	component: any;
}

export const PrivateRoute: React.FC<Props> = ({component: Component, ...rest}) => {
	const user = useSelector((state: RootState) => state.userReducer.user);

	return (
		<Route
			{...rest}
			render={props =>
				user ? <Component {...props} /> : <Redirect to={{pathname: "/login"}} />
			}
		/>
	);
};
