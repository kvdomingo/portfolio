import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import info from "@/info.json";
import { BeforeAfter } from "./before-after";

export function Vip() {
  return (
    <section className="flex flex-col items-center gap-12">
      <div>
        <h2 className="text-xl uppercase tracking-[0.5rem]">
          Video & Image Processing
        </h2>
        <div className="container">
          <p>{info.home.vip.text}</p>
        </div>
      </div>

      <div className="my-auto">
        <BeforeAfter />
      </div>

      <Button asChild size="wide-lg">
        <Link to="/svip">See in portfolio</Link>
      </Button>
    </section>
  );
}
