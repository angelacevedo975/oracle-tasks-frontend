import React, { useState, useEffect } from "react"
import { getAllTasks } from "../../request/tasksRequest"
import Modal from "../modal/"

const TasksContainer = () => {
	const [tasks, setTasks] = useState([])
	const [loading, setLoading] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [selectedTask, setSelectedTask] = useState(false)

	useEffect(() => {
		async function allTasks() {
			const { success, response, error } = await getAllTasks()
			if (success && response) {
				if (!response.error) {
					setTasks(response)
					setLoading(false)
				}
			}
		}

		!showModal && allTasks()
	}, [showModal])

	const validateColor = (status) => {
		if (status == 0) {
			return "danger"
		}
		if (status == 1) {
			return "warning"
		}
		if (status == 2) {
			return "success"
		}
	}

	const handleTaskClick = (task) => {
		setSelectedTask(task)
		setShowModal(true)
	}

	return (
		<div>
			{
				tasks.map((task, index) => (
					<div key={index} className={`alert alert-${validateColor(task.status)}`}
						role="alert"
						onClick={() => handleTaskClick(task)}>
						<h4 className="alert-heading">{task.title}<span>{task.priority}</span></h4>
						<p>{task.description}</p>
					</div>
				))
			}
			{
				loading &&
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			}
			{
				showModal &&
				<Modal
					show={showModal}
					setShow={setShowModal}
					task={selectedTask}
				></Modal>
			}
		</div>
	)
}

export default TasksContainer