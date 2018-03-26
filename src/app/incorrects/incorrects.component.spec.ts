import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectsComponent } from './incorrects.component';

describe('IncorrectsComponent', () => {
  let component: IncorrectsComponent;
  let fixture: ComponentFixture<IncorrectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorrectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
