import { Component } from '@angular/core';
import { FormBuilder } from 'ire-forms';

interface Item {
  value: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  list: Item[] = [];

  readonly form = FormBuilder.build({
    fields: [
      FormBuilder.numberInput({
        name: 'arg1',
        label: 'Argument 1',
      }),
      FormBuilder.numberInput({
        name: 'arg2',
        label: 'Argument 2',
      }),
    ],
  });

  ngAfterViewInit() {
    // this.form.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
  }

  handleSubmit() {
    const { arg1, arg2 } = this.form.value;
    this.list.push({
      // value: Number.parseFloat(arg1) + Number.parseFloat(arg2),
      value: arg1 + arg2,
    });
    this.form.clean();
    this.form.get('arg1')?.focus();
  }
}
