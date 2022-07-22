import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/activity';
import { TaskService } from '../../services/task.service';
import { FormBuilder, Form } from '@angular/forms';
import { Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { TodoApiService } from '../../services/todo-api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks: Activity[] = [];
  form = this.fb.group({
    task: ['', Validators.required],
  });

  destroyed$ = new Subject<void>();

  constructor(
    public taskService: TaskService,
    private fb: FormBuilder,
    private _todoApi: TodoApiService
  ) {}

  newTask() {
    this._todoApi
      .createTodo(this.form.get('task')?.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.taskService.newTask(this.form.get('task')?.value, res.data.id);
      });
  }

  taskDelete(task: Activity): void {
    this.taskService.taskDelete(task.id);

    this._todoApi.editTodos(task).subscribe(() => {
      this.taskService.taskDelete(task.id);
    });
  }

  taskComplete(task: Activity): void {
    task.isComplete = true;
    this._todoApi.editTodos(task).subscribe(() => {
      this.taskService.taskComplete(task.id);
    });
  }

  incompleteTask(task: Activity): void {
    this.taskService.incompleteTask(task.id);
    this._todoApi.editTodos(task).subscribe(() => {
      this.taskService.incompleteTask(task.id);
    });
  }

  clearAll() {
    this.taskService.deleteAllTasks();
  }

  ngOnInit(): void {
    this.taskService.tasks$
      .pipe(
        takeUntil(this.destroyed$),
        map((t) => t.filter((t) => !t.isDeleted))
      )
      .subscribe((tasks) => (this.tasks = tasks));

    this._todoApi
      .getTodos()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.taskService.hydrateTasks(res.data);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
