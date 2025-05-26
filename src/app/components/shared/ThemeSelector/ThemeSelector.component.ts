import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { ThemeService } from '@services/Theme.service';

@Component({
  selector: 'theme-selector',
  imports: [],
  templateUrl: './ThemeSelector.component.html',
  styleUrl: './ThemeSelector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent implements OnInit {
  public currentIcon: string = 'icon-moon.svg';
  private readonly _themeService = inject(ThemeService);

  ngOnInit(): void {
    if (this._themeService.getCurrentTheme() === 'dark-theme') {
      this.currentIcon = 'icon-sun.svg';
    } else {
      this.currentIcon = 'icon-moon.svg';
    }
  }

  public toggleTheme(): void {
    this._themeService.toggleTheme();
    this.currentIcon = this._themeService.getCurrentTheme() === 'dark-theme' ? 'icon-sun.svg' : 'icon-moon.svg';
  }
}
