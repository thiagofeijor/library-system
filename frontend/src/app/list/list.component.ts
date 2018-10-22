import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { shareReplay, debounceTime } from 'rxjs/operators';

import { BookService } from '../book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  sort = 'asc';
  filterBar = false;
  books$;
  iFilter = new FormControl();
  evtFilter: Subscription;
  
  constructor(public bookService: BookService) { 
    this.defineService();
  }

  ngOnInit() {
    this.evtFilter = this.iFilter.valueChanges.pipe(debounceTime(500)).subscribe(() => this.defineService())
  }

  ngOnDestroy() {
    this.evtFilter.unsubscribe();
  }
  
  defineService() {
    let options: any = {};

    if (this.sort) {
      options.sort = this.sort;
    }

    if (this.iFilter.value) {
      options.query = this.iFilter.value;
    }

    this.books$ = this.bookService.listBooks(options).pipe(shareReplay(1));
  }

  sortData(sort) {
    this.sort = sort.direction;
    this.defineService();
  }

  toggleBar() {
    this.filterBar = !this.filterBar;
    if (!this.filterBar) {
      this.iFilter.reset();
    }
  }

}
