import { Component } from '@angular/core';
import { TaskFilterComponent } from "../task-filter/task-filter.component";
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [TaskFilterComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  constructor(private taskService: TaskService) { }

  tasks: Array<Task> = [];

  newTask = new Task();

  ngOnInit() {

    this.tasks = this.taskService.getTasks();
  }

  addTask() {

    this.taskService.addTask(this.newTask); //adicinou nova tarefa

    this.newTask = new Task(); //limpou campo de adicionar tarefa
  }

  removeTask(task: Task) {

    this.taskService.removeTask(task); //remover tarefa
  }

  updateTasks() {
    this.taskService.updateTasks(); //atualizar tarefas
  }

  //Pesquisar Tarefas
  filterTasks(filter: string) {

    //se o filtro estiver diferente de vazio 
    // (digitou alguma coisa no filtro)
    if (filter !== '') {

      //se tiver o caractere que foi digitado no filtro
      this.tasks = this.tasks.filter(c => c.name.includes(filter));
    }
    
    //se o filtro estiver vazio
    else {
      this.tasks = this.taskService.getTasks();
    }
  }

}
