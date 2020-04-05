import { Component, OnInit } from '@angular/core';
import { CreateWidgetPage } from '../create-widget/create-widget.page';
import { WidgetService } from '../../services/widget-service.';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-widget',
  templateUrl: '../create-widget/create-widget.page.html',
  styleUrls: ['./edit-widget.page.scss'],
})
export class EditWidgetPage  extends CreateWidgetPage implements OnInit {

  constructor(public modalCtrl: ModalController,public service:WidgetService) {
    super(modalCtrl,service);
    this.title = 'modifica widget'
  }

  ngOnInit() {
  }

}
