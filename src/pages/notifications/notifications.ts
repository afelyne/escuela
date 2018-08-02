import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
	userData: any;

  constructor(
			public navCtrl: NavController,
			public navParams: NavParams,
			private http: HttpClient,
			private apiProvider: ApiProvider, 
			public menuCtrl: MenuController
		) {
			this.menuCtrl.enable(true);
  }

	ngOnInit() {
		this.http.get(`${this.apiProvider.API_URL}/user/data`).subscribe((response) => {
			this.userData = response;			
		});
	}

}
