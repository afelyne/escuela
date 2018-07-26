import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';
import { format, compareAsc } from 'date-fns';
import { CalendarComponent } from 'ionic2-calendar/calendar';

/**
 * Generated class for the SonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
	selector: 'son',
	templateUrl: 'son.html'
})
export class SonComponent implements OnInit {
	calendar = {
		locale: 'es-MX',
		mode: 'month',
		currentDate: new Date()
	};

	eventSource: any;

	@Input('sonData') sonData: any;
	@ViewChild(CalendarComponent) myCalendar: CalendarComponent;

	sonAssistency: any;

	constructor(private http: HttpClient, private api: ApiProvider) {}

	ngOnInit() {
		this.http
			.get(`${this.api.API_URL}alumno/asistencia/${this.sonData.id_hijo}`)
			.subscribe((response) => {
				this.sonAssistency = response;
				this.buildCalendarData();
			});
	}

	buildCalendarData() {
		this.eventSource = this.sonAssistency.map((item) => {
			let event = {};
			event['allDay'] = item.id_acceso === 0 ? true : false;
			if (event['allDay']) {
				event['title'] = item.h_entrada;
				event['startTime'] = new Date(item.fecha);
				event['endTime'] = new Date(item.fecha);
			} else {
				event['title'] = 'Evento';
				event['startTime'] = new Date(item.fecha + item.h_entrada);
				event['endTime'] = new Date(item.fecha + item.h_salida);
			}
			return event;
		});

		this.myCalendar.loadEvents();
	}

	onCurrentDateChanged(event) {}

	reloadSource(startTime, endTime) {}

	onEventSelected($event) {}

	onViewTitleChanged($event) {}

	onTimeSelected($event) {}
}
