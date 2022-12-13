import React from "react";
import {
    HStack,
    Spacer,
    IconButton,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { FaTrash, FaArrowUp, FaArrowDown, FaEdit } from "react-icons/fa";
import TaskItemModal from "../TaskItemModal/TaskItemModal";
import JsonFetchHeaders from "../../ApiUtils";
import { deleteTaskItem, updateTaskItem } from "../../ApiUtils";
import "./TaskItem.scss";

const TaskItem = ({ taskItem, removeTaskItem, taskListId, toggleArchivedItem }) => {
    const modal = useDisclosure();
    const modalRef = React.useRef();

    const handleDeleteTaskItem = async () => {
        await deleteTaskItem(taskItem.id);
        removeTaskItem(taskItem.id);
    };

    const handleArchiveTaskItem = async () => {
        taskItem.archived = true;
        await updateTaskItem(taskItem.id, taskItem);
        toggleArchivedItem(taskItem);
    };

    const handleUnarchiveTaskItem = async () => {
        taskItem.archived = false;
        await updateTaskItem(taskItem.id, taskItem);
        toggleArchivedItem(taskItem);
    };

    return (
        <HStack h="3rem" padding={"2rem"}>
            <Text>{taskItem.name}</Text>
            <Spacer />
            <IconButton
                icon={<FaArrowDown />}
                isRound="true"
				title="Archive"
                onClick={handleArchiveTaskItem}
            />
            <IconButton
                icon={<FaArrowUp />}
                isRound="true"
				title="Unarchive"
                onClick={handleUnarchiveTaskItem}
            />
            <IconButton
                icon={<FaTrash />}
                isRound="true"
                title="Delete"
                onClick={handleDeleteTaskItem}
            />
            <IconButton
                icon={<FaEdit />}
                isRound="true"
                title="Edit"
                onClick={modal.onOpen}
            />
            <TaskItemModal
                existingTaskItem={taskItem}
                isOpen={modal.isOpen}
                onClose={modal.onClose}
                finalRef={modalRef}
                taskListId={taskListId}
            />
        </HStack>
    );
};

export default TaskItem;
