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
import "./TaskItem.scss";

const TaskItem = ({ taskItem, removeTaskItem, taskListId }) => {
    const modal = useDisclosure();
    const modalRef = React.useRef();

    const handleDeleteTaskItem = async () => {
        const result = await fetch(
            `http://localhost:8080/items/${taskItem.id}`,
            {
                method: "DELETE",
                headers: JsonFetchHeaders,
            }
        );
        removeTaskItem(taskItem.id);
    };

    return (
        <HStack h="3rem" padding={"2rem"}>
            <Text>{taskItem.name}</Text>
            <Spacer />
            <IconButton icon={<FaArrowDown />} isRound="true"/>
            <IconButton icon={<FaArrowUp />} isRound="true" />
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
