import {Card} from '../../card/card';
import {cards} from '../board-data';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAppState from '../../app.state';

const HIDDEN_AMOUNT = 64;
export const boardStateIdentifier = 'board';
const getBoardFeatureState = createFeatureSelector<BoardState>(boardStateIdentifier);

export const getCardsSelector = createSelector(
  getBoardFeatureState,
  (state) => state.cards
);

export const getHiddenCards = createSelector(
  getBoardFeatureState,
  (state) => state.hiddenCards
);
export const getDisabled = createSelector(
  getBoardFeatureState,
  (state) => state.disabled
);



// export interface State extends fromAppState.State {}

export interface BoardState {
  cards: Card[];
  hiddenCards: number;
  disabled: boolean;
}

export const initialState: BoardState = {
  cards,
  hiddenCards: HIDDEN_AMOUNT,
  disabled: false,
};
