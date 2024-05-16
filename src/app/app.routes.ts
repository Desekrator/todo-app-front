import { Routes } from '@angular/router';
import { TodoNewComponent } from './components/todo-new/todo-new.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const routes: Routes = [
    {path: 'todo-new', component: TodoNewComponent},
    {path: 'todo-list', component: TodoListComponent},
];
