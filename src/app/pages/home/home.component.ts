import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

import { ThemeService } from '@services/Theme.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeSelectorComponent } from "../../components/shared/ThemeSelector/ThemeSelector.component";
import { Todo } from '@models/todo.model';
import { TodoService } from '@services/todo.service';

@Component({
  selector: 'home',
  imports: [
    ReactiveFormsModule,
    ThemeSelectorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  public formTodo!: FormGroup;
  public isDesktop: boolean = false;
  public todos: Todo[] = [];
  public filteredTodos: Todo[] = [];
  public filter: 'all' | 'completed' | 'pending' = 'all';
  public active: boolean = true;

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _deviceService: DeviceDetectorService = inject(DeviceDetectorService);
  private readonly _themeService: ThemeService = inject(ThemeService);
  private readonly _todoService: TodoService = inject(TodoService);

  public ngOnInit(): void {
    this.isDesktop = this._deviceService.isDesktop();

    this.formTodo = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });

    this.retrieveTodos();
  }

  public  getBackgroundImage(): string {
    const isMobile = this._deviceService.isMobile();

    const theme = this._themeService.getCurrentTheme();
    const imageType = isMobile ? 'mobile' : 'desktop';
    const themeSuffix = theme === 'dark-theme' ? 'dark' : 'light';
    const imagePath = `assets/images/bg-${imageType}-${themeSuffix}.jpg`;
    return `url(${imagePath})`;
  }

  public addTodo(): void {
    if (this.formTodo.valid) {
      const todo: Todo = this.formTodo.value;
      this._todoService.addTodo(todo);
      this.formTodo.reset();
      this.retrieveTodos();
    } else {
      console.error('Formulario inválido');
    }
  }

  trackByFn(index: number, todo: any): string {
    return todo.id;
  }

  public retrieveTodos(): void {
    this.todos = this._todoService.retrieveTodos();
    this.filterTodos();
  }

  public filterTodos(): void {
    switch (this.filter) {
      case 'completed':
        this.filteredTodos = this.todos.filter(todo => todo.completed);
        break;
      case 'pending':
        this.filteredTodos = this.todos.filter(todo => !todo.completed);
        break;
      default:
        this.filteredTodos = [...this.todos];
    }
  }

  public toggleTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this._todoService.updateTodo(todo);
    this.retrieveTodos();
  }

  public retrievePendingTodos(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  public clearCompletedTodos(): void {
    this._todoService.clearCompletedTodos();
    this.retrieveTodos();
  }
}
