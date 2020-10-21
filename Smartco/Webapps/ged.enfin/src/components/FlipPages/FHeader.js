import React from 'react';

export default (props) => (
    <div style={{
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        alignItems: 'stretch'
    }}>
        <div style={{
            flexDirection: 'column',
            flexGrow: 9, textTransform: 'uppercase',
        }}>
            <div style={{fontSize: 24}}>{props.name}</div>
            <div style={{
                fontSize: 10,
                justifySelf: 'flex-end'
            }}>{props.speciality}</div>
        </div>
        <div style={{
            flexDirection: 'column',
            flexGrow: 2,
            alignSelf: 'flex-end',
            justifySelf: 'flex-end'
        }}>
            <div style={{
                fontSize: 10,
                color: 'black',
                textDecoration: 'none',
                alignSelf: 'flex-end',
                justifySelf: 'flex-end'
            }}>{props.email}</div>
        </div>
    </div>
);
