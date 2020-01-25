import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InfoService } from './modules/info/services/info/info.service'
import { Router } from '@angular/router'
import { configs } from './configs/credentials';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Categorie',
      url: '/categorie',
      icon: 'pricetags'
    },
    {
      title: 'Pagamenti',
      url: '/pagamenti',
      icon: 'cash'
    },
    {
      title: 'Fornitori',
      url: '/fornitori',
      icon: 'people'
    },
    {
      title: 'Carrelli della spesa',
      url: '/shopping-karts',
      icon: 'cart'
    },
    /* {
       title: 'Grafici',
       url: '/graphs',
       icon: 'stats'
     }, */
    {
      title: 'info',
      url: '/info/release',
      icon: 'information-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private info: InfoService,
    private router: Router,
  ) {
    this.initializeApp();
    if (!firebase.apps.length) {
      firebase.initializeApp(configs.firebase);
      // const  cat = this.categoriesService.getDummyItem();
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
