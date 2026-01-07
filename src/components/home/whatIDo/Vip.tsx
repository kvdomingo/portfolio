import { Link } from "@tanstack/react-router";
import info from "@/info.json";
import BeforeAfter from "./BeforeAfter";

export default function Vip() {
  return (
    <section className="flex flex-col gap-12">
      <div>
        <h2 className="text-xl uppercase tracking-[0.5rem]">
          Video & Image Processing
        </h2>
        <div className="container">
          <p>{info.home.vip.text}</p>
        </div>
      </div>

      <div className="col-span-3 my-auto">
        <BeforeAfter />
      </div>

      <div>
        <Link to="/svip" className="btn btn-outline btn-accent btn-wide">
          See in portfolio
        </Link>
      </div>
    </section>
  );
}
