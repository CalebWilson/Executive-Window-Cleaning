import React, { Component } from "react";

import CloseButton  from "./CloseButton";
import DeleteButton from "./DeleteButton";

import "./styles/indent.css";
import "./ServiceModal.css";

export default class ServiceModal extends Component
{
	constructor (props)
	{
		super (props);

		this.state = this.props.scheduled_job.data;
	}

	delete_day = (day_index) =>
	{
		return (() =>
		{
			this.state.Days.splice (day_index, 1);
			this.forceUpdate();
		});
	}

	delete_worker = (day_index, worker_index) =>
	{
		return (() =>
		{
			this.state.Days[day_index].Workers.splice (worker_index, 1);
			this.forceUpdate();
		});
	}

	render()
	{
		let date_options =
		{
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric"
		};

		return (

			<div className="service-modal">
				<div className="service-modal-content">

					<CloseButton close={this.props.hide_details} />

					{/*
						this.state.editing_name
						?
					*/}
							<div className="service-name">{this.state.JobName}</div>
					{/*
					<Button
					*/}

					<br />
					<div>
						Days:
						<div className="indent">
						{
							this.state.Days.map ((day, day_index) =>
							(
								<div>
									<DeleteButton delete={this.delete_day (day_index)} />
									{
										new Intl.DateTimeFormat ("en-US", date_options)
											.format (new Date (day.Date))
									}
									<div className="indent">
										{
											day.Workers.map ((worker, worker_index) =>
											(
												<div>
									<DeleteButton
										delete={
											this.delete_worker (day_index, worker_index)
										}
									/>
													{worker.WorkerName}
												</div>
											))
										}
									</div><br />
								</div>
							))
						}
						</div>

						Final Price: {this.state.FinalPrice}

					</div>
				</div>
			</div>
		);
	}
}