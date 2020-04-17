document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(React.createElement(
        'ul',
        { className: 'timeline' },
        educationInfo.map(function (educ) {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(EducationTimeline, educ)
            );
        })
    ), document.getElementById('education'));

    ReactDOM.render(React.createElement(
        'ul',
        { className: 'timeline' },
        workInfo.map(function (work) {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(WorkTimeline, work)
            );
        })
    ), document.getElementById('work'));

    ReactDOM.render(React.createElement(
        'ul',
        { className: 'timeline' },
        projectInfo.map(function (proj) {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(ProjectTimeline, proj)
            );
        })
    ), document.getElementById('projects'));
});