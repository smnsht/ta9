import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemsState, getFilteredItems } from "./items.state";

const getItemsState = createFeatureSelector<ItemsState>("items");

export const itemsSelector = createSelector(getItemsState, s => {
    const { currentPage, rowsPerPage } = s.pager;
    const startFrom = currentPage > 0
                 ? (currentPage - 1) * rowsPerPage
                 : 0;
            
    return getFilteredItems(s.items, s.filter)
        .slice(startFrom, startFrom + rowsPerPage);
});
export const pagerSelector = createSelector(getItemsState, s => s.pager);
export const selectedItemSelector = createSelector(getItemsState, s => s.selectedItem);
export const filterSelector = createSelector(getItemsState, s => s.filter);
export const itemsViewSelector = createSelector(getItemsState, s => s.view);