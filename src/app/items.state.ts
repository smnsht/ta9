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


export const setItems = createAction('Set items', props<{ items: Item[] }>());
export const nextPageClick = createAction('Next Page Click');
export const prevPageClick = createAction('Prev Page Click');
export const setRowsPerPage = createAction('Set Rows per Page', props<{ rowsPerPage: number }>());
export const setFilter = createAction('Set filter', props<{ filter: string }>());

export const editItem = createAction('Edit Item', props<{ item: Item, override: boolean }>());
export const addNewItem = createAction('Add New Item');
export const cancelEditItem = createAction('Cancel Edit Item');

export const reducer = createReducer(
	initialState,
	on(setItems, (state, { items }) => {		
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
	on(nextPageClick, (state) => {		
		return {
			...state,
			pager: new PagerImpl({
				totalRows: state.pager.totalRows,
				rowsPerPage: state.pager.rowsPerPage,			
				currentPage: state.pager.currentPage + 1
			})
		}
	}),
	on(prevPageClick, (state) => {		
		return {
			...state,
			pager: new PagerImpl({
				totalRows: state.pager.totalRows,
				rowsPerPage: state.pager.rowsPerPage,			
				currentPage: state.pager.currentPage - 1
			})
		}
	}),
	on(setRowsPerPage, (state, { rowsPerPage }) => {		
		return {
			...state,
			pager: new PagerImpl({
				totalRows: state.pager.totalRows,				
				currentPage: state.pager.currentPage,
				rowsPerPage: rowsPerPage,			
			})
		}
	}),
	on(setFilter, (state, { filter }) => {
		return {
			...state,
			filter
		}
	}),
	on(editItem, (state, { item, override }) => {
		// if any item already selected and flag 'override' not set, the state not altered
		if(!override && state.selectedItem) {
			return state;
		}

		return {
			...state,
			selectedItem: item
		}
	}),
	on(addNewItem, (state) => {
		return {
			...state,
			selectedItem: {
				id: '',
				name: '',
				color: '#000000',
				created_at: new Date(),
				updated_at: new Date(),
				created_by: 'me'
			}
		}
	}),
	on(cancelEditItem, (state) => {
		return {
			...state,
			selectedItem: undefined
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
				
	return s.items.slice(startFrom, startFrom + rowsPerPage);
});
export const pagerSelector = createSelector(getItemsState2, s => s.pager);
export const selectedItemSelector = createSelector(getItemsState2, s => s.selectedItem);
export const filterSelector = createSelector(getItemsState2, s => s.filter);