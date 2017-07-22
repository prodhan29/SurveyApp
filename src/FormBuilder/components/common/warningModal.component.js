import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ModalExampleControlled extends React.Component {
    state = { modalOpen: false }

    handleOpen = (e) => this.setState({
        modalOpen: true,
    })

    handleClose = (e) => this.setState({
        modalOpen: false,
    })

    render() {
        return (
            <Modal
                open={this.props.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
                style={{ marginTop: '-200px' }}
            >
                <Header icon='save' content='Question' />
                <Modal.Content>
                    <h3 style={{color: 'white'}}>Do you want to save the ongoing question ?</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} onClick={this.props.save} inverted>
                        <Icon name='checkmark' /> Continue
                    </Button>
                    <Button color='green' onClick={this.handleClose} onClick={this.props.save} inverted>
                        <Icon name='checkmark' /> Save
                    </Button>
                    <Button basic color='red' onClick={this.props.cancel} inverted>
                        <Icon name='remove' /> No
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}