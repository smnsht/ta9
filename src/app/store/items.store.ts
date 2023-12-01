import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Item } from "../app.models";
import { currentPageSelector, rowsPerPageSelector } from "./pager.store";

export interface ItemsStore {
	items: Array<Item>;
	filter: string,
	selectedItem?: Item;
};

const initialState: ItemsStore = {
	items: new Array<Item>(),	
	filter: ''
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

// export const selectItems = (itemsStore: ItemsStore, pager: Pager) => { 	
// 	const startFrom = pager.currentPage 
// 		? (pager.currentPage - 1) * pager.rowsPerPage
// 		: 0;

// 	const items = itemsStore.filter 
// 		? itemsStore.items.filter(item => item.name.includes(itemsStore.filter!)) 
// 		: itemsStore.items;
	
// 	return items.slice(startFrom, pager.rowsPerPage)
// };

const getItemsStore = createFeatureSelector<ItemsStore>("items");

export const filterSelector = createSelector(getItemsStore, s => s.filter);
export const selectedItemSelector = createSelector(getItemsStore, s => s.selectedItem);
export const itemsSelector = createSelector(
	getItemsStore, 
	currentPageSelector, 
	rowsPerPageSelector,
	({ items, filter }, currentPage, rowsPerPage) => {
		const startFrom = currentPage > 0
		 		? (currentPage - 1) * rowsPerPage
		 		: 0;
			
		if(filter) {
			const _filter = filter!.toLowerCase();
			return items.filter(i => i.name.toLowerCase().includes(_filter)).slice(startFrom, rowsPerPage);
		}
		
		return items.slice(startFrom, rowsPerPage);
	}
);
