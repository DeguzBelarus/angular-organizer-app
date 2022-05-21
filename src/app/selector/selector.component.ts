import { DateService } from './../shared/date.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-selector',
   templateUrl: './selector.component.html',
   styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

   constructor(public dateService: DateService) { }

   ngOnInit(): void {
   }

   go(dir: number) {
      this.dateService.changeMonth(dir)
   }
}
