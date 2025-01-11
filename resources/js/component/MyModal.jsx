import { Modal } from "react-bootstrap"

const MyModal = ({children, show, handleClose, modalTitle, size = 'md', onExit}) => {

    return (
        <>
            <Modal show={show} onHide={handleClose} size={size} onExit={onExit}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </>
    )

}

export default MyModal