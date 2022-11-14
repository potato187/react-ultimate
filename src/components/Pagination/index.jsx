import React from 'react';
import ReactPaginate from 'react-paginate';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import style from './style.module.scss';

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
			containerClassName={`pagination ${style['pagination']}`}
			activeClassName='active'
			pageClassName={`page-item ${style['page-item']}`}
			pageLinkClassName={`page-link ${style['page-link']}`}
			previousClassName={`page-item ${style['page-item']}`}
			previousLinkClassName={`page-link ${style['page-link']}`}
			nextClassName={`page-item ${style['page-item']}`}
			nextLinkClassName={`page-link ${style['page-link']}`}
			breakLabel='...'
			breakClassName={`page-item ${style['page-item']}`}
			breakLinkClassName={`page-link ${style['page-link']}`}
		/>
	);
};

export default Pagination;
