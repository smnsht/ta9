import { Item, ItemsViewType, PagerImpl } from "../app.models";

export interface ItemsState {
	pager: PagerImpl;
	items: Array<Item>;
	filter: string;
	selectedItem?: Item;
	view: ItemsViewType;
	loading: boolean;
	error: string;
}

export const initialState: ItemsState = {
	pager: new PagerImpl(), 
	items: new Array<Item>(),	
	filter: '',
	view: "list",
	loading: false,
	error: ''
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
		loading: false,
		error: '',
		pager: new PagerImpl({
			totalRows: filteredItems.length,
			rowsPerPage: state.pager.rowsPerPage,			
			currentPage: state.pager.currentPage
		})
	}
}