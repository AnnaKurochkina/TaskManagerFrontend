import React from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { updateTaskList, createTaskList } from "../../ApiUtils";

import "./TaskListModal.scss";

const TaskListModal = ({
    addTaskList,
    existingTaskList,
    isOpen,
    onClose,
    finalRef,
}) => {
    const initialRef = React.useRef(null);

    const handleSubmit = async (taskList, actions) => {
        await new Promise((r) => setTimeout(r, 250));

        let result;
        if (existingTaskList) {
            result = await updateTaskList(existingTaskList.id, taskList);
            existingTaskList.name = taskList.name;
        } else {
            result = await createTaskList(taskList)
            addTaskList(result);
        }

        actions.setSubmitting(false);
        onClose();
    };

    const validateName = (value) => {
        let error;
        if (value == 0) {
            error = "Name is required";
        }
        return error;
    };

    const initialValues = existingTaskList ? existingTaskList : { name: "" };

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            className="modal"
        >
            <ModalOverlay />
            <ModalContent>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {(props) => (
                        <Form>
                            <ModalHeader
                                className="modalHeader"
                                fontSize={"20px"}
                            >
                                Add
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Field name="name" validate={validateName}>
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.name &&
                                                form.touched.name
                                            }
                                        >
                                            <FormLabel>Title</FormLabel>
                                            <Input
                                                {...field}
                                                ref={initialRef}
                                                placeholder="Type new list name"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.name}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    mt={4}
                                    colorScheme="teal"
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};

export default TaskListModal;
