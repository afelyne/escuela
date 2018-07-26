import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the Pagina3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-pagina3',
	templateUrl: 'home.html'
})
export class HomePage {
	userData: any;
	sonsModel: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public menuCtrl: MenuController,
		private http: HttpClient,
		private apiProvider: ApiProvider
	) {
		this.menuCtrl.enable(true);
		this.sonsModel = '';
	}

	ngOnInit() {
		this.http.get(`${this.apiProvider.API_URL}/user/data`).subscribe((response) => {
			console.log(response);
			this.userData = response;
		});
	}
}
