import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { TechStack } from "./tech-stack";

export function Dev() {
  return (
    <section className="flex flex-col gap-12">
      <div>
        <h2 className="text-xl uppercase tracking-[0.5rem]">Software Development</h2>
      </div>

      <TechStack />

      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <Button asChild size="wide-lg">
          <Link to="/dev">See in portfolio</Link>
        </Button>
        <Button asChild size="wide-lg" variant="outline">
          <a
            href="https://github.com/kvdomingo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub size={24} />
            GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}
