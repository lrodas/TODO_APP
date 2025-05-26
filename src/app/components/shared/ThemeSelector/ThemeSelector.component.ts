import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ThemeService } from '@services/Theme.service';

@Component({
  selector: 'theme-selector',
  imports: [],
  templateUrl: './ThemeSelector.component.html',
  styleUrl: './ThemeSelector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent {
  private readonly _themeService = inject(ThemeService);

  public toggleTheme(): void {
    this._themeService.toggleTheme();
  }
}
