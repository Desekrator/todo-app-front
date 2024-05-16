import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../../model/task.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './todo-new.component.html',
  styleUrl: './todo-new.component.css'
})
export class TodoNewComponent implements OnInit {
  public task!: TaskModel;

  public selectedPriority: string | undefined;
  constructor(
    private readonly taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.task = new TaskModel('', '', '', '', '');
  }

  onSubmit() {

    if (this.task.title == '' || this.task.description == '' || this.task.priority == '' || this.task.status == '') {
      alert("Todos los campos deben estar rellenos")
      return
    }

    const newTodo = new TaskModel(uuidv4(), this.task.title, this.task.description, this.task.status, this.task.priority);

    this.taskService.addTask(newTodo)
      .subscribe(()=>{alert("Tarea creada con exito")})

  }

}
