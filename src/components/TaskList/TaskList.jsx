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
import { FaPlus, FaArrowDown } from "react-icons/fa";
import TaskItem from "../TaskItem/TaskItem";
import TaskItemModal from "../TaskItemModal/TaskItemModal";
import { getSingleTaskList } from "../../ApiUtils";
import "./TaskList.scss";

const TaskList = (props) => {
    const { listId } = useParams();

    const [taskList, setTaskList] = useState(null);
	const [showArchivedItem, setShowArchivedItem] = useState(false);

    const modal = useDisclosure();
    const modalRef = React.useRef();

    const addTaskItem = (newTaskItem) => {
        taskList.taskItems.push(newTaskItem);
        setTaskList(taskList);
    };

    const removeTaskItem = (id) => {
        taskList.taskItems = taskList.taskItems.filter(
            (taskItem) => taskItem.id != id
        );
        setTaskList(taskList);
    };

    const getTaskList = async () => {
        const data = await getSingleTaskList(listId);
        setTaskList(data);
    };

	const filteredTaskItems = taskList.taskItems.filter(taskItem => taskItem.archived == showArchivedItem);

	const toggleArchivedItem = () => {
        setShowArchivedItem(!showArchivedItem);
    };

    useEffect(() => {
        getTaskList();
    }, [listId]);

	// useEffect(() => {
    //     getTaskList();
    // }, [listId, taskList]);

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
                {filteredTaskItems.map((taskItem) => (
                    <TaskItem
                        key={taskItem.id}
                        taskItem={taskItem}
                        removeTaskItem={removeTaskItem}
                        taskListId={taskList.id}
                    ></TaskItem>
                ))}
            </VStack>
			<HStack>
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
            <Button onClick={toggleArchivedItem}>
                {<FaArrowDown />}{" "}
                {showArchivedItem ? "Hide archived" : "Show archived"}
            </Button>
			</HStack>
        </div>
    );
};

export default TaskList;
