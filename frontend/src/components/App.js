import React, { Component } from 'react';
import './App.css';
import 'mdbreact';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: 'Loading...',
        };
    }

    componentDidMount() {
        fetch('/api/svip/course')
            .then(res => {
                if (res.status > 400) {
                    return this.setState(() => {
                        return { placeholder: 'Something went wrong.' };
                    });
                }
                return res.json();
            })
            .then(data => {
                this.setState(() => {
                    return { data, loaded: true };
                });
            });
    }

    render() {
        return (
            <ul className='list-group'>
                {this.state.data.map(course => {
                    return (
                        <li className='list-group-item' key={course.number}>
                            {course.name} - {course.title}
                        </li>
                    );
                })}
            </ul>
        );
    }
}
