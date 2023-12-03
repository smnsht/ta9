import { Item, ItemsViewType, PagerImpl } from "../app.models";

export interface ItemsState {
	pager: PagerImpl;
	items: Array<Item>;
	filter: string;
	selectedItem?: Item;
	view: ItemsViewType;
}

export const initialState: ItemsState = {
	pager: new PagerImpl(), 
	items: new Array<Item>(),	
	filter: '',
	view: "list"
} as const;

export function getFilteredItems(items: Item[], filter?: string): Item[] {
	if(filter) {
		const _filter = filter.toLowerCase();
		return items.filter(i => i.name.toLowerCase().includes(_filter));
	}
	return items;
}

export function cloneFilterAware(state: ItemsState, items: Item[]): ItemsState {	
	const filteredItems = getFilteredItems(items, state.filter);

	return {
		...state,
		items: items,
		pager: new PagerImpl({
			totalRows: filteredItems.length,
			rowsPerPage: state.pager.rowsPerPage,			
			currentPage: state.pager.currentPage
		})
	}
}