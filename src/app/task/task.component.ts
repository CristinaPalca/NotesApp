import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ITask } from '../model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: ITask;
  @Output() extended = new EventEmitter<ITask>();



  constructor() { }

  ngOnInit(): void {
  }

  extend_task(){
    this.extended.emit(this.task);
    console.log("task extended");
  }

}
