import { CommonModule } from '@angular/common';
import { Item } from '../app.models';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';


@Component({
  selector: 'app-noir-items-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './noir-items-form.component.html',
  styleUrl: './noir-items-form.component.css'
})
export class NoirItemsFormComponent implements OnInit {

  @Input()
  item?: Item;

  @Output()
  saveClicked = new EventEmitter<Item>();

  @Output()
  cancelEditClick = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern("^[^<>\x22\x27\x60]+$")
    ]),
    color: new FormControl('', [Validators.required])
  });

  get name(): FormControl {
    return this.form.controls.name;
  }

  get color(): FormControl {
    return this.form.controls.color;
  }

  ngOnInit(): void {
    this.form.setValue({
      name: this.item?.name ?? null,
      color: this.item?.color ?? null
    })
  }

  closeClick(): void {
    this.cancelEditClick.emit();
  }

  saveClick(): void {
    const item = { ...this.item, ...this.form.value };
    this.saveClicked.emit(<Item>item);

    this.closeClick();
  }
}
