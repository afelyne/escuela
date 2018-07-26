import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';
import { subMonths, addMonths, addHours, addMinutes, getMonth, getYear, format } from 'date-fns';
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
export class SonComponent implements OnInit, AfterViewInit {
	calendar = {
		locale: 'es-MX',
		mode: 'month',
		currentDate: new Date(),
		dateFormatter: {
			formatMonthViewDay: function(date: Date) {
				return date.getDate().toString();
			},
			formatMonthViewDayHeader: function(date: Date) {
				return 'MonMH';
			},
			formatMonthViewTitle: function(date: Date) {
				return 'testMT';
			},
			formatWeekViewDayHeader: function(date: Date) {
				return 'MonWH';
			},
			formatWeekViewTitle: function(date: Date) {
				return 'testWT';
			},
			formatWeekViewHourColumn: function(date: Date) {
				return 'testWH';
			},
			formatDayViewHourColumn: function(date: Date) {
				return 'testDH';
			},
			formatDayViewTitle: function(date: Date) {
				return 'testDT';
			}
		}
	};

	eventSource: any;
	viewTitle: string;

	@Input('sonData') sonData: any;
	@ViewChild(CalendarComponent) myCalendar: CalendarComponent;

	sonAssistency: any;
	mySwiper: any;
	lockSwipes: boolean;

	constructor(private http: HttpClient, private api: ApiProvider) {
		this.lockSwipes = false;
	}

	ngOnInit() {
		this.http
			.get(`${this.api.API_URL}alumno/asistencia/${this.sonData.id_hijo}`)
			.subscribe((response) => {
				this.sonAssistency = response;
				this.buildCalendarData();
			});
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.lockSwipes = true;
		}, 1000);
	}

	buildCalendarData() {
		this.eventSource = this.sonAssistency.filter((item) => {
			return item.id_acceso !== 0;
		});

		this.eventSource = this.eventSource.map((item) => {
			let event = {};

			let startHour = item.h_entrada.split(':');
			let endHour = item.h_salida.split(':');
			event['title'] = 'Asistencia';
			event['startTime'] = addHours(
				addMinutes(new Date(item.fecha), startHour[1]),
				startHour[0]
			);
			event['endTime'] = addHours(addMinutes(new Date(item.fecha), endHour[1]), endHour[0]);

			return event;
		});

		this.myCalendar.loadEvents();
	}

	previousMonth() {
		this.calendar.currentDate = subMonths(new Date(this.calendar.currentDate), 1);
		let year = getYear(this.calendar.currentDate);
		let month = getMonth(this.calendar.currentDate);
		let initialDate = format(new Date(year, month, 1), 'YYYY-MM-DD');
		let finalDate = format(addMonths(initialDate, 1), 'YYYY-MM-DD');
		this.http
			.get(
				`${this.api.API_URL}alumno/asistencia/${
					this.sonData.id_hijo
				}?fini=${initialDate}&ffin=${finalDate}`
			)
			.subscribe((response) => {
				this.sonAssistency = response;
				this.buildCalendarData();
			});

		//http://apic5.arceoconde.com/v1/alumno/asistencia/12?fini=2018-06-01&ffin=2018-06-15
	}

	nextMonth() {
		this.calendar.currentDate = addMonths(new Date(this.calendar.currentDate), 1);

		let year = getYear(this.calendar.currentDate);
		let month = getMonth(this.calendar.currentDate);
		let initialDate = format(new Date(year, month, 1), 'YYYY-MM-DD');
		let finalDate = format(addMonths(initialDate, 1), 'YYYY-MM-DD');
		this.http
			.get(
				`${this.api.API_URL}alumno/asistencia/${
					this.sonData.id_hijo
				}?fini=${initialDate}&ffin=${finalDate}`
			)
			.subscribe((response) => {
				this.sonAssistency = response;
				this.buildCalendarData();
			});
	}

	onCurrentDateChanged(event) {}

	reloadSource(startTime, endTime) {}

	onEventSelected($event) {}

	onViewTitleChanged(title) {
		this.viewTitle = title;
	}

	onTimeSelected($event) {}

	getCustomClass(events) {
		console.log(events);
	}
}
