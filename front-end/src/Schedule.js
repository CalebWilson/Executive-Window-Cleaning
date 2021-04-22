import React, { Component } from "react";
import "./Schedule.css";

import Day from "./Day";

export default class Schedule extends Component
{
	constructor (props)
	{
		super (props);
		this.state = { schedule: [] };
	}

	callAPI()
	{
		fetch ("http://localhost:8080/schedule/-1")
			.then  (response => response.json())
			.then  ((data) =>
			{
				console.log("Hello");
				this.setState ({ schedule: data});
				console.log (this.state.schedule);
			})
			.catch (error => error)
		;
	}

	componentDidMount()
	{
		this.callAPI();
	}

	render()
	{
		return (
			<div className="App">
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
						<Day work_day="Notes Content" />
						{
							this.state.schedule.map ((schedule_work_day, index) =>
							(
								<Day
									day={index}
									key={index}
									work_day={schedule_work_day}
								/>
							))
						}
					</tr></tbody>
				</table>
			</div>
		);
	}
}