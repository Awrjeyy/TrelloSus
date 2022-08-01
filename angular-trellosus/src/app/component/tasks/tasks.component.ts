import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/models/tasks/tasks.model';
import { AuthService } from 'src/app/commons/auth/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {


  tasks?: Tasks[];
  currentTaskViewed: Tasks = {};
  currentIndex = -1;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.retrieveTasks();

  }

  retrieveTasks(): void {
    this.authService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(data);
      },
      error: (e) => console.log(e)
    });
  }

  setActiveTask(tasks: Tasks, index: number): void {
    this.currentTaskViewed = tasks;
    this.currentIndex = index;
  }
}
