var e = React.createElement;

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        educationInfo.map(educ => e(
            EducationTimeline,
            { ...educ },
            null,
        )),
        document.querySelector('#education')
    );

    ReactDOM.render(
        workInfo.map(work => e(
            WorkTimeline,
            { ...work },
            null,
        )),
        document.querySelector('#work')
    );

    ReactDOM.render(
        projectInfo.map(proj => e(
            ProjectTimeline,
            { ...proj },
            null,
        )),
        document.querySelector('#projects')
    );
});
