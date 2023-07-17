import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit():void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
      console.log(value);
    });
  }

  ngOnDestroy():void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitInput(search: string):void {

    if(search.length === 0) return;

    this.onValue.emit(search);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

}
