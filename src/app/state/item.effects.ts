import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ItemsService } from '../service/items.service';

import {
	itemCreated,
	itemUpdated,
	loadItemsError,
	loadItemsRequest,
	postItem,
	putItem,
	saveItemError,
	setItems
} from './items.reducer';

@Injectable()
export class ItemEffects {

	constructor(
		private actions$: Actions,
		private itemsService: ItemsService
	) {
	}

	loadItems$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadItemsRequest),
			mergeMap(() => this.itemsService.get().pipe(
				map(items => setItems({ items })),
				catchError((e) => {
					const action = loadItemsError({ error: e.message });
					return of(action);
				})
			))
		)
	);

	createItem$ = createEffect(() => this.actions$.pipe(
		ofType(postItem),
		concatMap((action) => this.itemsService.create({ ...action.item }).pipe(
			map(item => itemCreated({ item })),
			catchError((e) => {
				const action = saveItemError({ error: e.message });
				return of(action);
			})
		))
	));

	updateItem$ = createEffect(() => this.actions$.pipe(
		ofType(putItem),
		concatMap((action) => this.itemsService.update(action.item).pipe(
			map(item => itemUpdated({ item })),
			catchError((e) => {
				const action = saveItemError({ error: e.message });
				return of(action);
			})
		))
	));
}