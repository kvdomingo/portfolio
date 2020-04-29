document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(React.createElement(
        React.Fragment,
        null,
        React.createElement(TimelineSection, educationInfo),
        React.createElement(TimelineSection, trainingInfo),
        React.createElement(TimelineSection, workInfo),
        React.createElement(TimelineSection, projectInfo),
        React.createElement(TimelineSection, publicationInfo)
    ), document.getElementById('cv'));
});