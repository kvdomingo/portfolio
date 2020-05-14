import React from 'react';
import Cover from './Cover';
import WhatIDo from './WhatIDo';
import HowIDoIt from './HowIDoIt';
import TitleComponent from '../TitleComponent';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <TitleComponent title='Home' />
                <Cover />
                <WhatIDo />
                <HowIDoIt />
            </div>
        );
    }
}
