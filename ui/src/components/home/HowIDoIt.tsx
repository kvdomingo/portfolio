import { useEffect } from "react";

import Loading from "@/components/shared/Loading";
import {
  selectHomeTechnologies,
  updateHomeTechnologies,
} from "@/store/generalSlice.ts";
import { useDispatch, useSelector } from "@/store/hooks.ts";

import api from "../../api";

const headers = [
  { label: "Backend", key: "BE" },
  { label: "Frontend", key: "FE" },
  { label: "Database", key: "DB" },
  { label: "CI/CD & Cloud", key: "CI" },
  { label: "Data & Vis", key: "DV" },
];

function HowIDoIt() {
  const dispatch = useDispatch();
  const technologies = useSelector(selectHomeTechnologies);

  useEffect(() => {
    if (!technologies.loaded) {
      api.home
        .technologies()
        .then(res =>
          dispatch(
            updateHomeTechnologies({
              data: res.data,
              loaded: true,
            }),
          ),
        )
        .catch(err => console.error(err.message));
    }
  }, [dispatch, technologies.loaded]);

  return (
    <div className="container py-12 text-center">
      <h2 className="section-header text-6xl text-white">How I do it</h2>
      <hr className="my-8" />
      {!technologies.loaded ? (
        <Loading />
      ) : (
        headers.map(head => (
          <div key={head.key} data-aos="fade-up" className="my-8">
            <div className="grid grid-cols-4 gap-12">
              <div className="flex place-content-end place-items-center border-r border-solid border-white pr-2 text-right">
                <h5 className="section-header text-2xl">{head.label}</h5>
              </div>
              <div className="col-span-3 my-auto grid grid-cols-6 gap-12">
                {technologies.data
                  .filter(tech => tech.category === head.label)
                  .map(tech => (
                    <div key={tech.id} className="my-auto">
                      <img
                        src={tech.url}
                        alt={tech.alt}
                        className="h-auto w-full"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HowIDoIt;
