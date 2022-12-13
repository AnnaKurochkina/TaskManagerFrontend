import React from "react";
import {
    HStack,
    Spacer,
    IconButton,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { FaTrash, FaArrowUp, FaArrowDown, FaEdit, FaFolder, FaRecycle } from "react-icons/fa";
import TaskItemModal from "../TaskItemModal/TaskItemModal";
import { deleteTaskItem, updateTaskItem } from "../../ApiUtils";
import "./TaskItem.scss";

const TaskItem = ({ taskItem, removeTaskItem, taskListId, refreshView }) => {
    const modal = useDisclosure();
    const modalRef = React.useRef();

    const handleDeleteTaskItem = async () => {
        await deleteTaskItem(taskItem.id);
        removeTaskItem(taskItem.id);
    };

    const setTaskItemArchived = async (archived) => {
        taskItem.archived = archived;
        await updateTaskItem(taskItem.id, taskItem);
		refreshView();
    };

    return (
        <HStack h="3rem" padding={"2rem"}>
            <Text>{taskItem.name}</Text>
            <Spacer />
            <IconButton
                icon={taskItem.archived ? <FaRecycle /> : <FaFolder />}
                isRound="true"
				title={taskItem.archived ? "Restore" : "Archive"}
                onClick={() => setTaskItemArchived(!taskItem.archived)}
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
