import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ICategory, ITask} from '../model';
import {colors} from '../data';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: ICategory;
  @Input() bgColor: number;
  @Output() extended_task = new EventEmitter<ITask>();
  @Output() extend_add_task = new EventEmitter<ICategory>();
  @Output() category_removed = new EventEmitter<ICategory>();

  color: string = '';
  colorTemplate: string = '';
  extendedCategory = false;

  constructor() {
  }

  ngOnInit(): void {
    this.color = colors[this.bgColor];
    this.colorTemplate = `linear-gradient(135deg, #BA32F6, ${this.color} )`;
  }


  onExtendedTask($event: ITask){
    this.extended_task.emit($event);
    // console.log("from category ", $event);
  }

  toggleShrink(){
    this.extendedCategory = !this.extendedCategory;
  }


  add_task(){
    this.extend_add_task.emit(this.category);
    /*const tmp_task = {
      id: 200,
      name: 'test task',
      description: 'lorem ipsum',
      done: false
    };
    this.category.tasks.push(tmp_task);*/
  }

  removeCategory(){
    this.category_removed.emit(this.category);
  }



}
