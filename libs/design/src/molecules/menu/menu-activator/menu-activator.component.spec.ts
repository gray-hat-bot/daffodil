import {
  Component,
  DebugElement,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { DaffMenuModule } from '../menu.module';
import { DaffMenuService } from '../service/menu.service';
import { provideTestMenuService } from '../testing/dummy-service';
import { DaffMenuActivatorDirective } from './menu-activator.component';

@Component({ template: `
  <button daffMenuActivator="menu"></button>
  <daff-menu #menu></daff-menu>
` })
class WrapperComponent {}

describe('DaffMenuActivatorDirective', () => {
  let fixture: ComponentFixture<WrapperComponent>;
  let de: DebugElement;
  let component: DaffMenuActivatorDirective;
  let menuActivatorButton: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DaffMenuModule,
      ],
      declarations: [
        WrapperComponent,
      ],
      providers: [
        provideTestMenuService(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();

    de = fixture.debugElement.query(By.directive(DaffMenuActivatorDirective));
    component = de.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the menu when the button is clicked', () => {
    const menuService = TestBed.inject(DaffMenuService);
    (<BehaviorSubject<boolean>>menuService.open$).next(false);
    expect((<BehaviorSubject<boolean>>menuService.open$).value).toEqual(false);
    const event = new MouseEvent('click',{});
    de.nativeElement.dispatchEvent(event);
    expect((<BehaviorSubject<boolean>>menuService.open$).value).toEqual(true);
  });

  it('should focus the button when focus is called', () => {
    expect(document.activeElement).not.toEqual(de.nativeElement);
    const activator = de.injector.get(DaffMenuActivatorDirective);
    activator.focus();
    expect(document.activeElement).toEqual(de.nativeElement);
  });

  it('should be marked `open` when the menu is open', () => {
    const menuService = TestBed.inject(DaffMenuService);
    (<BehaviorSubject<boolean>>menuService.open$).next(true);
    fixture.detectChanges();
    const activator = de.injector.get(DaffMenuActivatorDirective);
    expect(activator.openClass).toBeTrue();
  });
});
