import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Activity } from './activity';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks$ = new BehaviorSubject<Activity[]>([]);

  newTask(taskBody: string, taskDate: Date, taskId: number) {
    const body: Activity = {
      body: taskBody,
      isComplete: false,
      id: taskId,
      isDeleted: false,
    };
    this.tasks$.next([...this.tasks$.getValue(), body]);
  }

  taskComplete(id: number) {
    const tasks = this.tasks$.getValue();
    const index = tasks.findIndex((t) => t.id === id);
    tasks[index].isComplete = true;
    this.tasks$.next(tasks);
  }

  taskRestore(id: number) {
    const tasks = this.tasks$.getValue();
    const index = tasks.findIndex((t) => t.id === id);
    tasks[index].isDeleted = false;
    this.tasks$.next(tasks);
  }

  taskDelete(id: number) {
    const tasks = this.tasks$.getValue();
    const index = tasks.findIndex((t) => t.id === id);
    tasks[index].isDeleted = true;
    this.tasks$.next(tasks);
  }

  deleteAllTasks() {
    this.tasks$.next([]);
  }

  incompleteTask(id: number) {
    const tasks = this.tasks$.getValue();
    const index = tasks.findIndex((t) => t.id === id);
    tasks[index].isComplete = false;
    this.tasks$.next(tasks);
  }
}
