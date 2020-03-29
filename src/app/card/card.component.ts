import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Card} from './card';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // animations: [trigger('flipped', [
  //   state('back', style({
  //     transform: 'rotateY(0deg)'
  //   })),
  //   state('front', style({
  //     transform: 'rotateY(180deg)'
  //   })),
  //   transition('back => front', [
  //     animate('1s 0s ease-out',
  //       keyframes([
  //         style({
  //           transform: 'perspective(400px) rotateY(0deg)',
  //           offset: 0
  //         }),
  //         style({
  //           transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(80deg)',
  //           offset: 0.4
  //         }),
  //         style({
  //           transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(100deg)',
  //           offset: 0.5
  //         }),
  //         style({
  //           transform: 'perspective(400px) scale3d(0.95, 0.95, 0.95) rotateY(180deg)',
  //           offset: 0.8
  //         }),
  //         style({
  //           transform: 'perspective(400px) rotateY(180deg)',
  //           offset: 1
  //         })
  //       ]))
  //   ]),
  //   transition('front => back', [
  //     animate('1s 0s ease-in',
  //       keyframes([
  //         style({
  //           transform: 'perspective(400px) rotateY(180deg)',
  //           offset: 0
  //         }),
  //         style({
  //           transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(100deg)',
  //           offset: 0.4
  //         }),
  //         style({
  //           transform: 'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(80deg)',
  //           offset: 0.5
  //         }),
  //         style({
  //           transform: 'perspective(400px) scale3d(0.95, 0.95, 0.95) rotateY(0deg)',
  //           offset: 0.8
  //         }),
  //         style({
  //           transform: 'perspective(400px) rotateY(0deg)',
  //           offset: 1
  //         })
  //       ]))
  //   ])
  // ]),
  // ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnChanges {
  @Input() card: Card;
  shown = false;
  // flip = 'cardBack';
  @HostBinding('attr.disabled') get isDisabled() {
    return (this.shown || this.card?.revealed) ? 'disabled' : undefined;
  }

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) {

  }

  ngOnInit(): void {
    this.el.nativeElement.style.setProperty('--front-image', `url("/assets/${this.card.front}")`);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.card) {
      if (!changes.card.firstChange && changes.card.currentValue.shown) {
        this.shown = true;
        // this.flip = 'front';
      } else {
        if (!changes.card.currentValue.shown && !changes.card.firstChange) {
          this.shown = true;
          // this.flip = 'front';
          setTimeout(() => {
            this.shown = false;
            // this.flip = 'back';
            this.cdr.markForCheck();
          }, 2000);
        }
      }
    }
  }


}
