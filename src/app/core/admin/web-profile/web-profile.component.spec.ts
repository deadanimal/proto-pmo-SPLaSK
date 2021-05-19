import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebProfileComponent } from './web-profile.component';

describe('WebProfileComponent', () => {
  let component: WebProfileComponent;
  let fixture: ComponentFixture<WebProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
