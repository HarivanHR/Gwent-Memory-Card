import {BoardState, initialState} from './board.state';
import {BoardActions, BoardActionTypes} from './board.action';

export function reducer(state: BoardState = initialState, action: BoardActions) {
  switch ( action.type) {

    case BoardActionTypes.SetShown:
      const updatedCard = {
        ...action.payload,
        shown: true,
      };
      const updatedCards = state.cards.map((card) => card.id === updatedCard.id ? updatedCard : card);
      return{
        ...state,
        cards: updatedCards,
      };

    case BoardActionTypes.SetMatch:
      const withRevealedCards = state.cards.map((card) => card.id === action.payload[0] || card.id === action.payload[1] ?
          {...card, revealed: true, shown: false} : card);
      return {
        ...state,
        cards: withRevealedCards,
        hiddenCards: state.hiddenCards - 2,
      };

    case BoardActionTypes.LoadSuccess:
        return{
          ...state,
          cards: action.payload
        };

    case BoardActionTypes.FlipBack:
      const flippedBackCards = state.cards.map((card) => (action.payload.includes(card) ? {...card, shown: false} : card));
      return{
        ...state,
        cards: flippedBackCards,
        disabled: false,
      };

    case BoardActionTypes.EmptyAction:
    default:
      return state;
  }
}
