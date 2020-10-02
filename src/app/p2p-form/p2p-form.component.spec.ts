import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pFormComponent } from './p2p-form.component';

describe('P2pFormComponent', () => {
  let component: P2pFormComponent;
  let fixture: ComponentFixture<P2pFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P2pFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
