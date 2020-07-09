import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateFidelityCardPage } from './create-fidelity-card.page';

describe('CreateFidelityCardPage', () => {
  let component: CreateFidelityCardPage;
  let fixture: ComponentFixture<CreateFidelityCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFidelityCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFidelityCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
