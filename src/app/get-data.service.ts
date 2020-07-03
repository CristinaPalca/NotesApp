import { Injectable } from '@angular/core';
import {categories} from './data';
import {from, Observable} from 'rxjs';
import {ICategory, ITask} from './model';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {


  myCategories: Array<ICategory>;

  constructor() {
    if (!localStorage.getItem('categories')){
      const tmpCategory = {
        id: 0,
        name: 'Default category',
        tasks: [],
        done: false
      };
      this.myCategories = [tmpCategory];
      this.pushToLocalStorage();
    }else{
      this.myCategories = JSON.parse(localStorage.getItem('categories'));
    }
    //this.addSome();
    //     //this.pushToLocalStorage();
    console.log(this.myCategories);
  }

  addSome(){
    this.myCategories = [
      {
        id: 1,
        name: 'Default Category',
        tasks: [
          {
            id: 1,
            name: 'Landing page design',
            description: 'Lorem ipsum dolor sit amet sit elit...',
            done: true
          },
          {
            id: 2,
            name: 'English Advanced',
            description: 'Lorem ipsum dolor sit amet sit elit...',
            done: false
          }
        ],
        done: false
      },
      {
        id: 2,
        name: 'Home tasks',
        tasks: [{
          id: 1,
          name: 'House clean',
          description: 'Lorem ipsum dolor sit amet sit elit...',
          done: false
        }, {
          id: 2,
          name: 'Cooking',
          description: 'Lorem ipsum dolor sit amet sit elit...',
          done: false
        }
        ],
        done: false
      }
    ];
  }

  getCategories() {
    return this.myCategories;
  }

  getCategoriesObservable(): Observable<any> {
    return from(this.myCategories);
  }


  addCategory(category: ICategory){
    if (this.myCategories){
      this.myCategories.push(category);
    }else{
      this.myCategories = [category];
    }
    this.pushToLocalStorage();
  }

  removeCategory(id: number){
    console.log(id);
    if (this.myCategories){
      this.myCategories = this.myCategories.filter(cat => cat.id != id);
    }
    this.pushToLocalStorage();
  }

  addTask(categoryId: number, task: ITask){
    for (const category of categories){
      if (category.id === categoryId){
        if (category.tasks){
          category.tasks.push(task);
        }else{
          category.tasks = [task];
        }
      }
    }
    this.pushToLocalStorage();
  }

  removeTask(categoryId: number, task: ITask){
    for (let category of this.myCategories){
      if (category.id === categoryId){
        category.tasks.splice(category.tasks.indexOf(task), 1);
      }
    }
    this.pushToLocalStorage();
  }

  setTaskDone(category: ICategory, task: ITask, value: boolean){
    const cat = this.myCategories[this.myCategories.indexOf(category)];
    cat.tasks[cat.tasks.indexOf(task)].done = value;
    this.pushToLocalStorage();
  }

  pushToLocalStorage(){
    localStorage.setItem('categories', JSON.stringify(this.myCategories));
  }

}

