import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Activity } from '../activity';
import { map } from 'rxjs';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  tasks: Activity[] = [];

  constructor(public taskService: TaskService) {}

  taskRestore(task: Activity) {
    this.taskService.taskRestore(task.id);
  }

  ngOnInit(): void {
    this.taskService.tasks$
      .pipe(map((t) => t.filter((t) => t.isDeleted)))
      .subscribe((tasks) => (this.tasks = tasks));
  }
}
