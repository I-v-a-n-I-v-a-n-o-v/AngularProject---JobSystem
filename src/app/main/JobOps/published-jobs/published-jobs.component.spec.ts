import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedJobsComponent } from './published-jobs.component';

describe('PublishedJobsComponent', () => {
  let component: PublishedJobsComponent;
  let fixture: ComponentFixture<PublishedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
