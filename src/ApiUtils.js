const JsonFetchHeaders = {
	"Accept": "application/json",
	"Content-type": "application/json",
};

const hostName = "http://localhost:8080";

export const updateTaskItem = async (id, taskItem) => {
	await fetch(`${hostName}/items/${id}`,
		{
			method: "PUT",
			headers: JsonFetchHeaders,
			body: JSON.stringify(taskItem),
		}
	);
};

export const createTaskItem = async (listId, taskItem) => {
	const result = await fetch(`${hostName}/lists/${listId}`, {
		method: "POST",
		headers: JsonFetchHeaders,
		body: JSON.stringify(taskItem),
	});
	const newTaskItem = await result.json();
	return newTaskItem;
}

export const updateTaskList = async (id, taskList) => {
	await fetch(`${hostName}/lists/${id}`,
		{
			method: "PUT",
			headers: JsonFetchHeaders,
			body: JSON.stringify(taskList),
		}
	);
};

export const createTaskList = async (taskList) => {
	const result = await fetch(`${hostName}/lists`, {
		method: "POST",
		headers: JsonFetchHeaders,
		body: JSON.stringify(taskList),
	});
	const newTaskItem = await result.json();
	return newTaskItem;
}

export const getAllTaskLists = async () => {
	const url = `${hostName}/lists`;
	const res = await fetch(url);
	const data = await res.json();
	return data;
};

export const getSingleTaskList = async (listId) => {
	const url = `${hostName}/lists/${listId}`;
	const res = await fetch(url);
	const data = await res.json();
	return data;
};

export const deleteTaskList = async (taskListId) => {
	await fetch(`${hostName}/lists/${taskListId}`,
		{
			method: "DELETE",
			headers: JsonFetchHeaders,
		}
	);
}

export const deleteTaskItem = async (taskItemId) => {
	await fetch(
		`${hostName}/items/${taskItemId}`,
		{
			method: "DELETE",
			headers: JsonFetchHeaders,
		}
	);
}

