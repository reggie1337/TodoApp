import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Activity } from '../../models/activity';
import { map, Subject, takeUntil } from 'rxjs';
import { TodoApiService } from 'src/app/services/todo-api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit, OnDestroy {
  tasks: Activity[] = [];
  destroyed$ = new Subject<void>();

  constructor(
    public taskService: TaskService,
    private _todoApi: TodoApiService
  ) {}

  ngOnInit(): void {
    this.taskService.tasks$
      .pipe(map((t) => t.filter((t) => t.isDeleted)))
      .subscribe((tasks) => (this.tasks = tasks));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  taskRestore(task: Activity) {
    this.taskService.taskRestore(task.id);
    this._todoApi.editTodos(task).subscribe(() => {
      this.taskService.taskRestore(task.id);
    });
  }

  permDelete(id: number) {
    this._todoApi
      .deleteTodo(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.taskService.permanentDelete(res.data.id);
      });
  }
}
