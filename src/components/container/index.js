import React from "react"
import Form from "../form"
import TasksContainer from "../tasks"

const Container = () => {
	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col col-12 col-lg-5 border p-3">
					<div>
						<h2 className="text-center mb-4">Add New Task</h2>
						<Form></Form>
					</div>
				</div>
				<div className="col col-12 col-lg-7 p-3 border tasks-column">
					<div>
						<h2 className="text-center mb-4">My Tasks</h2>
						<TasksContainer></TasksContainer>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Container