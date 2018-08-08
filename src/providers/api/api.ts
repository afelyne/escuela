import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
	API_URL: string;

	constructor(public http: HttpClient) {
		this.API_URL = 'http://apic5.fdgautomation.com/v1/';
	}
}
