import { Component, OnInit } from '@angular/core';
import {GetDataService} from "../get-data.service";
import {colors} from "../data";

@Component({
  selector: 'app-progress-page',
  templateUrl: './progress-page.component.html',
  styleUrls: ['./progress-page.component.css']
})
export class ProgressPageComponent implements OnInit {

  progressTotal = {
    total: 0,
    done: 0,
    width: 0
  }

  progressCategories = [];

  colors = [];

  constructor(private data: GetDataService) { }

  ngOnInit(): void {
    this.colors = colors;
    let tmpCategories = [];
    this.data.getCategoriesObservable().subscribe(data => {
      if (tmpCategories){
        tmpCategories.push(data);
      }else{
        tmpCategories = [data];
      }
    });
    let count_total = 0;
    let count_done = 0;
    for (const cat of tmpCategories){
      for (const task of cat.tasks){
        count_total++;
        if (task.done) { count_done++; }
      }
    }
    this.progressTotal.total = count_total;
    this.progressTotal.done = count_done;
    this.progressTotal.width = count_done / count_total * 100;



    for (const cat of tmpCategories){
      let tmp_obj = {
        name: cat.name,
        done: 0,
        total: cat.tasks.length,
        width: 0
      };
      for (const task of cat.tasks){
        if (task.done){ tmp_obj.done++; }
      }
      tmp_obj.width = tmp_obj.done / tmp_obj.total * 100;
      this.progressCategories.push(tmp_obj);
    }
  }



}
