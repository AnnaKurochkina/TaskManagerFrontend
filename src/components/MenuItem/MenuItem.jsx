import "./MenuItem.scss";
import React from "react";
import { HStack, Spacer, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import JsonFetchHeaders from "../../ApiUtils";
import TaskListModal from "../TaskListModal/TaskListModal";

const MenuItem = ({ taskList, removeTaskList, closeDrawer }) => {
    const modal = useDisclosure();
    const modalRef = React.useRef();

    const handleDeleteTaskList = async () => {
        const result = await fetch(
            `http://localhost:8080/lists/${taskList.id}`,
            {
                method: "DELETE",
                headers: JsonFetchHeaders,
            }
        );
        removeTaskList(taskList.id);
    };

    return (
        <HStack h="3rem" className="menu-item">
            <Link to={"/TaskList/" + taskList.id} onClick={closeDrawer}>{taskList.name}</Link>
            <Spacer />
            <HStack className="menu-item__buttons">
                <IconButton
                    icon={<FaArrowDown />}
                    isRound="true"
                    title="Archive"
                />
                <IconButton
                    icon={<FaArrowUp />}
                    isRound="true"
                    title="Unarchive"
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
