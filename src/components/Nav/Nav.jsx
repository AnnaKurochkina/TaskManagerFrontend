import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    IconButton,
    useDisclosure,
    useColorMode,
    HStack,
    VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaPlus, FaEyeSlash, FaFolder } from "react-icons/fa";
import MenuItem from "../MenuItem/MenuItem";
import TaskListModal from "../TaskListModal/TaskListModal";
import { getAllTaskLists } from "../../ApiUtils";
import "./Nav.scss";

const Nav = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const drawer = useDisclosure();
    const modal = useDisclosure();
    const menuRef = React.useRef();
    const modalRef = React.useRef();

    const [taskLists, setTaskLists] = useState([]);
    const [showArchived, setShowArchived] = useState(false);
    const [stateFlag, setStateFlag] = useState(false);

    useEffect(() => {
        getTaskLists();
    }, []);

    const getTaskLists = async () => {
        const data = await getAllTaskLists();
        setTaskLists(data);
    };

    const addTaskList = (newTaskList) => {
        const updated = [...taskLists, newTaskList];
        setTaskLists(updated);
    };

    const removeTaskList = (id) => {
        const updated = taskLists.filter((taskList) => taskList.id != id);
        setTaskLists(updated);
    };

    const toggleArchived = () => {
        setShowArchived(!showArchived);
    };

    const refreshView = () => setStateFlag(!stateFlag);

    const filteredTaskLists = taskLists.filter(
        (taskList) => taskList.archived == showArchived
    );

    return (
        <>
            <IconButton
                icon={<FaBars />}
                isRound="true"
                title="Menu"
                onClick={drawer.onOpen}
                ref={menuRef}
            />
            <Drawer
                size="lg"
                isOpen={drawer.isOpen}
                placement="left"
                onClose={drawer.onClose}
                finalFocusRef={menuRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize={"20px"}>
                        <IconButton
                            icon={
                                colorMode === "light" ? <FaMoon /> : <FaSun />
                            }
                            isRound="true"
                            size="lg"
                            alignSelf="flex-end"
                            onClick={toggleColorMode}
                        />
                    </DrawerHeader>
                    <DrawerBody>
                        {filteredTaskLists.map((taskList) => (
                            <MenuItem
                                key={taskList.id}
                                taskList={taskList}
                                removeTaskList={removeTaskList}
                                closeDrawer={drawer.onClose}
                                refreshView={refreshView}
                            ></MenuItem>
                        ))}
                        <HStack>
                            <Button ref={modalRef} onClick={modal.onOpen} display={showArchived ? "none" : "flex"}>
                                {<FaPlus />} Add list{" "}
                            </Button>
                            <TaskListModal
                                addTaskList={addTaskList}
                                isOpen={modal.isOpen}
                                onClose={modal.onClose}
                                finalRef={modalRef}
                            />
                            <Button onClick={toggleArchived}>
                                {showArchived ? <FaEyeSlash /> : <FaFolder />}
                                {showArchived
                                    ? "Hide archived"
                                    : "Show archived"}
                            </Button>
                        </HStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Nav;
