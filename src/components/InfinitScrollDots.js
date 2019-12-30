import React from 'react';

export default class InfinitScrollDots extends React.Component {
    render() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"  
                xlink="http://www.w3.org/1999/xlink">
                aria-hidden="true"
                version="1.1"  
                id="icon-dots-three-horizontal"
                viewBox="0 0 40 40">
                <style>
                position=absolute
                width=0 
                height=0
                zIndex=100
                overflow=hidden
                </style> 
                <title>dots-three-horizontal</title>
                <path d="M20.002 15.6c-2.43 0-4.402 1.97-4.402 4.4s1.972 4.4 4.402 4.4c2.43 0 4.398-1.97 4.398-4.4s-1.968-4.4-4.398-4.4zM6.002 15.6c-2.43 0-4.402 1.97-4.402 4.4s1.972 4.4 4.402 4.4c2.43 0 4.398-1.972 4.398-4.4s-1.968-4.4-4.398-4.4zM34.002 15.6c-2.43 0-4.402 1.97-4.402 4.4s1.972 4.4 4.402 4.4c2.43 0 4.398-1.97 4.398-4.4s-1.968-4.4-4.398-4.4z"/>
            </svg>
        )
    }
}