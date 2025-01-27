import { Component } from '@angular/core';

declare var particlesJS: any; // Declare particlesJS globally

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  ngOnInit(): void {
    particlesJS.load('particles-container', 'assets/error-particles-config.json', () => {
      console.log('Particles.js config loaded successfully!');
    });
  }

}
