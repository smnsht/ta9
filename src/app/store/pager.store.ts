import { createAction, createReducer, on, props } from '@ngrx/store';
import { Pager } from '../app.models';

export const RowsPerPageTypeValues = [4, 5, 10] as const;
export type RowsPerPageType = typeof RowsPerPageTypeValues[number];

export const initialState: Pager = {
	totalRows: 0,
	rowsPerPage: 5,
	currentPage: 0
} as const;

export const setTotalRows = createAction('[Pager] Total Rows', props<{ totalRows: number }>());
export const setRowsPerPage = createAction('[Pager] Rows per Page', props<{ rowsPerPage: RowsPerPageType }>());
export const setCurrentPage = createAction('[Pager] Current Page', props<{ currentPage: number }>());
export const nextPageClick = createAction('[Pager] Next Page');
export const prevPageClick = createAction('[Pager] Prev Page');

export const pagerReducer = createReducer(
	initialState,
	on(setTotalRows, (state, { totalRows }) => {
		return {
			...state,
			totalRows
		}		
	}),
	on(setRowsPerPage, (state, { rowsPerPage }) => {		
		return {
			...state,
			rowsPerPage
		}
	}),
	on(setCurrentPage, (state, { currentPage }) => {		
		return {
			...state,
			currentPage
		}
	}),
	on(nextPageClick, (state) => {		
		return {
			...state,
			currentPage: state.currentPage + 1
		}
	}),
	on(prevPageClick, (state) => {		
		return {
			...state,
			currentPage: state.currentPage - 1
		}
	})
);
