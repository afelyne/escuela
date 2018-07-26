import { NgModule, LOCALE_ID } from '@angular/core';
import { SonComponent } from './son/son';
import { registerLocaleData } from '@angular/common';

import { NgCalendarModule } from 'ionic2-calendar';
import localeMX from '@angular/common/locales/es-MX';

registerLocaleData(localeMX);

@NgModule({
	declarations: [SonComponent],
	imports: [NgCalendarModule],
	providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
	exports: [SonComponent]
})
export class ComponentsModule {}
