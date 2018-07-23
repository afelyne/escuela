import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Pagina3PageModule } from '../pages/pagina3/pagina3.module';
import { ApiProvider } from '../providers/api/api';

export function jwtOptionsFactory(storage) {
	return {
		tokenGetter: () => {
			return storage.get('access_token');
		}
	};
}

@NgModule({
	declarations: [MyApp, HomePage, ListPage],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		Pagina3PageModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
		JwtModule.forRoot({
			config: {
				headerName: 'Jwt-Authorization'
			},
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtOptionsFactory,
				deps: [Storage]
			}
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp, HomePage, ListPage],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ApiProvider
	]
})
export class AppModule {}
