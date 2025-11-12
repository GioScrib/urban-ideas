import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomGridComponent } from './custom-grid.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-host',
  standalone: true,
  imports: [CustomGridComponent],
  template: `
    <app-custom-grid [gridCols]="cols">
      <div class="test-item">Item 1</div>
      <div class="test-item">Item 2</div>
      <div class="test-item">Item 3</div>
    </app-custom-grid>
  `
})
class TestHostComponent {
  cols = 3;
}

describe('CustomGridComponent', () => {
  let component: CustomGridComponent;
  let fixture: ComponentFixture<CustomGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default gridCols of 1', () => {
    expect(component.gridCols()).toBe(1);
  });

  it('should accept gridCols input', () => {
    fixture.componentRef.setInput('gridCols', 3);
    fixture.detectChanges();

    expect(component.gridCols()).toBe(3);
  });

  it('should apply grid columns as CSS variable', () => {
    fixture.componentRef.setInput('gridCols', 2);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const gridContainer = compiled.querySelector('.grid-container') as HTMLElement;

    expect(gridContainer.style.getPropertyValue('--cols')).toBe('2');
  });

  it('should render grid container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const gridContainer = compiled.querySelector('.grid-container');

    expect(gridContainer).toBeTruthy();
  });
});

describe('CustomGridComponent with projected content', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomGridComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should project content into grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.test-item');

    expect(items.length).toBe(3);
  });

  it('should update grid columns when input changes', () => {
    hostComponent.cols = 2;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const gridContainer = compiled.querySelector('.grid-container') as HTMLElement;

    expect(gridContainer.style.getPropertyValue('--cols')).toBe('2');
  });
});
