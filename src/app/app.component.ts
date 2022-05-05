import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { findIndex } from 'rxjs/operators';
import { Activity } from './activity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  Tasks: Activity[] = [];
  currentIndex = 0;
  form = this.fb.group({
    task: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  newTask() {
    console.log(this.form.get('task')?.value);
    this.Tasks.push({
      task: this.form.get('task')?.value,
      date: this.form.get('date')?.value,
      weDone: false,
      id: this.currentIndex,
    });
    this.currentIndex++;
  }

  taskComplete(task: Activity) {
    task.weDone = true;
  }

  taskDelete(task: Activity) {
    const index = this.Tasks.findIndex((t) => t.id === task.id);
    this.Tasks.splice(index, 1);
  }
  taskClear() {
    this.Tasks = [];
  }
  taskFinished() {
    const task = this.Tasks;
    this.Tasks.forEach((task) => {
      task.weDone = true;
    });
  }

  ngOnInit(): void {}
}
