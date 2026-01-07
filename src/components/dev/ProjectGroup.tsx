import ProjectItem from './ProjectItem'

interface ProjectGroupProps {
  projects: any[]
  status: 'live' | 'in progress' | 'archived'
}

export default function ProjectGroup({ projects, status }: ProjectGroupProps) {
  return (
    <div className="mb-12">
      <h2 className="mb-4 text-2xl capitalize font-bold border-b border-gray-700 pb-2">{status}</h2>
      <div className="flex flex-col">
        {projects.map(project => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
