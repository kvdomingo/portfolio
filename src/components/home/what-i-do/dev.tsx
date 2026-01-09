import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "@tanstack/react-router";
import { TechStack } from "./tech-stack";

export function Dev() {
  return (
    <section className="flex flex-col gap-12">
      <div>
        <h2 className="text-xl uppercase tracking-[0.5rem]">Software Development</h2>
      </div>

      <TechStack />

      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <div>
          <Link to="/dev" className="btn btn-outline btn-accent btn-wide">
            See in portfolio
          </Link>
        </div>
        <div>
          <a
            href="https://github.com/kvdomingo"
            className="btn btn-outline btn-accent btn-wide"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub size={24} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
