import fetchRequest from "./fetchRequest"

export const getAllTasks=()=>{
	return fetchRequest(`/tasks`, {
		method: 'GET'
	})
}

export const getPriorityOptions = () => {
	return fetchRequest(`/priority`, {
		method: 'GET'
	})
}

export const getStatusOptions = () => {
	return fetchRequest(`/status`, {
		method: 'GET'
	})
}

export const addNewTask = (task) => {
	return fetchRequest(`/register`, {
		method: 'POST',
		body: JSON.stringify(task)
	})
}

export const updateTask = (task) => {
	return fetchRequest(`/update`, {
		method: 'PUT',
		body: JSON.stringify(task)
	})
}