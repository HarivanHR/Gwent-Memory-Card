import {Card} from '../../card/card';

import {Action} from '@ngrx/store';

export enum BoardActionTypes {
  SelectCard = '[Board] Select Card',
  SetShown = '[Card] Set Shown',
  SetMatch = '[Board] Set Match',
  Load = '[Board] Load',
  LoadSuccess = '[Board] Load Success',
  FlipBack = '[Card] Flip Back',
  ShowSecond = '[Card] Show Second',
  EmptyAction = 'Empty Action',
}

export class SelectCard implements Action {
  readonly type = BoardActionTypes.SelectCard;

  constructor(public payload: Card) {
  }
}

export class SetShown implements Action {
  readonly type = BoardActionTypes.SetShown;

  constructor(public payload: Card) {
  }
}

export class SetMatch implements Action {
  readonly type = BoardActionTypes.SetMatch;

  constructor(public payload: number[]) {
  }
}
export class Load implements Action {
  readonly type = BoardActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = BoardActionTypes.LoadSuccess;

  constructor(public payload: Card[]) {}
}

export class FlipBack implements Action {
  readonly type = BoardActionTypes.FlipBack;
  constructor(public payload: Card[]) {}
}

export class ShowSecond implements Action {
  readonly type = BoardActionTypes.ShowSecond;

  constructor(public payload: Card) {
  }
}

export class EmptyAction implements Action {
  readonly type = BoardActionTypes.EmptyAction;
}

export type BoardActions = SelectCard | SetShown | SetMatch | Load | LoadSuccess | FlipBack | ShowSecond | EmptyAction;
