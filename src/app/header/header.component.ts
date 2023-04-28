import { Component, OnInit } from '@angular/core';
import { Observable, map, timer } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  timeNow: Observable<Date> | undefined;

  ngOnInit(): void {
      this.timeNow = timer(0,1000).pipe(
        map( () => { return new Date(); } )
      );
  }
}
