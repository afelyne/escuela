import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePageModule } from '../pages/home/home.module';
import { ApiProvider } from '../providers/api/api';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';

export function jwtOptionsFactory(storage) {
	return {
		tokenGetter: () => {
			return storage.get('access_token');
		},
		whitelistedDomains: [
			'localhost:8100',
			'apic5.fdgautomation.com',
			'apic5.dyndns.org',
			'cetis5.dyndns.org',
			'cetis33.dyndns.org'
		],
		authScheme: ''
	};
}

@NgModule({
	declarations: [MyApp, LoginPage],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HomePageModule,
		NotificationsPageModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
		JwtModule.forRoot({
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtOptionsFactory,
				deps: [Storage]
			}
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp, LoginPage],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ApiProvider
	]
})
export class AppModule {}
