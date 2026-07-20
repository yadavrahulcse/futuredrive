import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageSwitcherComponent } from './shared/language-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterLink, RouterLinkActive, RouterOutlet, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
