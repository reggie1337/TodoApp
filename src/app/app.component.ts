import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { Activity } from './activity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tasks: Activity[] = [];
  currentIndex = 0;
  form = this.fb.group({
    task: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  newTask() {
    console.log(this.form.get('task')?.value);
    this.tasks.push({
      task: this.form.get('task')?.value,
      date: this.form.get('date')?.value,
      weDone: false,
      id: this.currentIndex,
      isDeleted: false,
    });
    this.currentIndex++;
  }

  taskComplete(task: Activity) {
    task.weDone = true;
  }

  taskDelete(task: Activity) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks.splice(index, 1);
    task.isDeleted = true;
  }
  deleteAllTasks() {
    //iterate over each task and update is deleted
    for (let task of this.tasks) {
      task.isDeleted = true;
    }
  }
  taskFinished() {
    this.tasks.forEach((task) => {
      task.weDone = true;
    });
  }

  ngOnInit(): void {}
}
