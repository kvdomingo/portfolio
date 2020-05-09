import React from 'react';
import Cover from './Cover';
import WhatIDo from './WhatIDo';
import HowIDoIt from './HowIDoIt';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Cover />
                <WhatIDo />
                <HowIDoIt />
            </div>
        );
    }
}
