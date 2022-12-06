import React from 'react';
import { useParams } from "react-router-dom";
import { VStack, HStack, StackDivider, Input, Button, Heading } from "@chakra-ui/react";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.scss";

const TaskList = (props) => {

	const { listId } = useParams();
	// Some code to fetch the list from DB and all its children
	const listName = "List " + listId;

    return (
		<div className="list">
			<Heading>{listName}</Heading>
			<VStack divider = {<StackDivider />} borderColor='gray.200' borderWidth='2px' spacing={4} align='stretch' w="30%" className="">
				<TaskItem itemName="Item 1"></TaskItem>
				<TaskItem itemName="Item 2"></TaskItem>
				<TaskItem itemName="Item 3"></TaskItem>
				<TaskItem itemName="Item 4"></TaskItem>
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