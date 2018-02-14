import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamLookupComponent } from './param-lookup.component';

describe('ParamLookupComponent', () => {
  let component: ParamLookupComponent;
  let fixture: ComponentFixture<ParamLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
