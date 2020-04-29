document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <React.Fragment>
            <TimelineSection { ...educationInfo } />
            <TimelineSection { ...trainingInfo } />
            <TimelineSection { ...workInfo } />
            <TimelineSection { ...projectInfo } />
            <TimelineSection { ...publicationInfo } />
        </React.Fragment>,
        document.getElementById('cv')
    );
});
