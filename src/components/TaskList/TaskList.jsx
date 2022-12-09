import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    VStack,
    HStack,
    StackDivider,
    Input,
    Button,
    Heading,
    useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import TaskItem from "../TaskItem/TaskItem";
import TaskItemModal from "../TaskItemModal/TaskItemModal";
import "./TaskList.scss";

const TaskList = (props) => {
    const { listId } = useParams();

    const [taskList, setTaskList] = useState(null);
	const [stateFlag, setStateFlag] = useState(false);

    const modal = useDisclosure();
    const modalRef = React.useRef();

    const addTaskItem = (newTaskItem) => {
		taskList.taskItems.push(newTaskItem);
		setTaskList(taskList);
    };

    const removeTaskItem = (id) => {
		taskList.taskItems = taskList.taskItems.filter(taskItem => taskItem.id != id);
		setTaskList(taskList);
		setStateFlag(!stateFlag);
    };

    const getTaskList = async () => {
        const url = `http://localhost:8080/lists/${listId}`;
        const res = await fetch(url);
        const data = await res.json();
        setTaskList(data);
    };

    useEffect(() => {
        getTaskList();
    }, [listId]);

    if (taskList == null) {
        return <div>Loading...</div>;
    }
    return (
        <div className="list">
            <Heading>{taskList.name}</Heading>
            <VStack
                divider={<StackDivider />}
                borderColor="gray.200"
                borderWidth="2px"
                spacing={4}
                align="stretch"
                w="80%"
                borderRadius={"1rem"}
            >
                {taskList.taskItems.map((taskItem) => (
                    <TaskItem key={taskItem.id} taskItem={taskItem} removeTaskItem={removeTaskItem} taskListId={taskList.id}></TaskItem>
                ))}
            </VStack>
            <Button ref={modalRef} onClick={modal.onOpen}>
                {<FaPlus />} Add task{" "}
            </Button>
            {/* <IconButton icon={<FaPlusSquare/>} isRound='true'/> */}
            <TaskItemModal
                addTaskItem={addTaskItem}
                isOpen={modal.isOpen}
                onClose={modal.onClose}
                finalRef={modalRef}
				taskListId={taskList.id}
            />
            {/* <form>
				<HStack mt='8'>
					<Input variant='filled' placeholder='Add new task'  />
					<Button type='submit' colorScheme='cyan' px='8'>Add Task</Button>
				</HStack>
			</form> */}
        </div>
    );
};

export default TaskList;
