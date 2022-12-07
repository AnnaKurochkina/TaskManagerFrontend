import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VStack, HStack, StackDivider, Input, Button, Heading } from "@chakra-ui/react";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.scss";

const TaskList = (props) => {

	const { listId } = useParams();

	const [taskList, setTaskList] = useState(null);

	const getTaskList = async () => {
		const url = `http://localhost:8080/lists/${listId}`;
		const res = await fetch(url);
		const data = await res.json();
		setTaskList(data);
	};

	useEffect(() => {
		getTaskList();
	}, []);

	if (taskList == null) {
		return <div>Loading...</div>
	}
    return (
		<div className="list">
			<Heading>{taskList.name}</Heading>
			<VStack divider = {<StackDivider />} borderColor='gray.200' borderWidth='2px' spacing={4} align='stretch' w="80%" borderRadius={"1rem"} className="">
				{taskList.taskItems.map(taskItem => <TaskItem taskItem={taskItem}></TaskItem>)}
			</VStack>
			<form>
				<HStack mt='8'>
					<Input variant='filled' placeholder='Add new task'  />
					<Button type='submit' colorScheme='cyan' px='8'>Add Task</Button>
				</HStack>
			</form>
		</div>
    );
}

export default TaskList;