import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import './style.scss';

const Pagination = ({
	pageRangeDisplayed = 4,
	pageOffset = 1,
	pageCount = 1,
	renderOnZeroPageCount = null,
	onPageChange = null,
}) => {
	return (
		<ReactPaginate
			nextLabel={<GrFormNext size='1.5em' />}
			onPageChange={onPageChange}
			pageRangeDisplayed={pageRangeDisplayed}
			pageCount={pageCount}
			forcePage={pageOffset}
			previousLabel={<GrFormPrevious size='1.5em' />}
			renderOnZeroPageCount={renderOnZeroPageCount}
			containerClassName='pagination'
			activeClassName='active'
			pageClassName='page-item'
			pageLinkClassName='page-link'
			previousClassName='page-item'
			previousLinkClassName='page-link'
			nextClassName='page-item'
			nextLinkClassName='page-link'
			breakLabel='...'
			breakClassName='page-item'
			breakLinkClassName='page-link'
		/>
	);
};

export default Pagination;
