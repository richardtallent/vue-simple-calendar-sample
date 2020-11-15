<template>
	<div id="app">
		<div class="calendar-controls">
			<div v-if="message" class="notification is-success">{{ message }}</div>

			<div class="box">
				<h4 class="title is-5">Play with the options!</h4>

				<div class="field">
					<label class="label">Period UOM</label>
					<div class="control">
						<div class="select">
							<select v-model="displayPeriodUom">
								<option>month</option>
								<option>week</option>
								<option>year</option>
							</select>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label">Period Count</label>
					<div class="control">
						<div class="select">
							<select v-model="displayPeriodCount">
								<option :value="1">1</option>
								<option :value="2">2</option>
								<option :value="3">3</option>
							</select>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label">Starting day of the week</label>
					<div class="control">
						<div class="select">
							<select v-model="startingDayOfWeek">
								<option
									v-for="(d, index) in dayNames"
									:key="index"
									:value="index"
								>
									{{ d }}
								</option>
							</select>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="checkbox">
						<input v-model="useTodayIcons" type="checkbox" />
						Use icon for today's period
					</label>
				</div>

				<div class="field">
					<label class="checkbox">
						<input v-model="displayWeekNumbers" type="checkbox" />
						Show week number
					</label>
				</div>

				<div class="field">
					<label class="checkbox">
						<input v-model="showTimes" type="checkbox" />
						Show times
					</label>
				</div>

				<div class="field">
					<label class="label">Themes</label>
					<label class="checkbox">
						<input v-model="useDefaultTheme" type="checkbox" />
						Default
					</label>
				</div>

				<div class="field">
					<label class="checkbox">
						<input v-model="useHolidayTheme" type="checkbox" />
						Holidays
					</label>
				</div>
			</div>

			<div class="box">
				<div class="field">
					<label class="label">Title</label>
					<div class="control">
						<input v-model="newItemTitle" class="input" type="text" />
					</div>
				</div>

				<div class="field">
					<label class="label">Start date</label>
					<div class="control">
						<input v-model="newItemStartDate" class="input" type="date" />
					</div>
				</div>

				<div class="field">
					<label class="label">End date</label>
					<div class="control">
						<input v-model="newItemEndDate" class="input" type="date" />
					</div>
				</div>

				<button class="button is-info" @click="clickTestAddItem">
					Add Item
				</button>
			</div>
		</div>
		<div class="calendar-parent">
			<calendar-view
				:items="items"
				:show-date="showDate"
				:time-format-options="{ hour: 'numeric', minute: '2-digit' }"
				:enable-drag-drop="true"
				:disable-past="disablePast"
				:disable-future="disableFuture"
				:show-times="showTimes"
				:date-classes="myDateClasses"
				:display-period-uom="displayPeriodUom"
				:display-period-count="displayPeriodCount"
				:starting-day-of-week="startingDayOfWeek"
				:class="themeClasses"
				:period-changed-callback="periodChanged"
				:current-period-label="useTodayIcons ? 'icons' : ''"
				:displayWeekNumbers="displayWeekNumbers"
				:enable-date-selection="true"
				:selection-start="selectionStart"
				:selection-end="selectionEnd"
				@date-selection-start="setSelection"
				@date-selection="setSelection"
				@date-selection-finish="finishSelection"
				@drop-on-date="onDrop"
				@click-date="onClickDay"
				@click-item="onClickItem"
			>
				<calendar-view-header
					slot="header"
					slot-scope="{ headerProps }"
					:header-props="headerProps"
					@input="setShowDate"
				/>
			</calendar-view>
		</div>
	</div>
</template>
<script>
// Load CSS from the published version
require("vue-simple-calendar/static/css/default.css")
require("vue-simple-calendar/static/css/holidays-us.css")

// Load CSS from the local repo
//require("../../vue-simple-calendar/static/css/default.css")
//require("../../vue-simple-calendar/static/css/holidays-us.css")

import {
	CalendarView,
	CalendarViewHeader,
	CalendarMathMixin,
} from "vue-simple-calendar" // published version
//} from "../../vue-simple-calendar/src/components/bundle.js" // local repo

export default {
	name: "App",
	components: {
		CalendarView,
		CalendarViewHeader,
	},
	mixins: [CalendarMathMixin],
	data() {
		return {
			/* Show the current month, and give it some fake items to show */
			showDate: this.thisMonth(1),
			message: "",
			startingDayOfWeek: 0,
			disablePast: false,
			disableFuture: false,
			displayPeriodUom: "month",
			displayPeriodCount: 1,
			displayWeekNumbers: false,
			showTimes: true,
			selectionStart: null,
			selectionEnd: null,
			newItemTitle: "",
			newItemStartDate: "",
			newItemEndDate: "",
			useDefaultTheme: true,
			useHolidayTheme: true,
			useTodayIcons: false,
			items: [
				{
					id: "e0",
					startDate: "2018-01-05",
				},
				{
					id: "e1",
					startDate: this.thisMonth(15, 18, 30),
				},
				{
					id: "e2",
					startDate: this.thisMonth(15),
					title: "Single-day item with a long title",
				},
				{
					id: "e3",
					startDate: this.thisMonth(7, 9, 25),
					endDate: this.thisMonth(10, 16, 30),
					title: "Multi-day item with a long title and times",
				},
				{
					id: "e4",
					startDate: this.thisMonth(20),
					title: "My Birthday!",
					classes: "birthday",
					url: "https://en.wikipedia.org/wiki/Birthday",
				},
				{
					id: "e5",
					startDate: this.thisMonth(5),
					endDate: this.thisMonth(12),
					title: "Multi-day item",
					classes: "purple",
				},
				{
					id: "foo",
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
			return this.getDefaultBrowserLocale
		},
		dayNames() {
			return this.getFormattedWeekdayNames(this.userLocale, "long", 0)
		},
		themeClasses() {
			return {
				"theme-default": this.useDefaultTheme,
				"holiday-us-traditional": this.useHolidayTheme,
				"holiday-us-official": this.useHolidayTheme,
			}
		},
		myDateClasses() {
			const o = {}
			const theFirst = this.thisMonth(1)
			const ides = [2, 4, 6, 9].includes(theFirst.getMonth()) ? 15 : 13
			const idesDate = this.thisMonth(ides)
			o[this.isoYearMonthDay(idesDate)] = ["ides"]
			o[this.isoYearMonthDay(this.thisMonth(21))] = [
				"do-you-remember",
				"the-21st",
			]
			return o
		},
	},
	mounted() {
		this.newItemStartDate = this.isoYearMonthDay(this.today())
		this.newItemEndDate = this.isoYearMonthDay(this.today())
	},

	methods: {
		periodChanged() {
			// range, eventSource) {
			// Demo does nothing with this information, just including the method to demonstrate how
			// you can listen for changes to the displayed range and react to them (by loading items, etc.)
			//console.log(eventSource)
			//console.log(range)
		},
		thisMonth(d, h, m) {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
		},
		onClickDay(d) {
			this.selectionStart = null
			this.selectionEnd = null
			this.message = `You clicked: ${d.toLocaleDateString()}`
		},
		onClickItem(e) {
			this.message = `You clicked: ${e.title}`
		},
		setShowDate(d) {
			this.message = `Changing calendar view to ${d.toLocaleDateString()}`
			this.showDate = d
		},
		setSelection(dateRange) {
			this.selectionEnd = dateRange[1]
			this.selectionStart = dateRange[0]
		},
		finishSelection(dateRange) {
			this.setSelection(dateRange)
			this.message = `You selected: ${this.selectionStart.toLocaleDateString()} -${this.selectionEnd.toLocaleDateString()}`
		},
		onDrop(item, date) {
			this.message = `You dropped ${item.id} on ${date.toLocaleDateString()}`
			// Determine the delta between the old start date and the date chosen,
			// and apply that delta to both the start and end date to move the item.
			const eLength = this.dayDiff(item.startDate, date)
			item.originalItem.startDate = this.addDays(item.startDate, eLength)
			item.originalItem.endDate = this.addDays(item.endDate, eLength)
		},
		clickTestAddItem() {
			this.items.push({
				startDate: this.newItemStartDate,
				endDate: this.newItemEndDate,
				title: this.newItemTitle,
				id: "e" + Math.random().toString(36).substr(2, 10),
			})
			this.message = "You added a calendar item!"
		},
	},
}
</script>

<style>
html,
body {
	height: 100%;
	margin: 0;
	background-color: #f7fcff;
}

#app {
	display: flex;
	flex-direction: row;
	font-family: Calibri, sans-serif;
	width: 95vw;
	min-width: 30rem;
	max-width: 100rem;
	min-height: 40rem;
	margin-left: auto;
	margin-right: auto;
}

.calendar-controls {
	margin-right: 1rem;
	min-width: 14rem;
	max-width: 14rem;
}

.calendar-parent {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-x: hidden;
	overflow-y: hidden;
	max-height: 80vh;
	background-color: white;
}

/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
	min-height: 6rem;
}

/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */

/* Add some styling for items tagged with the "birthday" class */
.theme-default .cv-item.birthday {
	background-color: #e0f0e0;
	border-color: #d7e7d7;
}

.theme-default .cv-item.birthday::before {
	content: "\1F382"; /* Birthday cake */
	margin-right: 0.5em;
}

.theme-default .cv-day.ides {
	background-color: #ffe0e0;
}

.ides .cv-day-number::before {
	content: "\271D";
}

.theme-default .cv-day.do-you-remember.the-21st .cv-day-number::after {
	content: "\1F30D\1F32C\1F525";
}
</style>
