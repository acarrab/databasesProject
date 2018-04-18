import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class AreYouSure extends Component<{ yes: () => void, no: () => void, open: boolean }> {

    render() {
        const { yes, no, open } = this.props
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={no}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                keyboardFocused={true}
                onClick={yes}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Are you sure?"
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={no}
                >
                    This is irreversible. Are you sure?
		</Dialog>
            </div>
        );
    }
}
