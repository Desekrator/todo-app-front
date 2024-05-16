import { CommonModule } from '@angular/common';
import { Output, EventEmitter, Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.css'
})
export class TodoEditComponent implements OnInit {
  @Output() closed = new EventEmitter<boolean>();

  task: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private readonly taskService: TaskService
  ) { }

  ngOnInit(): void {

    this.task = this.data;
  }
  closeDialog(): void {

    if (this.task.title == '' || this.task.description == '' || this.task.priority == '' || this.task.status == '') return
    this.taskService.editTask(this.data).subscribe(
      todo => { alert("ok") },
      error => { console.log(error) }
    );
    this.closed.emit(true);

  }

}
