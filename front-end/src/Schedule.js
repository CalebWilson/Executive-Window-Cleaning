import React, { Component } from "react";

import Day            from "./Day";
import Details        from "./Details";
import NavArrow       from "./NavArrows";
import WorkerDropdown from "./WorkerDropdown";
import GenerateButton from "./GenerateButton";

import get_data from "./get_data";

import "./Schedule.css";
import "./styles/buttons.css";

export default class Schedule extends Component
{
	constructor (props)
	{
		super (props);
		this.state =
		{
			data: { week_letter: null, schedule: []},
			workers: [],
			details: null
		};

		//get the week from the URL
		this.week = parseInt(this.props.match.params.week);
	}

	//date of the given day of the current week
	get_date = (day) =>
	{
		let date = new Date (Date.now());
		date.setDate (date.getDate() + (this.week * 7) - date.getDay() + day);
		return date;
	}

	//month(s) of the current week
	get_month = () =>
	{
		let monday = this.get_date (0);
		let friday = this.get_date (4);

		let monday_month = new Intl.DateTimeFormat ('en-US', {month: "long"}).format(monday);
		let friday_month = new Intl.DateTimeFormat ('en-US', {month: "long"}).format(friday);

		//this works
/*
		if (monday_month != friday_month)
			monday_month += " - " + friday_month;

		return monday_month;
*/

		//but this is cooler
		return (monday_month == friday_month)
		?
				monday_month
			: 
				monday_month + " - " + friday_month
		;
	}

	//show the given details of a job; to be passed as a prop to the Job component
	show_details = (new_details) =>
	{
		this.setState ({ details: new_details});
	}

	//hide job details; to be passed as a prop to the Job component
	hide_details = () =>
	{
		this.setState ({ details: null});
	}

	//get worker-specific schedule from the back-end
	select_worker = (worker_id) =>
	{
		get_data ("schedule/" + this.props.match.params.week + "/" + worker_id)
		.then ((data) =>
		{
			this.setState (data);
		});
	}


	//tell the back-end to generate the current week's recurring jobs
	generate = () =>
	{
		get_data ("generate/" + this.week)

		.then ((data) =>
		{
			this.setState (data);
		});
	}

	//get main schedule from the back-end
	componentDidMount()
	{
		//schedule data
		get_data ("schedule/" + this.props.match.params.week)
		.then ((data) =>
		{
			this.setState (data);
		});
	}

	render()
	{
		if (this.state.error)
		{
			return this.state.error;
		}

		return (
			<div className="App">

				{/* top of the schedule */}
				<div className="schedule-top">

					{/* month name */}
					<div className="month">
						{this.get_month()}
					</div>

					<div className="schedule-top-right">
						<WorkerDropdown
							workers={this.state.workers}
							select_worker={this.select_worker}
						/>
						<GenerateButton generate={this.generate} />
					</div>
				
				</div>

				{/* previous week button */}
				<NavArrow
					direction="up"
					href={"/schedule/" + (this.week - 1)}
				/> 

				{/* schedule table */}
				<table>
					<thead><tr>
						<th>Notes</th>
						<th>Monday</th>
						<th>Tuesday</th>
						<th>Wednesday</th>
						<th>Thursday</th>
						<th>Friday</th>
					</tr></thead>
					<tbody><tr>
						<Day
							date={this.state.data.week_letter}
							work_day="Notes Content"
							show_details={this.show_details}
						/>
						{
							this.state.data.schedule.map ((schedule_work_day, day) =>
							(
								<Day
									date={this.get_date(day + 1).getDate()}
									day={day}
									key={day}
									work_day={schedule_work_day}
									show_details={this.show_details}
								/>
							))
						}
					</tr></tbody>
				</table><br />

				{/* next week button */}
				<NavArrow
					direction="down"
					href={"/schedule/" + (this.week + 1)}
				/> 
				
				{/* display details, if any */}
				{
					this.state.details
					?
						<Details
							details={this.state.details}
							hide_details={this.hide_details}/>
					:
						<div>Details invisible</div>
				}


			</div>
		);
	}
}
