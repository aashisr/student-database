import React from 'react';

function NotificationComponent(props) {
    if (props.message.type === 'error') {
        return (
            <div className='alert alert-danger' role='alert'>
                {props.message.msg}
            </div>
        );
    } else if (props.message.type === 'success') {
        return (
            <div className='alert alert-success' role='alert'>
                {props.message.msg}
            </div>
        );
    } else {
        return <div />;
    }
}

export default NotificationComponent;
