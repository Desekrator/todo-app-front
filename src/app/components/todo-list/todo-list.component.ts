import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { TaskModel } from "../../model/task.model";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [
    CommonModule
  ]
})
export class TodoListComponent implements OnInit {

  tasks: TaskModel[] | undefined;

  constructor(
    private readonly taskService: TaskService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.updateTodos()
  }

  public handleRemoveClick(id: string | number) {
    // if (!this.tasks) return
    this.taskService.removeTask(id).subscribe(
      todo => { this.updateTodos() }
    )
  }


  updateTodos() {
    this.taskService.getTasks().subscribe(
      todos => {
        this.tasks = todos.sort((a, b) => {
          const priorityOrder: { [key: string]: number } = { 'low': 3, 'medium': 2, 'high': 1 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      },
      error => {
        console.log("Inicializa el back-end. Error: " + error)
      }
    )
  }

  dialogOpen: boolean = false;
  openDialog(todo: any): void {

    if (!this.dialogOpen) {
      this.dialogOpen = true;
      const dialogRef = this.dialog.open(TodoEditComponent, {
        panelClass: 'edit-dialog',
        data: todo,
        width: '300px', // Ancho del modal
        height: '370px',

      });

      dialogRef.disableClose = true;

      dialogRef.componentInstance.closed.subscribe(result => {
        this.dialogOpen = false
        dialogRef.close();
      });
      dialogRef.afterClosed().subscribe(result => {

        this.updateTodos(); // Ordenar la lista por prioridad

      });

    }


  }

}
