import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { ThemeService } from '@services/Theme.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeSelectorComponent } from "../../components/shared/ThemeSelector/ThemeSelector.component";

@Component({
  selector: 'home',
  imports: [
    ReactiveFormsModule,
    ThemeSelectorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  public formTodo!: FormGroup;
  public isDesktop: boolean = false;

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _deviceService: DeviceDetectorService = inject(DeviceDetectorService);
  private readonly _themeService: ThemeService = inject(ThemeService);

  public ngOnInit(): void {
    this.isDesktop = this._deviceService.isDesktop();

    this.formTodo = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  public  getBackgroundImage(): string {
    const isMobile = this._deviceService.isMobile();

    const theme = this._themeService.getCurrentTheme();
    const imageType = isMobile ? 'mobile' : 'desktop';
    const themeSuffix = theme === 'dark-theme' ? 'dark' : 'light';
    const imagePath = `assets/images/bg-${imageType}-${themeSuffix}.jpg`;
    return `url(${imagePath})`;
  }
}
