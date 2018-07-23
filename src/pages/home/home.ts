import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Pagina3Page } from '../pagina3/pagina3';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

import {
	FormBuilder,
	FormGroup,
	Validators,
	AbstractControl,
	FormControl
} from '@angular/forms';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	login: any;
	signupForm: FormGroup;

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public menuCtrl: MenuController,
		private http: HttpClient,
		private api: ApiProvider,
		private storage: Storage,
		private formBuilder: FormBuilder
	) {
		this.menuCtrl.enable(false);
		this.login = {};
	}

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
			usr: new FormControl('', Validators.compose([Validators.required])),
			pword: new FormControl(
				'',
				Validators.compose([Validators.required])
			)
		});
	}

	onSubmit() {
		if (this.signupForm.valid) {
			this.http
				.post(`${this.api.API_URL}user/login`, {
					usr: this.login.usr,
					pword: this.login.pword
				})
				.subscribe(response => {
					this.storage.set('access_token', response);
				});
		}
	}
}
