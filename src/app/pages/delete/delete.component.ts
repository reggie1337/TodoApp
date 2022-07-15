import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Activity } from '../../models/activity';
import { map } from 'rxjs';
import { TodoApiService } from 'src/app/services/todo-api.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  tasks: Activity[] = [];
  form = this.fb.group({
    task: ['', Validators.required],
  });

  constructor(
    public taskService: TaskService,
    private _todoApi: TodoApiService,
    private fb: FormBuilder
  ) {}

  taskRestore(task: Activity) {
    this.taskService.taskRestore(task.id);
  }

  ngOnInit(): void {
    this.taskService.tasks$
      .pipe(map((t) => t.filter((t) => t.isDeleted)))
      .subscribe((tasks) => (this.tasks = tasks));
  }
  permDelete(id: number) {
    this.taskService.tasks$
      .pipe(map((t) => t.filter((t) => t.id)))
      .subscribe((tasks) => (this.tasks = tasks));
    this._todoApi.deleteTodo(id).subscribe((res) => {
      this.taskService;
    });
  }
}
