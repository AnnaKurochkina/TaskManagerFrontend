import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, IconButton, useDisclosure, useColorMode, Modal } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";
import MenuItem from "../MenuItem/MenuItem";
import ModalMenu from "../Modal/Modal";
import "./Nav.scss";

const Nav = () => {
	const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

	const [taskLists, setTaskLists] = useState([]);

	const getTaskLists = async () => {
		const url = `http://localhost:8080/lists`;
		const res = await fetch(url);
		const data = await res.json();
		setTaskLists(data);
	};

	useEffect(() => {
		getTaskLists();
	}, []);

    return (
        <>
            <IconButton icon={<FaBars />} isRound="true" title="Menu" onClick={onOpen} />
            <Drawer
				size="lg"
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize={"20px"}>
						<IconButton icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} isRound='true' size='lg' alignSelf='flex-end' onClick={toggleColorMode} />
                    </DrawerHeader>
                    <DrawerBody>
						{taskLists.map(taskList => <MenuItem listId={taskList.id} listName={taskList.name}></MenuItem>)}
						<ModalMenu/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Nav;
