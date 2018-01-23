import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewActionsComponent } from './tree-view-actions.component';

describe('TreeViewActionsComponent', () => {
  let component: TreeViewActionsComponent;
  let fixture: ComponentFixture<TreeViewActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeViewActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
