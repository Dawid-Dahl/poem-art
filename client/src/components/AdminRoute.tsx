import React, {useEffect} from "react";
import {Route, RouteProps, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {flashMessage} from "../utils/utils";

interface Props extends RouteProps {
	component: any;
}

export const AdminRoute: React.FC<Props> = ({component: Component, ...rest}) => {
	const user = useSelector((state: RootState) => state.userReducer.user);
	const isAdmin = useSelector((state: RootState) => state.userReducer.user?.admin);

	useEffect(() => {
		!isAdmin && flashMessage("You're not an admin!");
	}, [isAdmin]);

	return (
		<Route
			{...rest}
			render={props =>
				user && isAdmin ? <Component {...props} /> : <Redirect to={{pathname: "/main"}} />
			}
		/>
	);
};
