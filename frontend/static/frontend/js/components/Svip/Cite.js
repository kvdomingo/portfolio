import React, { Component } from 'react';
import {
    MDBPopover as Popover,
    MDBPopoverBody as PopoverBody,
} from 'mdbreact';
import HtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';


export default class Cite extends Component {
    static propTypes = {
        target: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        reference: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div className='m-5 p-5' style={{ display: 'flex' }}>
                <Popover
                    placement='top'
                    popover
                    clickable
                    id={this.props.target}
                    >
                    [<a href={this.props.target}>{this.props.number}</a>]
                    <PopoverBody>{HtmlParser(this.props.reference)}</PopoverBody>
                </Popover>
            </div>
        );
    }
}
