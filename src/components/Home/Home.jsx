import "./Home.scss";
import {
    Heading,
    Flex,
    useColorMode,
    IconButton,
    HStack,
    Spacer,
} from "@chakra-ui/react";
// import { FaSun } from "react-icons/fa";
import { FaSun, FaMoon, FaMugHot } from "react-icons/fa";
import DateTime from "../DateTime/DateTime";
import Weather from "../Weather/Weather";
import Nav from "../Nav/Nav";
import { getAllTaskLists } from "../../ApiUtils";
import React, { useState, useEffect } from "react";
import { getSingleTaskList } from "../../ApiUtils";
import { useParams } from "react-router-dom";
import TaskItem from "../TaskItem/TaskItem";

const Home = ({ geoLongitude, geoLatitude }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [taskLists, setTaskLists] = useState([]);
	const [taskList, setTaskList] = useState(null);
	const { listId } = useParams();

    const user = {
        firstName: "Anna",
    };

    const currentHour = new Date().getHours();
    let greetingImg = <FaMugHot />;
    let greetingTime = "Morning,";

    if (currentHour >= 12) {
        greetingImg = <FaSun />;
        greetingTime = "Afternoon,";
    }

    if (currentHour >= 18) {
        greetingImg = <FaMoon />;
        greetingTime = "Evening,";
    }

    useEffect(() => {
		getTaskLists();
    }, []);

    const getTaskLists = async () => {
        const data = await getAllTaskLists();
        setTaskLists(data);
    };

	// const filteredTaskLists = taskLists.taskItems.filter(taskItem => {
	// 	return (!taskItem.archived) &&
	// 	(!taskItem.done)
	// 	});


	const filteredTaskLists = taskLists.filter(taskList => !taskList.archived);

		// const filteredTaskItems = taskLists.taskItems.filter(taskItem => !taskItem.done);

		// const filteredTaskItemsToFinish = taskLists.taskItems.filter(
		// 	(taskItem) => !taskItem.done
		// );


    return (
        <Flex className="home">
            <Flex className="home__greeting">
                <HStack>
                    <Nav />
                    <Spacer />
                    <IconButton
                        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                        isRound="true"
                        size="lg"
                        alignSelf="flex-end"
                        onClick={toggleColorMode}
                    />
                </HStack>
                <DateTime />
                <Heading>
                    {greetingImg}
                    Good {greetingTime} <br /> {user.firstName}
                    <div>
                        {taskLists.length == 0
                            ? "You have no tasks to finish, yay!"
                            : `You have ${filteredTaskLists.length} task lists to finish`}
                    </div>
					{/* <div>filteredTaskItemsToFinish={filteredTaskItemsToFinish.length}</div> */}
                    <div className="home__greeting">
                        <h1>
                            {geoLatitude !== 0 ? (
                                <Weather
                                    geoLongitude={geoLongitude}
                                    geoLatitude={geoLatitude}
                                />
                            ) : (
                                <div>Loading...</div>
                            )}
                        </h1>
                    </div>
                </Heading>
            </Flex>
        </Flex>
        // <>
        //     <DateTime />
        //     {geoLatitude !== 0 ? (
        //         <Weather
        //             geoLongitude={geoLongitude}
        //             geoLatitude={geoLatitude}
        //         />
        //     ) : (
        //         <div>Loading...</div>
        //     )}
        // </>
    );
};

export default Home;
