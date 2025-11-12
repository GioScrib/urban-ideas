import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomButtonComponent } from './custom-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomButtonComponent,
        MatButtonModule,
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event when button is clicked', () => {
    spyOn(component.clicked, 'emit');

    component.onClick();

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should display extended button when matButtonContent is provided', () => {
    fixture.componentRef.setInput('matIconName', 'add');
    fixture.componentRef.setInput('matButtonContent', 'Add User');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');

    expect(button).toBeTruthy();
    expect(button?.textContent).toContain('Add User');
  });

  it('should display icon-only button when matButtonContent is empty', () => {
    fixture.componentRef.setInput('matIconName', 'delete');
    fixture.componentRef.setInput('matButtonContent', '');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('mat-icon');

    expect(icon).toBeTruthy();
    expect(icon?.textContent).toBe('delete');
  });

  it('should apply background color style', () => {
    fixture.componentRef.setInput('backGroundColor', '#FF0000');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;

    expect(button.style.getPropertyValue('--bg-color')).toBe('#FF0000');
  });

  it('should apply text color style', () => {
    fixture.componentRef.setInput('textColor', '#00FF00');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;

    expect(button.style.getPropertyValue('--txt-color')).toBe('#00FF00');
  });

  it('should apply wave color style', () => {
    fixture.componentRef.setInput('waveColor', '#0000FF');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;

    expect(button.style.getPropertyValue('--wave-color')).toBe('#0000FF');
  });

  it('should display the correct icon', () => {
    fixture.componentRef.setInput('matIconName', 'delete');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('mat-icon');

    expect(icon?.textContent).toBe('delete');
  });

  it('should trigger click event on button click', () => {
    spyOn(component, 'onClick');

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(component.onClick).toHaveBeenCalled();
  });
});
