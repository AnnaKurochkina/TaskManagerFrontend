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
	VStack
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaPlus, FaArrowDown } from "react-icons/fa";
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

	const getTaskLists = async () => {
		const data = await getAllTaskLists()
        setTaskLists(data);
    };

	const filteredTaskLists = taskLists.filter(taskList => taskList.archived == showArchived);

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

    useEffect(() => {
        getTaskLists();
    }, []);

	// useEffect(() => {
    //     getTaskLists();
    // }, [taskLists]);

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
                            ></MenuItem>
                        ))}

						<HStack>
						<Button ref={modalRef} onClick={modal.onOpen}>
                            {<FaPlus />} Add list{" "}
                        </Button>
                        {/* <IconButton icon={<FaPlusSquare/>} isRound='true'/> */}
                        <TaskListModal
                            addTaskList={addTaskList}
                            isOpen={modal.isOpen}
                            onClose={modal.onClose}
							finalRef={modalRef}
                        />
						<Button onClick={toggleArchived}>
                            {<FaArrowDown />} 
							{showArchived ? "Hide archived" : "Show archived"}
                        </Button>
						</HStack>
                        
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Nav;
