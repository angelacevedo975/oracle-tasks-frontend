import React, { useState, useEffect } from "react"
import { addNewTask, getPriorityOptions, getStatusOptions } from "../../request/tasksRequest"

const Form = () => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [status, setStatus] = useState(1)
	const [priority, setPriority] = useState(1)
	const [statusOptions, setStatusOptions] = useState([])
	const [priorityOptions, setPriorityOptions] = useState([])

	useEffect(() => {
		async function getStatus() {
			const { success, response, error } = await getStatusOptions()
			if (success && response) {
				if (!response.error) {
					setStatusOptions(response)
				}
			}
		}

		async function getPriority() {
			const { success, response, error } = await getPriorityOptions()
			if (success && response) {
				if (!response.error) {
					setPriorityOptions(response)
				}
			}
		}

		getStatus()
		getPriority()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const task = {
			title,
			description,
			status,
			priority
		}
		const { success, response, error } = await addNewTask(task)
		if (success && response) {
			if (!response.error) {
				console.log(response);
				window.location.reload()
			}
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="title" className="form-label">Task Title</label>
				<input className="form-control" id="title" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
			</div>
			<div className="form-group">
				<label htmlFor="description" className="form-label">Task Description</label>
				<input className="form-control" id="description"
					placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} ></input>
			</div>
			<div className="form-group">
				<label htmlFor="priority" className="form-label">Task Priority</label>
				<select className="form-control" name="priority" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
					{
						priorityOptions.map((priorItem, index) => (
							<option key={index} value={priorItem} >{priorItem}</option>
						))
					}
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="status" className="form-label">Task Status</label>
				<select className="form-control" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
					{
						statusOptions.map((statusItem, index) => (
							<option key={index} value={statusItem} >{statusItem}</option>
						))
					}
				</select>
			</div>
			<div className="form-group">
				<button type="submit" className="btn btn-primary">Add Task</button>
			</div>
		</form>
	)
}

export default Form