import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: any;
  januaryExpense: any[] = [
    { expenseType: 'Utilities', expenseAmount: 800},
    { expenseType: 'Groceries', expenseAmount: 200},
  ];
  februaryExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1200},
    { expenseType: 'Groceries', expenseAmount: 300 },
  ];
  marchExpense: any[] = [
    { expenseType: 'Utilities', expenseAmount: 5200},
    { expenseType: 'Groceries', expenseAmount: 1200 },
    { expenseType: 'Rent', expenseAmount: 1200 },
  ];
  
  monthSelected: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleDateString('default', { month: 'long' });
  }

  ngOnInit() {
    // fb = form builder, must import before use
    this.expenseForm = this.fb.group({
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
    for(const expense of this.getExpenseForMonth(month)){
      totalExpense += expense.expenseAmount;
    }
    return totalExpense;
  }

  getExpenseForMonth(month: string): any[] {
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

  onSubmitExpense() {
    if(this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      switch(this.selectedMonth){
        case 'January':
          this.januaryExpense.push(newExpense);
          break;
        case 'February':
          this.februaryExpense.push(newExpense);
          break;
        case 'March':
          this.marchExpense.push(newExpense);
          break;
        default:
          break;
      }
      this.expenseForm.reset();
      this.expenseForm.patchValue({month: '', expenseType: '', expenseAmount: ''});
    }
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  saveForm() {
    console.log("Form Saved!");
  }
}
