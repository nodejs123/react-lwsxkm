import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type:"hireMe",
      Comment: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      submit("url",values); 
      onOpen(response.type, response.message);
      formik.resetForm();
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string().min(2, "Too Short").required(),
      email: Yup.string().email().required("Please enter a valid email"),
      type: Yup.string(),
      Comment: Yup.string().required("Please enter a comment"),
    }),
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}

    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>Required  min of two characters</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.email} >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" onChange={formik.handleChange}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.errors.Comment}>
                <FormLabel htmlFor="Comment">Your message</FormLabel>
                <Textarea
                  id="Comment"
                  name="Comment"
                  height={250}
                  value={formik.values.Comment}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" >
              {isLoading ? "isLoading..." : "Submit"}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
