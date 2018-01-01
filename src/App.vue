<template>
	<div id="app">
		<div class="app-description">
			<h1>vue-calendar-view 2.0.0</h1>

			<p>Below is an example of vue-simple-calendar. You can drag and drop events to change the start date (this
				functionality is optional and controlled by the calling app).</p>

			<p>Note that this demo page has some examples of custom styles -- the holiday icons. As you can see from the
				source, it's easy to customize the style to meet your needs. I've purposefully tried to choose defaults
				that are modern and clean without getting so complicated that they would be difficult to override.</p>

			<h3>{{ message }}</h3>

			<button @click="clickTestAddEvent" :disabled="alreadyAdded">Add Event on 22nd-23rd</button>

			<p>Period UOM:
					<select v-model="displayPeriodUom">
						<option>month</option>
						<option>week</option>
						<option>year</option>
					</select>
			</p>

			<p>Period Count:
					<select v-model="displayPeriodCount">
						<option :value="1">1</option>
						<option :value="2">2</option>
						<option :value="3">3</option>
					</select>
			</p>

			<p>Starting day of the week: <select v-model="startingDayOfWeek">
				<option
					v-for="(d, index) in dayNames"
					:value="index"
					:key="index">{{ d }}</option>
			</select></p>

		</div>
		
		<calendar-view
			class="holiday-us-traditional holiday-us-official"
			:show-date="showDate"
			@clickDay="onClickDay"
			@clickEvent="onClickEvent"
			@setShowDate="setShowDate"
			:time-format-options="{hour: 'numeric', minute:'2-digit'}"
			:enable-drag-drop="true"
			:disable-past="disablePast"
			:disable-future="disableFuture"
			:show-event-times="showEventTimes"
			:display-period-uom="displayPeriodUom"
			:display-period-count="displayPeriodCount"
			:starting-day-of-week="startingDayOfWeek"
			@dropEventOnDate="onDrop"
			:events="events"/>

	</div>
</template>

<script>
import CalendarView from "vue-simple-calendar"
import CalendarMathMixin from "vue-simple-calendar/dist/calendar-math-mixin.js"
require("vue-simple-calendar/dist/static/css/default.css")
require("vue-simple-calendar/dist/static/css/holidays-us.css")

// For live testing while making changes to the component
//import CalendarView from "../../vue-simple-calendar/src/CalendarView"
//import CalendarMathMixin from "../../vue-simple-calendar/src/CalendarMathMixin.js"
//require("../../vue-simple-calendar/static/css/default.css")
//require("../../vue-simple-calendar/static/css/holidays-us.css")

export default {
	name: "App",
	components: {
		CalendarView,
		CalendarMathMixin,
	},
	data() {
		return {
			/* Show the current month, and give it some fake events to show */
			showDate: this.thisMonth(1),
			message: "Click a date or event...",
			alreadyAdded: false,
			startingDayOfWeek: 0,
			disablePast: false,
			disableFuture: false,
			displayPeriodUom: "month",
			displayPeriodCount: 1,
			showEventTimes: true,
			events: [
				{
					id: "e0",
					startDate: "2018-01-05",
				},
				{
					id: "e99",
					startDate: this.thisMonth(15, 18, 30),
				},
				{
					id: "e1",
					startDate: this.thisMonth(15),
					title: "Single-day event with a long title",
				},
				{
					id: "e2",
					startDate: this.thisMonth(7, 9, 25),
					endDate: this.thisMonth(10, 16, 30),
					title: "Multi-day event with a long title and times",
				},
				{
					id: "e3",
					startDate: this.thisMonth(20),
					title: "My Birthday!",
					classes: "birthday",
					url: "https://en.wikipedia.org/wiki/Birthday",
				},
				{
					id: "e4",
					startDate: this.thisMonth(5),
					endDate: this.thisMonth(12),
					title: "Multi-day event",
					classes: "purple",
				},
				{
					id: "e5",
					startDate: this.thisMonth(29),
					title: "Same day 1",
				},
				{
					id: "e6",
					startDate: this.thisMonth(29),
					title: "Same day 2",
					classes: "orange",
				},
				{
					id: "e7",
					startDate: this.thisMonth(29),
					title: "Same day 3",
				},
				{
					id: "e8",
					startDate: this.thisMonth(29),
					title: "Same day 4",
					classes: "orange",
				},
				{
					id: "e9",
					startDate: this.thisMonth(29),
					title: "Same day 5",
				},
				{
					id: "e10",
					startDate: this.thisMonth(29),
					title: "Same day 6",
					classes: "orange",
				},
				{
					id: "e11",
					startDate: this.thisMonth(29),
					title: "Same day 7",
				},
			],
		}
	},
	computed: {
		userLocale() {
			return CalendarMathMixin.methods.getDefaultBrowserLocale
		},
		dayNames() {
			return CalendarMathMixin.methods.getFormattedWeekdayNames(
				this.userLocale,
				"long",
				0
			)
		},
	},
	methods: {
		thisMonth(d, h, m) {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
		},
		onClickDay(d) {
			this.message = `You clicked: ${d.toLocaleDateString()}`
		},
		onClickEvent(e) {
			this.message = `You clicked: ${e.title}`
		},
		setShowDate(d) {
			this.message = `Changing calendar view to ${d.toLocaleDateString()}`
			this.showDate = d
		},
		onDrop(event, date) {
			this.message = `You dropped ${event.id} on ${date.toLocaleDateString()}`
			// Before handling drag/drop date math, need to convert string dates to
			// local dates and coalesce endDate to startDate.
			const fixedStartDate = CalendarMathMixin.methods.toLocalDate(
				event.startDate
			)
			const fixedEndDate = CalendarMathMixin.methods.toLocalDate(
				event.endDate || fixedStartDate
			)
			// Determine the delta between the old start date and the date chosen,
			// and apply that delta to both the start and end date to move the event.
			const eLength = CalendarMathMixin.methods.dayDiff(fixedStartDate, date)
			event.startDate = CalendarMathMixin.methods.addDays(
				fixedStartDate,
				eLength
			)
			event.endDate = CalendarMathMixin.methods.addDays(fixedEndDate, eLength)
		},
		clickTestAddEvent() {
			if (this.alreadyAdded) return
			this.alreadyAdded = true
			this.events.push({
				id: "e12",
				startDate: this.thisMonth(22),
				endDate: this.thisMonth(23),
				title: "New Event",
			})
		},
	},
}
</script>

<style>
html,
body {
	height: 100%;
	margin: 0;
}

#app {
	font-family: Calibri;
	width: 90vw;
	min-width: 30em;
	max-width: 100em;
	min-height: 40em;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	max-height: 100vh;
	flex-direction: column;
}
.app-description {
	flex: 0 1 auto;
}
.calendar-view {
	flex: 1 1 auto;
	margin-bottom: 1em;
}

.calendar-view.period-week,
.calendar-view.period-month.periodCount-1 {
	height: 60vw;
}

.calendar-view.period-month.periodCount-2,
.calendar-view.period-month.periodCount-3 {
	height: 150vw;
}

.calendar-view.period-year {
	height: 500vw;
}

/*
	These styles are optional, added for the demo only, to illustrate the flexbility
	of styling the calendar purely with CSS.
	*/

/* Add some emoji for Canada and France... */
.calendar .d07-01 .date::before {
	content: "\1F1E8\1F1E6";
	margin-right: 0.5em;
}
.calendar .d07-14 .date::before {
	content: "\1F1EB\1F1F7";
	margin-right: 0.5em;
}

/* Add some styling for events tagged with the "birthday" class */
.calendar .event.birthday {
	background-color: #e0f0e0;
	border-color: #d7e7d7;
}
.calendar .event.birthday::before {
	content: "\1F382";
	margin-right: 0.5em;
}
</style>
