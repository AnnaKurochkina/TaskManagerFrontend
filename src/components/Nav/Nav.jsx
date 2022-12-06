import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, IconButton, useDisclosure, useColorMode } from "@chakra-ui/react";
import MenuItem from "../MenuItem/MenuItem";
import { FaSun, FaMoon, FaHamburger, FaBars } from "react-icons/fa";
import React from "react";
import "./Nav.scss";

const Nav = () => {
	const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

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
						<MenuItem listId="1" listName="Shopping"></MenuItem>
						<MenuItem listId="2" listName="Packing"></MenuItem>
						<MenuItem listId="3" listName="To Do"></MenuItem>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Nav;
