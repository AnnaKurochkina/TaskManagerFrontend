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
import { updateTaskItem, createTaskItem } from "../../ApiUtils";

import "./TaskItemModal.scss";

const TaskItemModal = ({
    addTaskItem,
    existingTaskItem,
    isOpen,
    onClose,
    finalRef,
	taskListId
}) => {
    const initialRef = React.useRef(null);

    const handleSubmit = async (taskItem, actions) => {
        await new Promise((r) => setTimeout(r, 250));

        let result;

		if (existingTaskItem) {
            await updateTaskItem(existingTaskItem.id, taskItem);
            existingTaskItem.name = taskItem.name;
        } else {
            result = await createTaskItem(taskListId, taskItem);
            addTaskItem(result);
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

    const initialValues = existingTaskItem ? existingTaskItem : { name: "" };

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
                                            <FormLabel>New task</FormLabel>
                                            <Input
                                                {...field}
                                                ref={initialRef}
                                                placeholder="Add new task"
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

export default TaskItemModal;