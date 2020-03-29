import {Injectable} from '@angular/core';
import {BoardService} from '../board.service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store/src/models';
import * as boardActions from './board.action';
import {map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {Card} from '../../card/card';
import {getCardsSelector} from './board.state';
import {select, Store} from '@ngrx/store';

@Injectable()
export class BoardEffects {
  constructor(private store: Store, private boardService: BoardService, private actions$: Actions) {
  }

  @Effect()
  selectCard$: Observable<Action> = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.SelectCard),
    withLatestFrom(this.store.select(getCardsSelector)),
    map(([action, cards]: [boardActions.SelectCard, Card[]]) => {

      for (const card of cards) {
        // if (card.shown) {
        //   return new boardActions.ShowSecond(action.payload)
        // }
        if (card.front === action.payload.front) {  // THIS WILL BE THE URL LATER
          if (card.id !== action.payload.id && card.shown) {
            return new boardActions.SetMatch([card.id, action.payload.id]);

          }
        }
      }
      return new boardActions.SetShown(action.payload);
    }),
  );
  @Effect()
  loadCards$: Observable<Action> = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.Load),
    mergeMap(action =>
      this.boardService.getCards().pipe(
        map((cards) => this.boardService.shuffle([...cards])),
        map(shuffledCards => new boardActions.LoadSuccess(shuffledCards))
      )
    )
  );
  @Effect()
  setShown$: Observable<Action> = this.actions$.pipe(
    ofType(boardActions.BoardActionTypes.SetShown),
    withLatestFrom(this.store.select(getCardsSelector)),
    map(([action, cards]: [boardActions.SelectCard, Card[]]) => {
      let shown = 0;
      const shownCards = [];
      for (const card of cards) {
          if (card.shown) {
            shown++;
            shownCards.push(card);
          }
      }
      if (shown > 1) {
        return new boardActions.FlipBack(shownCards);
      }
      return new boardActions.EmptyAction();
    }),
  );
}
