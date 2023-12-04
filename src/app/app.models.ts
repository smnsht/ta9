export interface Item {
	id: string;
	name: string;
	color: string;
	created_at: Date;
	updated_at: Date;
	created_by: string;
}


export interface Pager {
	totalRows: number;
	rowsPerPage: number;
	currentPage: number;
	lastPage: number;
}

export type ItemsViewType = 'list' | 'tiles';
export type ItemType = Item | null | undefined;  

export class PagerImpl implements Pager {	
	private _totalRows = 0;
	private _rowsPerPage = 5;
	private _currentPage = 1;
	private _lastPage = 1;

	get totalRows(): number {
		return this._totalRows;
	}

	set totalRows(val: number) {
		if(val < 0) throw new RangeError("totalRows number can't be negative");
		this._totalRows = val;
	}

	get rowsPerPage(): number {
		return this._rowsPerPage;
	}

	set rowsPerPage(val: number) {
		if(val < 1) throw new RangeError("rowsPerPage must be at least 1");
		this._rowsPerPage = val;
	}
	
	get currentPage(): number {		
		return this._currentPage;
	}

	set currentPage(val: number) {
		if(val < 1) throw new RangeError("currentPage must be at 1 or greater");
		this._currentPage = val;
	}

	get lastPage(): number {
		return this._lastPage;
	}

	set lastPage(val: number) {
		if(val < 1) throw new RangeError("lastPage must be at 1 or greater");
		this._lastPage = val;
	}

	constructor(defaults = {
		totalRows: 0,
		rowsPerPage: 5,
		currentPage: 1
	}) {		
		this.totalRows = defaults.totalRows;
		this.rowsPerPage = defaults.rowsPerPage;
		this.currentPage = defaults.currentPage;
		this.lastPage = 1;
			
		this.normalize();
	}

	normalize(): void {
		this.lastPage = this._totalRows > 0 
			? Math.ceil(this._totalRows / this._rowsPerPage)
			: 1;

		if(this._currentPage > this._lastPage) {
			this.currentPage = this._lastPage;
		}
	}
}

