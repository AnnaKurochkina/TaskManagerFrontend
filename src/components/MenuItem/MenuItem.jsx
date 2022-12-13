import "./MenuItem.scss";
import React from "react";
import { HStack, Spacer, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import TaskListModal from "../TaskListModal/TaskListModal";
import { deleteTaskList, updateTaskList } from "../../ApiUtils"

const MenuItem = ({ taskList, removeTaskList, toggleArchived, closeDrawer }) => {
    const modal = useDisclosure();
    const modalRef = React.useRef();

    const handleDeleteTaskList = async () => {
        await deleteTaskList(taskList.id);
        removeTaskList(taskList.id);
    };

	const handleArchiveTaskList = async () => {
		taskList.archived = true;
		await updateTaskList(taskList.id, taskList);
		toggleArchived(taskList);
	}

	const handleUnarchiveTaskList = async () => {
		taskList.archived = false;
		await updateTaskList(taskList.id, taskList);
		toggleArchived(taskList);
	}

    return (
        <HStack h="3rem" className="menu-item">
            <Link to={"/TaskList/" + taskList.id} onClick={closeDrawer}>{taskList.name}</Link>
            <Spacer />
            <HStack className="menu-item__buttons">
                <IconButton
                    icon={<FaArrowDown />}
                    isRound="true"
                    title="Archive"
					onClick={handleArchiveTaskList}
                />
                <IconButton
                    icon={<FaArrowUp />}
                    isRound="true"
                    title="Unarchive"
					onClick={handleUnarchiveTaskList}
                />
                <IconButton
                    icon={<FaTrash />}
                    isRound="true"
                    title="Delete"
                    onClick={handleDeleteTaskList}
                />
                <IconButton
                    icon={<FaEdit />}
                    isRound="true"
                    title="Edit"
                    onClick={modal.onOpen}
                />
                <TaskListModal
                    existingTaskList={taskList}
                    isOpen={modal.isOpen}
                    onClose={modal.onClose}
                    finalRef={modalRef}
                />
            </HStack>
        </HStack>
    );
};

export default MenuItem;
