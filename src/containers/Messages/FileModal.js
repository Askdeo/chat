import React, { useState } from 'react';
import mime from 'mime-types';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';


const FileModal = (props) => {

    const [ fileState, setFileState ] = useState('')
    const [ Authorized, setAuthorized ] = useState(["image/jpeg", "image/png"])

    const addFileHandler = (event) => {
        const file = event.target.files[0]
        if(file) {
            setFileState(file);
        }
    }

    const isAuthorized = (filename) => {
            return  Authorized.includes(mime.lookup(filename));
        }

    const clearFile = () => {
        setFileState(null)
    }

    const sendFile = () => {
        if(fileState !== null) {
            if(isAuthorized(fileState.name)) {
            //   send file 
                const metadata = { contentType: mime.lookup(fileState.name)};
            //   props.uploadFile(fileState, metadata);
                props.uploadFile(fileState);
                props.closeModal();
                clearFile();
            }
        }
    }

    return (
        <Modal basic open={props.modal} onClose={props.closeModal} >
            <Modal.Header>
                Select an Image File
            </Modal.Header>
            <Modal.Content>
                <Input
                    fluid
                    label='File types: jpg, png'
                    name='file'
                    type='file'
                    onChange={addFileHandler}
                 />
            </Modal.Content>
            <Modal.Actions>
                <Button 
                    color='green'
                    inverted
                    onClick={sendFile}
                >
                    <Icon name='checkmark' /> Send
                </Button>
                <Button 
                    color='red'
                    inverted
                    onClick={props.closeModal}
                >
                    <Icon name='remove' /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )

}
export default FileModal;
