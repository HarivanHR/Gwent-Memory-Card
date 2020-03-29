import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Card} from '../card/card';
import {BoardState, getCardsSelector, getHiddenCards} from './state/board.state';
import {select, Store} from '@ngrx/store';
import {Load, SelectCard} from './state/board.action';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
cards$: Observable<Card[]>;
hiddenAmount$: Observable<number>;
  constructor(private el: ElementRef, private store: Store<BoardState>) {  }

  ngOnInit(): void {
    this.store.dispatch(new Load());
    this.cards$ = this.store.pipe(
      select(getCardsSelector),
      tap((cards) => {
        this.el.nativeElement.style.setProperty('--column-size', `${(cards.length / 5).toFixed()}`);
      })
    );

    this.hiddenAmount$ = this.store.pipe(
      select(getHiddenCards),
    );
  }
  setCard(card) {
    this.store.dispatch(new SelectCard(card));
  }

  tbFind(index: number, item: Card) {
    return item.id;
  }


}
