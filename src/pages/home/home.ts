import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Pagina3Page} from '../pagina3/pagina3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public menuCtrl: MenuController) {

    this.menuCtrl.enable(false);

  }

goPagina3():void{
  this.navCtrl.setRoot(Pagina3Page);
}

}
