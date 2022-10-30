import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterectionComponent } from './interection.component';

describe('InterectionComponent', () => {
  let component: InterectionComponent;
  let fixture: ComponentFixture<InterectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
