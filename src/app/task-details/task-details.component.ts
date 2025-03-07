import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  imports: [FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {

  task?: Task;

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService) { }

  // VERIFICA SE VEIO ID
  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id'); //pega o id da URL do navegador

    //SE NÃO VEIO
    if (id === null) {
      this.navigateBack(); //navega de volta
    }
    // SE VEIO ID
    else {
      // TENTA ACHAR A TASK COM O ID
      this.task = this.taskService.getById(+id);// +id para converter de string para numérico

      // SE NÃO ACHAR A TASK COM O ID
      if (this.task === undefined) {
        this.navigateBack(); //navega de volta  
      }
    }
  }

  //botão Salvar
  save() {
    this.taskService.updateTasks(); //atualiza o local storage

    this.navigateBack();
  }

  //botão Cancelar
  cancel() {
    this.navigateBack(); //volta para a lista de tarefas
  }

  private navigateBack() {

    this.router.navigate(['/taskList'], { relativeTo: this.route });
  }

}
