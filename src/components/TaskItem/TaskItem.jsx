import { HStack, Spacer, IconButton, Text } from "@chakra-ui/react";
import { FaTrash, FaArrowUp, FaArrowDown, FaEdit } from "react-icons/fa";
import "./TaskItem.scss";

const TaskItem = ({taskItem}) => {

    return (
		<HStack h='3rem' padding={"2rem"} >
			<Text>{taskItem.name}</Text>
			<Spacer />
			<IconButton icon={<FaArrowDown/>} isRound='true'/>
			<IconButton icon={<FaArrowUp/>} isRound='true'/>
			<IconButton icon={<FaTrash/>} isRound='true' />
			<IconButton icon={<FaEdit/>} isRound='true' />
		</HStack>
	)
};

export default TaskItem;