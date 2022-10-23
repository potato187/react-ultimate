import React, { useEffect, useMemo } from 'react';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
const useAsyncFilters = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const params = queryString.parse(location.search);
	const queryParams = useMemo(() => {
		return {
			...params,
			page: +params.page || 1,
			limit: +params.limit || 8,
		};
	}, [location.search]);

	const setQueryParams = (queryParams) => {
		navigate(
			queryString.stringifyUrl({
				url: location.pathname,
				query: { ...queryParams },
			}),
			{ replace: true }
		);
	};

	useEffect(() => {
		setQueryParams(queryParams);
	}, []);

	return { queryParams, setQueryParams, navigate, location };
};

export default useAsyncFilters;
