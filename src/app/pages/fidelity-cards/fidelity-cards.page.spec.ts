import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FidelityCardsPage } from './fidelity-cards.page';

describe('FidelityCardsPage', () => {
  let component: FidelityCardsPage;
  let fixture: ComponentFixture<FidelityCardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FidelityCardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FidelityCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
