import { Component } from '@angular/core';
import { FormBuilder } from 'ire-forms';

enum Operation {
  Rolliza = 'Rolliza Doyle',
  Aserrada = 'Aserrada',
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
  operationsList = Operation;
  currentOperation!: Operation;

  readonly options = FormBuilder.build({
    fields: [
      FormBuilder.select({
        name: 'op',
        label: 'Operation',
        options: [
          {
            label: Operation.Rolliza,
            value: Operation.Rolliza,
          },
          {
            label: Operation.Aserrada,
            value: Operation.Aserrada,
          },
        ],
        index: 0,
      }),
    ],
  });

  readonly op1 = FormBuilder.build({
    legend: 'Rolliza Doyle',
    // styles: css``,
    fields: [
      FormBuilder.numberInput({
        name: 'dap',
        label: 'DAP',
      }),
      FormBuilder.numberInput({
        name: 'lon',
        label: 'LON',
      }),
    ],
  });

  readonly op2 = FormBuilder.build({
    legend: 'Aserrada',
    fields: [
      FormBuilder.numberInput({
        name: 'e',
        label: 'E',
      }),
      FormBuilder.numberInput({
        name: 'a',
        label: 'A',
      }),
      FormBuilder.numberInput({
        name: 'l',
        label: 'L',
      }),
    ],
  });

  ngOnInit() {
    // this.currentOperation = this.options.value['op'];
    this.options.valueChanges.subscribe(({ op }) => {
      this.reset();
      this.currentOperation = op;
    });
  }

  ngAfterViewInit() {
    // this.form.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
  }

  async handleSubmit() {
    let value = 0;
    switch (this.currentOperation) {
      case Operation.Rolliza:
        const { dap, lon } = this.op1.value;
        value = (Math.pow(dap - 4, 2) / 16) * lon;
        break;
      case Operation.Aserrada:
        const { e, a, l } = this.op2.value;
        value = (e * a * l) / 12;
        break;
    }
    this.list.push({
      operation: this.currentOperation,
      value,
    });
    this.reset();
    this.options.get('arg1')?.focus();
  }

  reset() {
    // this.options.reset();
    // this.op1.reset();
    // this.op2.reset();
    // this.options.clean();
    // this.op1.clean();
    // this.op2.clean();
  }
}
