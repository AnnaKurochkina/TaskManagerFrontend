import "./MenuItem.scss";
import { HStack, Spacer, IconButton } from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const MenuItem = ({listId, listName}) => {
    return (
        <HStack h="3rem" className="menu-item">
			<Link to={"/TaskList/" + listId}>{listName}</Link>
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
                <IconButton icon={<FaTrash />} isRound="true" title="Delete" />
                <IconButton icon={<FaEdit />} isRound="true" title="Edit" />
            </HStack>
        </HStack>
    );
};

export default MenuItem;
