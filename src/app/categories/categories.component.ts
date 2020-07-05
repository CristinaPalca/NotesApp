import {Component, OnInit} from '@angular/core';
import {ICategory, ITask} from '../model';
import {GetDataService} from '../get-data.service';
import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    trigger('displayCategories', [
      transition('* => *', [
        query(':enter', style(
          {opacity: 0, transform: 'translateX(-30px)'
          }), {optional: true}),
        query(':enter', stagger(
          '0.3s', animate('0.5s ease-in', style({
            opacity: 1,
            transform: 'translateX(0)'
          }))
        ), {optional: true})
      ])
    ])
  ]
})
export class CategoriesComponent implements OnInit{

  categories: Array<ICategory> = [];

  progressBar = {
    progress_bar_width: 0,
    total_nr : 0,
    done_nr: 0
  };
  overlays = {
    display_task: 'none',
    display_add_category: 'none',
    display_add_task: 'none'
  };
  categoryId: number;
  newCategoryTitle = '';
  newTaskName = '';
  newTaskDescription = '';

  tmp_category_to_add_task: ICategory;
  extendedTask: ITask;

  constructor(private getData: GetDataService) {
    this.extendedTask = {
      id: 0,
      name: '',
      description: '',
      done: false
    };

  }

  ngOnInit(): void {
    this.getData.getCategoriesObservable().subscribe(data => {
      if (this.categories){
        this.categories.push(data);
      }else{
        this.categories = [data];
      }
    });
    this.initial_update_bar();
  }

  initial_update_bar(){
    if (this.categories){
      this.categoryId = this.categories[this.categories.length - 1].id + 1;
      this.update_bar();
    }else{
      this.categoryId = 0;
    }
  }

  update_bar(){
    let tmpTotal = 0;
    let tmpDone = 0;

    if (this.categories){
      for (let i = 0; i < this.categories.length; i++){
        for (let j = 0; j < this.categories[i].tasks.length; j++){
          tmpTotal++;
          if (this.categories[i].tasks[j].done){
            tmpDone++;
          }
        }
      }
      this.progressBar.progress_bar_width = (tmpDone / tmpTotal) * 100;
      this.progressBar.total_nr = tmpTotal;
      this.progressBar.done_nr = tmpDone;
    }
  }

  extend_add_category(){
    this.overlays.display_add_category = 'block';
  }

  add_category(){
    const tmp: ICategory = {
      id: this.categoryId++,
      name: this.newCategoryTitle,
      tasks: [],
      done: false
    };
    if (this.categories){
      this.categories.push(tmp);
    }else{
      this.categories = [tmp];
    }
    this.getData.addCategory(tmp);
    this.newCategoryTitle = '';
    this.close_overlay();
  }

  close_overlay(){
    this.newCategoryTitle = '';
    this.overlays.display_task = 'none';
    this.overlays.display_add_category = 'none';
    this.overlays.display_add_task = 'none';
  }

  // Extend task logic
  onExtendedTask($event){
    this.extendedTask = $event;
    this.overlays.display_task = 'block';
  }

  set_task_done(value: boolean){
    for (const cat of this.categories) {
      for (const task of cat.tasks) {
        if (task.id === this.extendedTask.id && task.name === this.extendedTask.name) {
          task.done = value;
          this.getData.setTaskDone(cat, task, value);
        }
      }
    }
    this.update_bar();
  }

  remove_task(){
    for (const category of this.categories){
      const taskId = category.tasks.indexOf(this.extendedTask);
      if (taskId > -1){
        const tmp_task = category.tasks[taskId];
        this.getData.removeTask(category.id, tmp_task);
        category.tasks.splice(taskId, 1);
      }
    }
    this.update_bar();
    this.close_overlay();
  }
  // to display add task UI
  add_task($event){
    this.overlays.display_add_task = 'block';
    this.tmp_category_to_add_task = $event;
  }
  submit_task(){
    let taskId = 0;
    if (this.tmp_category_to_add_task.tasks){
      taskId = this.tmp_category_to_add_task.tasks.length;
    }
    let tmp_task = {
      id: taskId,
      name: this.newTaskName,
      description: this.newTaskDescription,
      done: false
    };
    this.tmp_category_to_add_task.tasks.push(tmp_task);
    this.getData.addTask(this.tmp_category_to_add_task.id, tmp_task);
    this.close_overlay();
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.update_bar();
  }

  removeCategory($event){
    this.categories = this.categories.filter((cat) => cat.id != $event.id);
    this.getData.removeCategory($event.id);
    this.update_bar();
  }

}
