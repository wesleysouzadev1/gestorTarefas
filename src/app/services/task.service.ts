import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  // Lista de tarefas
  private tasks: Array<Task> = [];

  // Método para ler a lista de tarefas e EXIBIR
  // Obter Tasks
  public getTasks(): Array<Task> {

    this.tasks = this.getFromLocalStorage();

    return this.tasks;
  }

  // Para exibir os detalhes da tarefa selecionada
  getById(id: number): Task | undefined {

    const task = this.tasks.find(c => c.id === id);

    return task;
  }

  // Adicionar tarefa 
  // (tipo void porque n retorna nada)
  addTask(task: Task): void {

    this.tasks.push(task); //adicinou

    this.saveToLocalStorage();
  }

  // Atualizar a tarefa 
  // (descrição, marcar concluído ou desmarcar)
  updateTasks() {
    this.saveToLocalStorage();
  }

  // Remover a tarefa
  removeTask(task: Task) {
    const index = this.tasks.indexOf(task);

    if (index !== -1) {
      //achou
      this.tasks.splice(index, 1); //remove da lista

      this.saveToLocalStorage(); //e salva no local storage
    }


  }

  // Gravar na Local Storage
  private saveToLocalStorage() {

    // pega todas as tasks e converte para o objeto JSON
    const tasksJSON = JSON.stringify(this.tasks);

    localStorage.setItem('tasks', tasksJSON);
  }

  // Ler do Local Storage (OBTER DA LOCAL STORAGE)
  private getFromLocalStorage(): Array<Task> {

    const tasksJSON = localStorage.getItem('tasks');

    if (!tasksJSON) {
      //não achou
      return new Array<Task>();
    }

    return JSON.parse(tasksJSON);
  }

}
