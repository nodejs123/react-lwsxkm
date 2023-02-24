import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];


const Header = () => {
  
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

// const [show, setShow] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);
const yposition =useRef(0);

const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        yposition.current=-200; 
      } else { // if scroll up show the navbar
        yposition.current=0; 
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY); 
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);



  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      // translateY={0}
      transitionProperty="transform"
      transitionDuration=".5s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"

      transform="auto" translateY={yposition.current} //transform="auto" needed to make dynamic transformations work properly
    >
      <Box color="white" maxWidth="1280px" margin="0 auto" >
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            {/* Add social media links based on the `socials` data */}
            <HStack spacing={8}>
            <a href={socials[0].url}>
              <FontAwesomeIcon icon={socials[0].icon} size="2x" />
            </a>
            <a href={socials[1].url}>
              <FontAwesomeIcon icon={socials[1].icon} size="2x" />
            </a>
            <a href={socials[2].url}>
              <FontAwesomeIcon icon={socials[2].icon} size="2x" />
            </a>
            <a href={socials[3].url}>
              <FontAwesomeIcon icon={socials[3].icon} size="2x" />
            </a>
            <a href={socials[4].url}>
              <FontAwesomeIcon icon={socials[4].icon} size="2x" />
            </a>
            </HStack>

          </nav>
          <nav>
            <HStack spacing={8}>
              {/* Add links to Projects and Contact me section */}
              <a href="/#projects-section" onClick={handleClick()} >Projects</a>
              <a href="/#contactme-section" onClick={handleClick()}>Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
