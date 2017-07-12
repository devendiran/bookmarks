"use strict";

import React from 'react';
const Dialog = (props) => {
    return (<div className="fixed-dialog">
        {props.children}
    </div>);
}

export default Dialog;