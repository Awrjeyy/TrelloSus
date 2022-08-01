import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/commons/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from 'src/app/models/tasks/tasks.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.component.html',
  styleUrls: ['./tasks-details.component.css']
})
export class TasksDetailsComponent implements OnInit {
  form!: FormGroup;
  @Input() viewMode = false;
  @Input() currentViewedTask: Tasks = {
    task_title: '',
    task_description: '',
    task_owner: '',
    task_assignedTo: ''
  }
  message = '';
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.viewMode){
      this.message = '',
      this.getTaskDetail(this.route.snapshot.params["id"]);
    }
  }

  getTaskDetail(id: string): void{
    this.authService.getTask(id).subscribe({
      next: (data) => {
        this.currentViewedTask = data;
        console.log(data);
      },
      error: (e) => console.log(e)
    })
  }
  updateTaskDetail(): void{
    this.message = '';
    const taskData = new FormData();
    taskData.append('task_title', this.currentViewedTask.task_title!)
    taskData.append('task_description', this.currentViewedTask.task_description!)
    this.authService.updateTask(this.currentViewedTask.id, taskData)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : "Task has been updated"
      },
      error: (e) => console.error(e)
    });
  }

}
