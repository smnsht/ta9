import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Item, PagerImpl } from "./app.models";

export interface ItemsState {
	pager: PagerImpl;
	items: Array<Item>;
	filter: string,
	selectedItem?: Item;
}

const initialState: ItemsState = {
	pager: new PagerImpl(), 
	items: new Array<Item>(),	
	filter: ''
} as const;


//export const setPager = createAction('Set pager', props<{ pager: Pager}>());
export const setItems2 = createAction('Set items', props<{ items: Item[] }>());
export const nextPageClick2 = createAction('Next Page Click');
export const prevPageClick2 = createAction('Prev Page Click');
export const setRowsPerPage2 = createAction('[Pager] Rows per Page', props<{ rowsPerPage: number }>());

export const reducer = createReducer(
	initialState,
	on(setItems2, (state, { items }) => {		
		return {
			...state,
			items: items,
			pager: new PagerImpl({
				totalRows: <number>items.length,
				rowsPerPage: state.pager.rowsPerPage,			
				currentPage: state.pager.currentPage
			})
		}
	}),
	on(nextPageClick2, (state) => {		
		return {
			...state,
			pager: new PagerImpl({
				totalRows: state.pager.totalRows,
				rowsPerPage: state.pager.rowsPerPage,			
				currentPage: state.pager.currentPage + 1
			})
		}
	}),
	on(prevPageClick2, (state) => {		
		return {
			...state,
			pager: new PagerImpl({
				totalRows: state.pager.totalRows,
				rowsPerPage: state.pager.rowsPerPage,			
				currentPage: state.pager.currentPage - 1
			})
		}
	}),
	on(setRowsPerPage2, (state, { rowsPerPage }) => {		
		return {
			...state,
			pager: new PagerImpl({
				totalRows: state.pager.totalRows,				
				currentPage: state.pager.currentPage,
				rowsPerPage: rowsPerPage,			
			})
		}
	})
);

const getItemsState2 = createFeatureSelector<ItemsState>("items2");

export const itemsSelector2 = createSelector(getItemsState2, s => {
	const { currentPage, rowsPerPage } = s.pager;
	const startFrom = currentPage > 0
		 		? (currentPage - 1) * rowsPerPage
		 		: 0;
		
	if(s.filter) {
		const _filter = s.filter!.toLowerCase();
		return s.items.filter(i => i.name.toLowerCase().includes(_filter)).slice(startFrom, rowsPerPage);
	}
				
	return s.items.slice(startFrom, rowsPerPage);
});
export const pagerSelector = createSelector(getItemsState2, s => s.pager);
export const selectedItemSelector = createSelector(getItemsState2, s => s.selectedItem);