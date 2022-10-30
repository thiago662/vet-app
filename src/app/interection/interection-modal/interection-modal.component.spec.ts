import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterectionModalComponent } from './interection-modal.component';

describe('InterectionModalComponent', () => {
  let component: InterectionModalComponent;
  let fixture: ComponentFixture<InterectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterectionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
