import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly renderer: Renderer2;
  private currentTheme: string = 'light-theme';

  constructor(private readonly rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  loadTheme() {
    this.currentTheme = localStorage.getItem('theme') || 'light-theme';
    this.setTheme(this.currentTheme);
  }

  setTheme(themeName: string) {
    if (themeName === 'dark-theme') {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
    this.currentTheme = themeName;
    localStorage.setItem('theme', themeName);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}
