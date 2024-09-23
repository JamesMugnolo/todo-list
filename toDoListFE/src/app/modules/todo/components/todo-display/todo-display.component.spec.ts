import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDisplayComponent } from './todo-display.component';

describe('TodoDisplayComponent', () => {
  let component: TodoDisplayComponent;
  let fixture: ComponentFixture<TodoDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
