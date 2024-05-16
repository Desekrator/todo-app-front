import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { TaskModel } from "../../model/task.model";
import { PriorityTransformPipe } from '../../pipes/priority-transform.pipe';
import { StatusTransformPipe } from '../../pipes/status-transform.pipe';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [
    CommonModule, PriorityTransformPipe, StatusTransformPipe
  ]
})
export class TodoListComponent implements OnInit {

  tasks: TaskModel[]=[];
  dialogOpen: boolean = false;

  constructor(
    private readonly taskService: TaskService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.updateTodos()
  }

  public handleRemoveClick(id: string | number) {
    this.taskService.removeTask(id).subscribe(
      () => { this.updateTodos() }
    )
  }


  updateTodos() {
    this.taskService.getTasks().subscribe(
      todos => {
        this.tasks = todos.sort((a, b) => {
          const priorityOrder: { [key: string]: number } = { 'low': 3, 'medium': 2, 'high': 1 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      }
    )
  }

  openDialog(todo: any): void {

    if (!this.dialogOpen) {
      this.dialogOpen = true;
      const editDialog = this.dialog.open(TodoEditComponent, {
        panelClass: 'edit-dialog',
        data: todo,
        width: '300px',
        height: '370px',

      });

      editDialog.disableClose = true;

      editDialog.componentInstance.closed.subscribe(() => {
        this.dialogOpen = false
        editDialog.close();
      });

      editDialog.afterClosed().subscribe(() => {
        this.updateTodos();
      });

    }
  }
}
