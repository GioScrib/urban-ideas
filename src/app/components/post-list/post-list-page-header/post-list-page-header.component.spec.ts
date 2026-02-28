import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListPageHeaderComponent } from './post-list-page-header.component';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PostListPageHeaderComponent', () => {
  let component: PostListPageHeaderComponent;
  let fixture: ComponentFixture<PostListPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostListPageHeaderComponent,
        BrowserAnimationsModule
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit grid columns when clicked', (done) => {
    component.gridCols.subscribe((cols: number) => {
      expect(cols).toBe(3);
      done();
    });

    component.onClickGridCols(3);
  });

  it('should emit new post event when clicked', (done) => {
    component.newPostClick.subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    component.onClickNewPost();
  });

  it('should emit search key when search value changes', (done) => {
    component.searchKey.subscribe((value: string) => {
      expect(value).toBe('test');
      done();
    });

    component.onSearchKey('test');
  });

  it('should have toolbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mat-toolbar')).toBeTruthy();
  });

  it('should have back button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const backButton = compiled.querySelector('a[routerLink="/users"]');
    expect(backButton).toBeTruthy();
  });

  it('should have new post button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('app-custom-button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should have search component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-custom-search')).toBeTruthy();
  });

  it('should have grid menu', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button[mat-icon-button]')).toBeTruthy();
  });
});
