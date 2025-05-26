import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/Theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private readonly _themeService: ThemeService = inject(ThemeService);
  title = 'todo_app';

  ngOnInit(): void {
    this._themeService.loadTheme();
  }
}
