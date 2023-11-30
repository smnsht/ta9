import { createAction, createReducer, on, props } from "@ngrx/store";
import { Item, Pager } from "../app.models";

export interface ItemsStore {
	items: Array<Item>;
	filter?: string,
	selectedItem?: Item;
};

const initialState: ItemsStore = {
	items: new Array<Item>(),	
} as const;

export const setItems = createAction('[Items] set items', props<{ items: Item[] }>());
export const editItem = createAction('[Items] edit item', props<{ item: Item }>());
export const appendItem = createAction('[Items] edit item', props<{ item: Item }>());
export const cancelEditItem = createAction('[Items] cancel edit item');
export const setFilter = createAction('[Items] set filter', props<{ filter: string }>());

export const itemsReducer = createReducer(
	initialState,
	on(setItems, (state, { items }) => {		
		return {
			...state,
			items
		}
	}),
	on(editItem, (state, { item }) => {
		return {
			...state,
			selectedItem: item
		}
	}),
	on(appendItem, (state, { item }) => {
		return {
			...state,
			items: state.items.concat(item) // TODO: sort
		}
	}),
	on(cancelEditItem, (state) => {
		return {
			...state,
			selectedItem: undefined
		}
	}),
	on(setFilter, (state, { filter }) => {
		return {
			...state,
			filter
		}
	})
);

export const selectItems = (itemsStore: ItemsStore, pager: Pager) => { 	
	const startFrom = pager.currentPage 
		? (pager.currentPage - 1) * pager.rowsPerPage
		: 0;

	const items = itemsStore.filter 
		? itemsStore.items.filter(item => item.name.includes(itemsStore.filter!)) 
		: itemsStore.items;
	
	return items.slice(startFrom, pager.rowsPerPage)
};
export const selectFilter = (state: ItemsStore) => state.filter;
export const selectSelectedItem = (state: ItemsStore) => state.selectedItem;