import { Component } from '@angular/core';
import { FormBuilder } from 'ire-forms';

enum Operation {
  Sum = 'sum',
}

interface Item {
  operation: Operation;
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
      FormBuilder.select({
        name: 'op',
        label: 'Operation',
        options: [
          {
            label: 'Sum',
            value: Operation.Sum,
          },
        ],
        index: 0,
      }),
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
    const { op, arg1, arg2 } = this.form.value;
    this.list.push({
      // value: Number.parseFloat(arg1) + Number.parseFloat(arg2),
      operation: op,
      value: arg1 + arg2,
    });
    this.form.reset();
    this.form.get('arg1')?.focus();
  }
}
