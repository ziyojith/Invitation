import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  trigger, style, animate, transition, query, stagger
} from '@angular/animations';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
  animations: [
    trigger('fromRight', [
      transition('hidden=>visible', [
        style({ transform: 'translateX(40%)', opacity: 0 }),
        animate('700ms ease-out', style({ transform: 'translate(0%)', opacity: 1 }))
      ])
    ]),
    trigger('fromLeft', [
      transition('hidden => visible', [
        style({ transform: 'translateX(-30%)', opacity: 0 }),
        animate('700ms ease-out', style({ transform: 'translate(0%)', opacity: 1 }))
      ])
    ]),
    trigger('fromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('1500ms ease-out', style({ transform: 'translate(0%)', opacity: 1 }))
      ])
    ]),
    trigger('fromBottom', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('1500ms ease-out', style({ transform: 'translate(0%)', opacity: 1 }))
      ])
    ]),
    trigger('bloom', [
      transition('hidden => visible', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('lettersAni', [
      transition(':enter', [
        query('span', [
          style({ transform: 'translateY(0)', opacity: 0 }),
          stagger(100, [
            animate('3000ms linear', style({ transform: 'translateY(0px)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class InviteComponent implements OnInit, OnDestroy {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  countdown: any;
  isplay = false;
  wedDate = new Date('2025-10-27T10:00:00').getTime();
  isVisible: { [key: string]: boolean } = {};
  
  toggle(audio:HTMLAudioElement){
    if(audio.paused)
    {
      audio.play();
      this.isplay=true;
    }
    else{
      audio.pause();
      this.isplay=false;
    }

    
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    const initialCalc = this.wedDate - new Date().getTime();
    if(initialCalc > 0) {
      this.calculateTime(initialCalc); // set initial countdown values
    }

    if (isPlatformBrowser(this.platformId)) {
      this.startCount();
      this.observeEls();
      this.setupAudio();
      
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.countdown);
  }
   
  startCount() {
    this.countdown = setInterval(() => {
      const calc = this.wedDate - new Date().getTime();
      if (calc > 0) {
        this.calculateTime(calc);
      } else {
        clearInterval(this.countdown);
        this.days = this.hours = this.minutes = this.seconds = 0;
      }
    }, 1000);
  }
  observeEls(){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          this.isVisible[entry.target.id]=true;
          observer.unobserve(entry.target);

        }
      });
    },
    {threshold:0.4}
  );
  const elements = document.querySelectorAll('.aos')
   elements.forEach(el => observer.observe(el));
  }
  setupAudio() {
    const audio = document.getElementById('myAudio') as HTMLAudioElement | null;
    if (!audio) return;

    // Play audio on first click
    const playAudio = () => {
      audio.play().catch(e => console.log('Autoplay prevented:', e));
      document.removeEventListener('click', playAudio); // remove listener after first play
    };
    document.addEventListener('click', playAudio);
  }

  calculateTime(calc: number) {
    this.days = Math.floor(calc / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((calc % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((calc % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((calc % (1000 * 60)) / 1000);
  }
}
