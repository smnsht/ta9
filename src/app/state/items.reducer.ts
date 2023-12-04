import { createAction, createReducer, on, props } from "@ngrx/store";
import { Item, ItemsViewType, PagerImpl } from "../app.models";
import { getRandomUserName } from "../utils";
import { initialState, cloneFilterAware } from "./items.state";

export const setItems = createAction('Set items', props<{ items: Item[] }>());
export const nextPageClick = createAction('Next Page Click');
export const prevPageClick = createAction('Prev Page Click');
export const setRowsPerPage = createAction('Set Rows per Page', props<{ rowsPerPage: number }>());
export const setFilter = createAction('Set filter', props<{ filter: string }>());
export const editItem = createAction('Edit Item', props<{ item: Item }>());
export const addNewItem = createAction('Add New Item');
export const cancelEditItem = createAction('Cancel Edit Item');
export const itemCreated = createAction('New Item Created', props<{ item: Item }>());
export const itemUpdated = createAction('Item Updated', props<{ item: Item }>());
export const setItemsView = createAction('Set Items View', props<{ view: ItemsViewType }>());
export const loadItemsRequest = createAction('[Items API] Load Items Request');
export const loadItemsError = createAction('[Items API] Load Items Error', props<{ error: string }>());
export const postItem = createAction('[Items API] Save New Item', props<{ item: Item }>());
export const putItem = createAction('[Items API] Update Item', props<{ item: Item }>());
export const saveItemError = createAction('[Items API] Save Error', props<{ error: string }>());

export const reducer = createReducer(
	initialState,	
	on(setItems, (state, { items }) => cloneFilterAware(state, items)),	
	on(setFilter, (state, { filter }) => cloneFilterAware({ ...state, filter }, state.items)),	
	on(itemCreated, (state, { item }) => cloneFilterAware(state, [...state.items, item])),	
	on(loadItemsRequest, (state) => {
		return {
			...state,
			error: '',
			loading: true
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
	
	on(editItem, (state, { item }) => {		
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
	on(itemUpdated, (state, { item }) => {				
		return { 
			...state, 
			loading: false,
			error: '',
			// replace item at index where it was
			items: state.items.map(i => item.id === i.id ? item : i)			
		}
	}),	
	on(setItemsView, (state, { view }) => {
		return { 
			...state, 
			view 
		}
	}),
	on(postItem, putItem, (state) => {
		return {
			...state,
			error: '',
			loading: true
		}
	}),
	on(loadItemsError, saveItemError, (state, { error }) => {
		return {
			...state,			
			loading: false,
			error
		}
	})	
);
