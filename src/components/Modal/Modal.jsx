import {Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, IconButton } from "@chakra-ui/react";
import { FaPlusSquare, FaArrowDown, FaArrowUp, FaTrash, FaEdit, FaAd, FaPlus, FaSave} from "react-icons/fa";
import './Modal.scss';

const ModalMenu = ({title, toggleModal}) => {


  const { isOpen, onOpen, onClose } = useDisclosure()
return (
  <>
  <Button onClick={onOpen}>Add new list</Button>

  <Modal isOpen={isOpen} onClose={onClose} className="modal">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader className="modalHeader" fontSize={"20px"}>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        fgkijsdalocxjkljkvclxiuogfeiuogsiuobf
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>


  {/* <div className="modal">
            <div className="modal__content">
                <h1 className="modal__heading">{title}New list</h1>
                <p>Text</p>
                <input></input>
                <img className="modal__image" alt="modal cross" onClick={toggleModal} />
                <IconButton icon={<FaSave/>} isRound='true' />
                <IconButton icon={<FaTrash/>} isRound='true' />
                <IconButton icon={<FaEdit/>} isRound='true' />
            </div>
        </div>
   */}
</>




  // <>
  //   <Button onClick={onOpen}>Open Modal</Button>
  //   <Modal
  //     isCentered
  //     onClose={onClose}
  //     isOpen={isOpen}
  //     motionPreset='slideInBottom'
  //   >
  //     <ModalOverlay />
  //     <ModalContent>
  //       <ModalHeader>Modal Title</ModalHeader>
  //       <ModalCloseButton />
  //       <ModalBody>
  //         akwerdkjlsdfkjldfckjlei
  //       </ModalBody>
  //       <ModalFooter>
  //         <Button colorScheme='blue' mr={3} onClick={onClose}>
  //           Close
  //         </Button>
  //         <Button variant='ghost'>Secondary Action</Button>
  //       </ModalFooter>
  //     </ModalContent>
  //   </Modal>
  // </>
)
};

export default ModalMenu;






  // function Modal(props) {
  //   function cancelHandler() {
  //     props.onCancel();
  //   }
  
  //   function confirmHandler() {
  //     props.onConfirm();
  //   }
  
  //   return (
      // <div className='modal'>
      //   <p>Are you sure?</p>
      //   <button className='btn btn--alt' onClick={cancelHandler}>
      //     Cancel
      //   </button>
      //   <button className='btn' onClick={confirmHandler}>
      //     Confirm
      //   </button>
      // </div>
  //   );
  // }
  
  // export default Modal;