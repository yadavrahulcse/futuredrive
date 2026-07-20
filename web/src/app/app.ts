import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageSwitcherComponent } from './shared/language-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
