import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [SideNavComponent, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  todoForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number}[] = [
    {month: 'January', expenseAmount: 1500},
    {month: 'February', expenseAmount: 2000},
    {month: 'March', expenseAmount: 1800},
  ]
  monthSelected : boolean = false;
  januaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1000},
    { expenseType: 'Light Bills', expenseAmount: 500 },
  ];
  februaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1200 },
    { expenseType: 'Light Bills', expenseAmount: 300 },
  ];
  marchExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 5200 },
    { expenseType: 'Essentials', expenseAmount: 1200 },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleDateString('default', { month: 'long' });
  }

  ngOnInit() {
    // fb = form builder, must import before use
    this.todoForm = this.fb.group({
      month: ['', [Validators.required]],
      expenseType: ['', [Validators.required]],
      expenseAmount: ['', [Validators.required]],
    })
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpense();
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;
    for (const expense of this.getTodoForMonth(month)) {
      totalExpense += expense.expenseAmount;
    }
    return totalExpense;
  }

  getTodoForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  getFilteredExpense() {
    let filteredExpense: any[] = [];

    switch (this.selectedMonth) {
      case 'January':
        filteredExpense = [...this.januaryExpense];
        break;
      case 'February':
        filteredExpense = [...this.februaryExpense];
        break;
      case 'March':
        filteredExpense = [...this.marchExpense];
        break;
      default:
        break;
    }
    return filteredExpense;
  }

  onSave() {
    if (this.todoForm.valid) {
      const incomeData = this.todoForm.value;
      this.todoForm.reset({ month: this.selectedMonth });
      this.getFilteredExpense();
    }
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      this.getFilteredExpense().push(newExpense);
      this.todoForm.reset();
    }
  }

  toggleSelection(expense: any) {
    expense.selected = !expense.selected;
    console.log(expense.selected);
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

}
