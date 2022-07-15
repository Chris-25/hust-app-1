import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './constants/router';
import Auth from './pages/Auth';

export default function Router() {
	const profile = JSON.parse(localStorage.getItem('profile'));

	return (
		<Switch>
			{PUBLIC_ROUTES.map(({ path, exact, component }) => (
				<Route key={path} path={path} exact={exact} component={component} />
			))}

			<Route
				path="/auth"
				exact
				component={() => (!profile ? <Auth /> : <Redirect to="/posts" />)}
			/>

			{PRIVATE_ROUTES.map(({ path, exact, component }) => (
				<Route key={path} path={path} exact={exact} component={component} />
			))}
		</Switch>
	);
}
