import { createAction, createReducer, on, props } from "@ngrx/store";
import { Item, ItemsViewType, PagerImpl } from "../app.models";
import { getRandomUserName } from "../utils";
import { getFilteredItems, initialState, setItemsF } from "./items.state";

export const setItems = createAction('Set items', props<{ items: Item[] }>());
export const nextPageClick = createAction('Next Page Click');
export const prevPageClick = createAction('Prev Page Click');
export const setRowsPerPage = createAction('Set Rows per Page', props<{ rowsPerPage: number }>());
export const setFilter = createAction('Set filter', props<{ filter: string }>());
export const editItem = createAction('Edit Item', props<{ item: Item, override: boolean }>());
export const addNewItem = createAction('Add New Item');
export const cancelEditItem = createAction('Cancel Edit Item');
export const itemCreated = createAction('New Item Created', props<{ item: Item }>());
export const itemUpdated = createAction('Item Updated', props<{ item: Item }>());
export const setItemsView = createAction('Set Items View', props<{ view: ItemsViewType }>());


export const reducer = createReducer(
	initialState,
	on(setItems, (state, { items }) => setItemsF(state, items)),	
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
		const filteredItems = getFilteredItems(state.items, filter);
		
		return {
			...state,
			filter,
			pager: new PagerImpl({
				totalRows: filteredItems.length,				
				currentPage: state.pager.currentPage,
				rowsPerPage: state.pager.rowsPerPage
			})
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
				created_by: getRandomUserName()
			}
		}
	}),
	on(cancelEditItem, (state) => {
		return {
			...state,
			selectedItem: undefined
		}
	}),
	on(itemCreated, (state, { item }) => setItemsF(state, [...state.items, item])),	
	on(itemUpdated, (state, { item }) => {		
		const index = state.items.findIndex((i) => i.id == item.id);
		
		if(index < 0) throw new Error("can't find updated item by id!");
		
		let newItems = [...state.items];

		// replace item where it was
		newItems[index] = item;

		return setItemsF(state, newItems);
	}),	
	on(setItemsView, (state, { view }) => {
		return { ...state, view }
	})
);
