export interface Item {
	id: string;
	name: string;
	color: string;
	created_at: Date;
	updated_at: Date;
	created_by: String;
}

export type ItemEditDTO = Exclude<Item, 'created_at' | 'created_at' | 'created_by'>;