import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Activity } from '../models/activity';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks$ = new BehaviorSubject<Activity[]>([]);

  newTask(taskBody: string, taskId: number) {
    const body: Activity = {
      body: taskBody,
      isComplete: false,
      id: taskId,
      isDeleted: false,
    };
    this.tasks$.next([...this.tasks$.getValue(), body]);
  }

  hydrateTasks(tasks: Activity[]) {
    this.tasks$.next(tasks);
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

  permanentDelete(id: number) {
    let tasks = this.tasks$.getValue();
    // const index = tasks.findIndex((t) => t.id === id);
    // tasks.splice(index, 1);
    tasks = tasks.filter((t) => t.id !== id);
    this.tasks$.next(tasks);
  }
}
