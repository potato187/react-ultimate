import { Route, Routes } from 'react-router-dom';

const SingleRoute = ({ id, Component, index = false, ...props }) => {
	if(index) {
		return <Route index key={id} element={<Component />} {...props} />;
	}
	return <Route key={id} element={<Component />} {...props} />;
}

const NestedRoutes = ({ id, Component, children = [], ...props }) => {
	if (!children.length) SingleRoute({id, Component, ...props});
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
