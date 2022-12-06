import { HStack, Spacer, IconButton, Text } from "@chakra-ui/react";
import { FaTrash, FaArrowUp, FaArrowDown, FaEdit } from "react-icons/fa";
import "./TaskItem.scss";

const TaskItem = ({itemId, itemName}) => {

    return (
		<HStack h='3rem'>
			<Text>{itemName}</Text>
			<Spacer />
			<IconButton icon={<FaArrowDown/>} isRound='true'/>
			<IconButton icon={<FaArrowUp/>} isRound='true'/>
			<IconButton icon={<FaTrash/>} isRound='true' />
			<IconButton icon={<FaEdit/>} isRound='true' />
		</HStack>
	)
};

export default TaskItem;