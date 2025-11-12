import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../../services/users/api.service';
import { User } from '../../../shared/user';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    gender: 'male',
    status: 'active'
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    mockApiService = jasmine.createSpyObj('ApiService', ['addUserIdImgMapping']);

    await TestBed.configureTestingModule({
      imports: [
        UserCardComponent,
        HttpClientTestingModule,
        MatExpansionModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('user', mockUser);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user data', () => {
    expect(component.user()).toEqual(mockUser);
  });

  it('should generate male user image URL on init', () => {
    expect(component.userImg).toContain('notionists');
    expect(component.userImg).toContain('seed=1');
  });

  it('should generate female user image URL for female users', () => {
    const femaleUser: User = { ...mockUser, gender: 'female', id: 2 };
    fixture.componentRef.setInput('user', femaleUser);
    component.ngOnInit();

    expect(component.userImg).toContain('notionists');
    expect(component.userImg).toContain('seed=2');
  });

  it('should call addUserIdImgMapping on init', () => {
    expect(mockApiService.addUserIdImgMapping).toHaveBeenCalledWith(
      mockUser.id,
      jasmine.any(String)
    );
  });

  it('should emit delete event when delete button clicked', (done) => {
    component.delete.subscribe((id: number) => {
      expect(id).toBe(mockUser.id);
      done();
    });

    component.onClickDeleteButton();
  });

  it('should navigate to user details when openDetails is called', async () => {
    await component.openDetails();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users', mockUser.id]);
  });

  it('should display user name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameElement = compiled.querySelector('.user-card-info span');
    expect(nameElement?.textContent).toContain(mockUser.name);
  });

  it('should have expansion panel', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-expansion-panel')).toBeTruthy();
  });

  it('should initialize panelOpenState2 as false', () => {
    expect(component.panelOpenState2()).toBe(false);
  });

  it('should render user image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector('.user-card-header img') as HTMLImageElement;
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain('dicebear.com');
  });
});
