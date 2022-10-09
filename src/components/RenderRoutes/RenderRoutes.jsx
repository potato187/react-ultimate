import React, { Children, Component } from 'react';
import { Route, Routes } from 'react-router-dom';

const NestedRoutes = ({ id, Component, children = [], ...props }) => {
	if (!children.length) return <Route key={id} element={<Component />} {...props} />;
	return (
		<Route key={id} element={<Component />} {...props}>
			{children.map(NestedRoutes)}
		</Route>
	);
};

const RenderRoutes = ({ routes = [] }) => {
	if (!routes.length) return <></>;
	return <Routes>{routes.map(NestedRoutes)}</Routes>;
};

export default RenderRoutes;
