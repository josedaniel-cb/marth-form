import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from 'ire-forms';
import localStorageService from './local-storage';

enum Operation {
  Rolliza = 'Rolliza Doyle',
  Aserrada = 'Aserrada',
}

interface Item {
  operation: Operation;
  valuePt: any;
  valueM3: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnChanges {
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
    const list = localStorageService.getObject<Item[]>('list');
    if (list !== null) {
      this.list = list;
    }

    // this.currentOperation = this.options.value['op'];
    this.options.valueChanges.subscribe(({ op }) => {
      this.currentOperation = op;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngAfterViewInit() {
    // this.form.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
  }

  async handleSubmit() {
    let valuePt = 0;
    let valueM3 = 0;
    switch (this.currentOperation) {
      case Operation.Rolliza:
        const { dap, lon } = this.op1.value;
        valuePt = (Math.pow(dap - 4, 2) / 16) * lon;
        valueM3 = valuePt / 220;
        break;
      case Operation.Aserrada:
        const { e, a, l } = this.op2.value;
        valuePt = (e * a * l) / 12;
        valueM3 = valuePt / 424;
        break;
    }
    this.list.push({
      operation: this.currentOperation,
      valuePt,
      valueM3,
    });
    localStorageService.set('list', this.list);
    this.reset();
    this.options.get('arg1')?.focus();
  }

  clear() {
    this.list = [];
    localStorageService.set('list', this.list);
  }

  reset() {
    this.options.reset();
    this.op1.reset();
    this.op2.reset();
  }
}
