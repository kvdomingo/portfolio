import { buildCldUrl } from '@/utils/cloudinary.client'
import dateFormat from 'dateformat'
import TechBadge from '../icons/TechBadge'
import { FolderLock } from 'lucide-react'
import Mdx from '../common/Mdx'

interface ProjectItemProps {
  project: any
}

export default function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div
      className={`mb-8 grid grid-cols-1 place-content-start items-start gap-8 border-t border-solid border-slate-600 pt-8 md:grid-cols-2 ${
        project.confidential ? 'items-center' : ''
      }`}
    >
      <div>
        <a
          href={
            project.status === 'archived' || project.confidential
              ? undefined
              : project.url
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.confidential || !project.cover ? (
            <FolderLock className="mx-auto" size={64} />
          ) : (
            <img
              src={buildCldUrl(project.cover)}
              alt={project.title}
              className="mx-auto aspect-video h-[300px] w-auto object-cover"
            />
          )}
        </a>
      </div>

      <div>
        <div>
          <h4 className="text-xl font-bold">{project.title}</h4>
        </div>

        {project.organization && (
          <div className="my-4 flex place-items-center">
            <p>
              🌏{' '}
              <a
                href={project.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ctp-mauve hover:underline"
              >
                {project.organization}
              </a>
            </p>
          </div>
        )}

        <p className="text-gray-400 small-caps text-sm">
          {dateFormat(new Date(project.startDate), 'mmm yyyy')} -{' '}
          {project.endDate ? dateFormat(new Date(project.endDate), 'mmm yyyy') : 'present'}
        </p>

        <div className="my-8 prose prose-invert max-w-none">
          <Mdx code={project.content} />
        </div>

        <div className="flex flex-wrap">
          {project.technologies.map((tech: string) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </div>
  )
}
