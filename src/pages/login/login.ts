import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
	login: any;
	signupForm: FormGroup;
	token: string;
	showError: any;

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public menuCtrl: MenuController,
		private http: HttpClient,
		private api: ApiProvider,
		private storage: Storage,
		private formBuilder: FormBuilder,
		private jwtHelper: JwtHelperService,
		public loadingCtrl: LoadingController
	) {
		this.menuCtrl.enable(false);
		this.login = {};
		this.showError = '';
	}

	ngOnInit() {
		this.storage.get('access_token').then((token) => {
			this.token = token;
			this.validateToken();
		});

		this.signupForm = this.formBuilder.group({
			usr: new FormControl('', Validators.compose([Validators.required])),
			pword: new FormControl('', Validators.compose([Validators.required]))
		});
	}

	validateToken() {
		if (this.token !== null && this.token !== '') {
			if (this.jwtHelper.isTokenExpired(this.token)) {
				this.navCtrl.setRoot(HomePage);
			}
		}
	}

	onSubmit() {
		let loading = this.loadingCtrl.create({
			content: 'Cargando...'
		});
		loading.present();
		if (this.signupForm.valid) {
			this.showError = '';
			this.http
				.post(`${this.api.API_URL}user/login`, {
					usr: this.login.usr,
					pword: this.login.pword
				})
				.subscribe((response) => {
					if( response['valid']) {
						this.storage.set('access_token', response['response']);
						setTimeout(() => {
							loading.dismiss();
							this.navCtrl.setRoot(HomePage);
						}, 1000)
					} else {
						this.showError = response['response'];
						loading.dismiss();
					}
				});
		}
	}
}
