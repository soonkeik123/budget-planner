import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todoForm: any;
  selectedMonth: any;
  januaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1000, selected: false},
    { expenseType: 'Light Bills', expenseAmount: 500, selected: false},
  ];
  februaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1200, selected: false},
    { expenseType: 'Light Bills', expenseAmount: 300, selected: false},
  ];
  marchExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 5200, selected: false},
    { expenseType: 'Essentials', expenseAmount: 1200, selected: false},
  ];
  
  monthSelected: boolean = false;

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
    for(const expense of this.getTodoForMonth(month)){
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
    if(this.todoForm.valid) {
      const incomeData = this.todoForm.value;
      this.todoForm.reset({month: this.selectedMonth});
      this.getFilteredExpense();
    }
  }

  onSubmitExpense() {
    if(this.todoForm.valid) {
      const newExpense = this.todoForm.value;
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
      this.todoForm.reset();
      this.todoForm.patchValue({month: '', expenseType: '', expenseAmount: ''});
    }
  }

  toggleSelection(expense: any) {
    expense.selected = !expense.selected;
    console.log(expense.selected);
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  saveForm() {
    console.log("Form Saved!");
  }
}
