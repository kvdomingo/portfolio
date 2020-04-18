document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <ul className='timeline'>
            {educationInfo.map(educ =>
                <React.Fragment>
                    <EducationTimeline { ...educ } />
                </React.Fragment>
            )}
        </ul>,
        document.getElementById('education')
    );


    ReactDOM.render(
        <ul className='timeline'>
            {workInfo.map(work =>
                <React.Fragment>
                    <WorkTimeline { ...work } />
                </React.Fragment>
            )}
        </ul>,
        document.getElementById('work')
    )

    ReactDOM.render(
        <ul className='timeline'>
            {projectInfo.map(proj =>
                <React.Fragment>
                    <ProjectTimeline { ...proj } />
                </React.Fragment>
            )}
        </ul>,
        document.getElementById('projects')
    )
});
