import React, { useState, useEffect } from "react"
import "./modal.css"
import { getPriorityOptions, getStatusOptions, updateTask } from "../../request/tasksRequest"

const Modal = ({ show, setShow, task }) => {
	const [title, setTitle] = useState(task.title)
	const [description, setDescription] = useState(task.description)
	const [status, setStatus] = useState(task.status)
	const [priority, setPriority] = useState(task.priority)
	const [statusOptions, setStatusOptions] = useState([])
	const [priorityOptions, setPriorityOptions] = useState([])
	const [alertText, setAlertText] = useState(false)

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
		const updatedTask = {
			title,
			description,
			status,
			priority,
		}
		const { success, response, error } = await updateTask(updatedTask)
		if (success && response) {
			if (!response.error) {
				console.log(response);
				setAlertText("The Task was updated successfully")
			}
		}
	}

	return (
		<>
			<div className={`modal-container`}>
				<div className="modal-window">
					<div className="card">
						<div className="card-header bg-dark">
							<h4 className="text-white text-center">{task.title} - Edit</h4>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col col-12">
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<label htmlFor="titleEdit">Change The Title</label>
											<input className="form-control" id="titleEdit" value={title} onChange={(e) => setTitle(e.target.value)}></input>
										</div>
										<div className="form-group">
											<label htmlFor="descriptionEdit">Change The Description</label>
											<input className="form-control" id="descriptionEdit" value={description} onChange={(e) => setDescription(e.target.value)}></input>
										</div>
										<div className="form-group">
											<label htmlFor="priorityEdit" className="form-label">Task Priority</label>
											<select className="form-control" name="priority" id="priorityEdit" value={priority} onChange={(e) => setPriority(e.target.value)}>
												{
													priorityOptions.map((priorItem, index) => (
														<option key={index} value={priorItem} defaultValue={priorItem === priority ? true : false}>{priorItem}</option>
													))
												}
											</select>
										</div>
										<div className="form-group">
											<label htmlFor="statusEdit" className="form-label">Task Status</label>
											<select className="form-control" name="status" id="statusEdit" value={status} onChange={(e) => setStatus(e.target.value)}>
												{
													statusOptions.map((statusItem, index) => (
														<option key={index} value={statusItem} defaultValue={statusItem === status ? true : false}>{statusItem}</option>
													))
												}
											</select>
										</div>
										<div className="form-group">
											<button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
											<button type="submit" className="btn btn-primary" style={{ float: "right" }}>Aceptar</button>
										</div>
									</form>
									{
										alertText &&
										<div className="alert alert-success">{alertText}</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal