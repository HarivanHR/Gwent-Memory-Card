import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from '../card/card.component';
import {StoreModule} from '@ngrx/store';
import {boardStateIdentifier} from './state/board.state';
import {reducer} from './state/board.reducer';
import {EffectsModule} from '@ngrx/effects';
import {BoardEffects} from './state/board.effects';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(boardStateIdentifier, reducer),
    EffectsModule.forFeature([BoardEffects]),
    MatCardModule,
  ],
  exports: [CardComponent]
})
export class BoardModule { }
