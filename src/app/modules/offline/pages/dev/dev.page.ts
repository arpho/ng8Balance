import { Component, OnInit } from '@angular/core';
import { thresholdFreedmanDiaconis } from 'd3';
import { PeristenceService } from '../../services/persistence.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.page.html',
  styleUrls: ['./dev.page.scss'],
})
export class DevPage implements OnInit {

  constructor(public db:PeristenceService) { }

  ngOnInit() {
    this.db.has('categories').subscribe(v=>{
      console.log('ha categorie',v)
    })

    this.db.keys().subscribe({
      next: (key) => {
        console.log('chiave: ',key);
      },
      complete: () => {
        console.log('Done');
      },
    })

    this.db.clear().subscribe(v=>{
      console.log('deleted',v)
    })
    this.db.size().subscribe(n=> {
      console.log(`ci sono ${n} elementi`)
    })
  }

}
