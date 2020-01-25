import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShoppingKartPage } from './create-shopping-kart.page';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CreateShoppingKartPage', () => {
  let component: CreateShoppingKartPage;
  let fixture: ComponentFixture<CreateShoppingKartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateShoppingKartPage],
      providers: [ModalController, AngularDelegate, HttpClient, HttpHandler],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShoppingKartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
