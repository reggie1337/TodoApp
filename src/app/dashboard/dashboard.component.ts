import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity';
import { TaskService } from '../task.service';
import { FormBuilder, Form } from '@angular/forms';
import { Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { TodoApiService } from '../todo-api.service';
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

  destroyed$ = new Subject<void>();

  constructor(
    public taskService: TaskService,
    private fb: FormBuilder,
    private _todoApi: TodoApiService
  ) {}

  newTask() {
    this._todoApi.createTodo(this.form.get('task')?.value).subscribe((res) => {
      this.taskService.newTask(
        this.form.get('task')?.value,
        this.form.get('date')?.value,
        res.data.id
      );
    });
  }

  taskDelete(task: Activity): void {
    this.taskService.taskDelete(task.id);
  }

  taskComplete(task: Activity): void {
    this.taskService.taskComplete(task.id);
  }
  incompleteTask(task: Activity): void {
    this.taskService.incompleteTask(task.id);
  }

  clearAll() {
    this.taskService.deleteAllTasks();
  }

  ngOnInit(): void {
    this._todoApi
      .getTodos()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => console.log(data));
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
