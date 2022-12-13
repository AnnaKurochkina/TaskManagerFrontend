import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    VStack,
    StackDivider,
    Button,
    Heading,
    useDisclosure,
	HStack,
} from "@chakra-ui/react";
import { FaPlus, FaArrowDown, FaRecycle, FaFolder, FaEyeSlash } from "react-icons/fa";
import TaskItem from "../TaskItem/TaskItem";
import TaskItemModal from "../TaskItemModal/TaskItemModal";
import { getSingleTaskList } from "../../ApiUtils";
import "./TaskList.scss";

const TaskList = () => {
    const { listId } = useParams();

    const [taskList, setTaskList] = useState(null);
	const [showArchived, setShowArchived] = useState(false);
	const [stateFlag, setStateFlag] = useState(false);

    const modal = useDisclosure();
    const modalRef = React.useRef();
	
	useEffect(() => {
        getTaskList();
    }, [listId]);

    const getTaskList = async () => {
        const data = await getSingleTaskList(listId);
        setTaskList(data);
    };

	const addTaskItem = (newTaskItem) => {
        taskList.taskItems.push(newTaskItem);
        setTaskList(taskList);
    };

    const removeTaskItem = (id) => {
        taskList.taskItems = taskList.taskItems.filter(
            (taskItem) => taskItem.id != id
        );
        setTaskList(taskList);
		setStateFlag(!stateFlag);
    };

	const toggleArchived = () => {
        setShowArchived(!showArchived);
    };

	const refreshView = () => setStateFlag(!stateFlag);

    if (taskList == null) {
        return <div>Loading...</div>;
    }

	const filteredTaskItems = taskList.taskItems.filter(taskItem => taskItem.archived == showArchived);

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
                {filteredTaskItems.map((taskItem) => (
                    <TaskItem
                        key={taskItem.id}
                        taskItem={taskItem}
                        removeTaskItem={removeTaskItem}
                        taskListId={taskList.id}
						refreshView={refreshView}
                    ></TaskItem>
                ))}
            </VStack>
			<HStack>
            <Button ref={modalRef} onClick={modal.onOpen} display={showArchived ? "none" : "flex"}>
                {<FaPlus />} Add task
            </Button>
            <TaskItemModal
                addTaskItem={addTaskItem}
                isOpen={modal.isOpen}
                onClose={modal.onClose}
                finalRef={modalRef}
                taskListId={taskList.id}
            />
            <Button onClick={toggleArchived}>
                {showArchived ? <FaEyeSlash/> : <FaFolder/>}
				{showArchived ? "Hide archived" : "Show archived"}
            </Button>
			</HStack>
        </div>
    );
};

export default TaskList;
