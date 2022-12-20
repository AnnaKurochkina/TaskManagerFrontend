import "./Home.scss";
import { Heading, Flex } from "@chakra-ui/react";
// import { FaSun } from "react-icons/fa";
import { FaSun, FaMoon, FaMugHot } from "react-icons/fa";

const Home = () => {

	const user = {
		firstName: "Anna",
	  };
	
	  const currentHour = new Date().getHours();
	  let greetingImg = <FaMugHot/>;
	  let greetingTime = "Morning,";
	
	  if (currentHour >= 12) {
		greetingImg = <FaSun/>;
		greetingTime = "Afternoon,";
	  }
	
	  if (currentHour >= 18) {
		greetingImg = <FaMoon/>;
		greetingTime = "Evening,";
	  }
    return (
		<Flex className="home">
			<Flex className="home__greeting">
				<Heading>
					{greetingImg}
					Good {greetingTime} <br /> {user.firstName}
				</Heading>
			</Flex>
		</Flex>



    );
};

export default Home;