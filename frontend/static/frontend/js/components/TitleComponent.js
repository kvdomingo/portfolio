import React from 'react';
import { Helmet } from 'react-helmet';


const TitleComponent = ({ title }) => {
    const defaultTitle = '';
    return (
        <Helmet>
            <title>{(title)? title : defaultTitle} | Kenneth V. Domingo</title>
        </Helmet>
    );
}

const withTitle = ({ component: Component, title }) => {
    return class Title extends Component {
        render() {
            return (
                <React.Fragment>
                    <TitleComponent title={title} />
                    <Component { ...this.props } />
                </React.Fragment>
            );
        }
    }
}

export default TitleComponent;
export { withTitle };
