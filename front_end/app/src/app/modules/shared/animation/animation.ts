import { trigger, state, style, animate, transition, query, animateChild, group, sequence, AnimationMetadata  } from '@angular/animations';

const animationOpacityMetadata: AnimationMetadata[] = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
        style({opacity: '0'}),
    ]),
    sequence([
        query(':leave', [
            animate('300ms ease-in', style({ opacity: '0'})),
        ], { optional: true }),
        query(':enter', [
            animate('300ms ease-in', style({ opacity: '1'}))
        ], ),
    ])
  ];

const animationSlideInMetadata: AnimationMetadata[] = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%'
    })
  ], {optional: true}),
  query(':enter', [
      style({top: '-100%'}),
  ]),
  sequence([
      query(':leave', [
          animate('300ms ease-in', style({ opacity: '0'})),
      ], {optional: true}),
      query(':enter', [
          animate('300ms ease-in', style({ top: '0'}))
      ]),
  ])
];

const animationSlideOutMetadata: AnimationMetadata[] = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
      style({opacity: '0'}),
  ]),
  sequence([
      query(':leave', [
          animate('300ms ease-in', style({ top: '-100%'})),
      ]),
      query(':enter', [
          animate('300ms ease-in', style({ opacity: '1'}))
      ]),
  ])
];

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Slide => *', animationSlideOutMetadata),
    // transition('void => Slide', animationSlideInFromEmtyMetadata),
    transition('* => Slide', animationSlideInMetadata),
    transition('Homes <=> Clients', animationOpacityMetadata),
    transition('Homes <=> Deals', animationOpacityMetadata),
    transition('Homes <=> Dashboard', animationOpacityMetadata),
    transition('Homes <=> Login', animationOpacityMetadata),
    transition('Deals <=> Clients', animationOpacityMetadata),
    transition('Dashboard <=> Clients', animationOpacityMetadata),
    transition('Dashboard <=> Deals', animationOpacityMetadata),
    transition('Dashboard <=> Login', animationOpacityMetadata),
    transition('Deals <=> Login', animationOpacityMetadata),
    transition('Clients <=> Login', animationOpacityMetadata),
    transition('Registration <=> Login', animationOpacityMetadata),
  ]);
