import { Component, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Activity } from '../activity';
import { TaskService } from '../task.service';
import { FormBuilder, Form } from '@angular/forms';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks: Activity[] = [];
  form = this.fb.group({
    task: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(public taskService: TaskService, private fb: FormBuilder) {}

  newTask() {
    this.taskService.newTask(
      this.form.get('task')?.value,
      this.form.get('date')?.value
    );
  }

  taskDelete(task: Activity): void {
    this.taskService.taskDelete(task.id);
  }

  taskComplete(task: Activity): void {
    this.taskService.taskComplete(task.id);
  }

  ngOnInit(): void {
    this.taskService.tasks$
      .pipe(map((t) => t.filter((t) => !t.isDeleted)))
      .subscribe((tasks) => (this.tasks = tasks));
  }
}
