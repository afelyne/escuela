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
	availableAPIS: any;
	selectedAPI: String;

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public menuCtrl: MenuController,
		private http: HttpClient,
		private apiProvider: ApiProvider,
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

		this.http.get(this.apiProvider.API_SELECTOR + '?admin=chi').subscribe(
			(response) => {
				this.availableAPIS = response;
			},
			(err) => {
				console.log(err);
			}
		);

		this.signupForm = this.formBuilder.group({
			usr: new FormControl('', Validators.compose([Validators.required])),
			pword: new FormControl('', Validators.compose([Validators.required])),
			api: new FormControl(
				'',
				Validators.compose([Validators.required, Validators.minLength(1)])
			)
		});
	}

	validateToken() {
		if (this.token !== null && this.token !== '') {
			if (this.jwtHelper.isTokenExpired(this.token)) {
				this.storage.get('api_url').then((url) => {
					this.apiProvider.API_URL = url;
					this.navCtrl.setRoot(HomePage);
				});
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
			this.apiProvider.API_URL = this.login.api;
			this.http
				.post(`${this.apiProvider.API_URL}user/login`, {
					usr: this.login.usr,
					pword: this.login.pword
				})
				.subscribe(
					(response) => {
						if (response['valid']) {
							this.storage.set('access_token', response['response']);
							this.storage.set('api_url', this.apiProvider.API_URL);
							setTimeout(() => {
								loading.dismiss();
								this.navCtrl.setRoot(HomePage);
							}, 1000);
						} else {
							this.showError = response['response'];
							loading.dismiss();
						}
					},
					(err) => {
						console.log(err);

						loading.dismiss();
						let alert = this.alertCtrl.create({
							title: 'Error al acceder',
							subTitle: 'Revisa tu conexión a internet e intentalo de nuevo',
							buttons: ['OK']
						});
						alert.present();
					}
				);
		}
	}
}
