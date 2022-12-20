import "./MenuItem.scss";
import React from "react";
import { HStack, Spacer, IconButton, useDisclosure, useColorModeValue, color } from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp, FaTrash, FaEdit, FaRecycle, FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import TaskListModal from "../TaskListModal/TaskListModal";
import { deleteTaskList, updateTaskList } from "../../ApiUtils"

const MenuItem = ({ taskList, removeTaskList, refreshView, closeDrawer, /*buttonBg, iconColor, background, color*/ }) => {
    const modal = useDisclosure();
    const modalRef = React.useRef();

    const handleDeleteTaskList = async () => {
        await deleteTaskList(taskList.id);
        removeTaskList(taskList.id);
    };

	const setTaskListArchived = async (archived) => {
		taskList.archived = archived;
		await updateTaskList(taskList.id, taskList);
		refreshView();
	}

	// const buttonBg = useColorModeValue("gray.300", "rgba(255, 255, 255, 0.08)");
	// const iconColor = useColorModeValue("#000057", "#00EDE3");

    return (
        <HStack h="3rem" className="menu-item">
            <Link to={"/TaskList/" + taskList.id} onClick={closeDrawer}>{taskList.name}</Link>
            <Spacer />
            <HStack className="menu-item__buttons">
                <IconButton
                    icon={taskList.archived ? <FaRecycle/> : <FaFolder/>}
                    isRound="true"
                    title={taskList.archived ? "Restore" : "Archive"}
					onClick={() => setTaskListArchived(!taskList.archived)}
					// background={buttonBg}
					// color={iconColor}
                />
                <IconButton
                    icon={<FaTrash />}
                    isRound="true"
                    title="Delete"
                    onClick={handleDeleteTaskList}
					// background={buttonBg}
					// color={iconColor}
                />
                <IconButton
                    icon={<FaEdit />}
                    isRound="true"
                    title="Edit"
                    onClick={modal.onOpen}
					// background={buttonBg}
					// color={iconColor}
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
