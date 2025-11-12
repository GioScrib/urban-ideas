import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomSearchComponent } from './custom-search.component';
import { FormsModule } from '@angular/forms';

describe('CustomSearchComponent', () => {
  let component: CustomSearchComponent;
  let fixture: ComponentFixture<CustomSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomSearchComponent,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with search not visible', () => {
    expect(component.isSearchVisible).toBe(false);
  });

  it('should initialize with empty input value', () => {
    expect(component.inputValue()).toBe('');
  });

  it('should toggle search visibility on click', () => {
    expect(component.isSearchVisible).toBe(false);

    component.onClickSearch();

    expect(component.isSearchVisible).toBe(true);

    component.onClickSearch();

    expect(component.isSearchVisible).toBe(false);
  });

  it('should reset input value when hiding search', () => {
    component.isSearchVisible = true;
    component.inputValue.set('test');

    component.onClickSearch();

    expect(component.inputValue()).toBe('');
    expect(component.isSearchVisible).toBe(false);
  });

  // it('should emit search key when input value changes', (done) => {
  //   component.searchKey.subscribe((value: string) => {
  //     expect(value).toBe('test search');
  //     done();
  //   });
  //
  //   component.inputValue.set('test search');
  // });

  // it('should emit empty string when search is closed', (done) => {
  //   component.isSearchVisible = true;
  //   component.inputValue.set('previous search');
  //
  //   let emitCount = 0;
  //   component.searchKey.subscribe((value: string) => {
  //     emitCount++;
  //     if (emitCount === 2) {
  //       expect(value).toBe('');
  //       done();
  //     }
  //   });
  //
  //   component.onClickSearch();
  // });

  it('should display search button when search is not visible', () => {
    component.isSearchVisible = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const searchButton = compiled.querySelector('app-custom-button');

    expect(searchButton).toBeTruthy();
  });

  it('should display input field when search is visible', () => {
    component.isSearchVisible = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input.search-input');

    expect(input).toBeTruthy();
  });

  it('should show close icon when search is visible', () => {
    component.isSearchVisible = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('app-custom-button');

    expect(buttons.length).toBeGreaterThan(0);
  });

  // it('should bind input value correctly', () => {
  //   component.isSearchVisible = true;
  //   component.inputValue.set('test value');
  //   fixture.detectChanges();
  //
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const input = compiled.querySelector('input.search-input') as HTMLInputElement;
  //
  //   expect(input.value).toBe('test value');
  // });
});
