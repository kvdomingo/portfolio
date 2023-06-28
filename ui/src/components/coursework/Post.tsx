import { useRef } from "react";
import Highlight from "react-highlight.js";
import IFrame from "react-iframe";
import MathJax from "react-mathjax";
import { Link, useLoaderData, useParams } from "react-router-dom";

import { AccessTime } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dateFormat from "dateformat";

import BasePage from "@/components/shared/BasePage.tsx";
import Chip from "@/components/shared/Chip.tsx";
import { selectCourses } from "@/store/courseworkSlice.ts";
import { useSelector } from "@/store/hooks.ts";
import { CourseworkPostMetadata } from "@/types/coursework.ts";

import Image from "../shared/Image";
import JsxRenderer from "../shared/JsxRenderer";
import Loading from "../shared/Loading";
import Title from "../shared/Title";
import AreaFigure from "./AreaFigure";
import Cite from "./Cite";
import Figure from "./Figure";
import MultiFigure from "./MultiFigure";
import PopulateTable from "./PopulateTable";

const READ_FROM_JSX = process.env.NODE_ENV === "development";

function Post() {
  const { courseSlug, postSlug } = useParams();
  const data = useLoaderData() as CourseworkPostMetadata | null;
  const courses = useSelector(selectCourses);
  const subject = courses.data.find(c => c.slug === courseSlug);
  const BodyJsx = useRef<any | (() => null)>(() => null);

  if (data != null) {
    if (READ_FROM_JSX) {
      try {
        import(`./content/${courseSlug}/${postSlug}` /* @vite-ignore */)
          .then(res => (BodyJsx.current = res.default))
          .catch(err => {
            console.error(err);
            BodyJsx.current = () => null;
          });
      } catch (e) {
        BodyJsx.current = () => null;
      }
    }
  }

  return data == null || !subject ? (
    <Loading />
  ) : (
    <BasePage>
      <Title
        title={data.title}
        description={`${subject.name} - ${data.title}`}
        keywords={[
          `${data.keywords}`,
          "applied physics",
          "app physics",
          `${subject.name}`,
          "computational physics",
          "kvdomingo",
          "Kenneth V. Domingo",
        ]}
      />
      <div className="container">
        <Breadcrumbs className="mb-8">
          <Link to="/svip">Courses</Link>
          <Link to="..">{subject.name}</Link>
          <text className="text-gray-400">{data.title}</text>
        </Breadcrumbs>
        <h3 className="mb-2 text-4xl">{data.title}</h3>
        <p className="flex items-center text-gray-400">
          <AccessTime className="mr-2" />
          {dateFormat(data.created, "HH:MM, d mmm yyyy")}
        </p>
        <div className="my-12">
          <MathJax.Provider>
            {READ_FROM_JSX ? (
              <BodyJsx.current />
            ) : (
              <JsxRenderer
                jsx={data.body}
                components={{
                  AreaFigure,
                  Box,
                  Cite,
                  Container,
                  Figure,
                  Grid,
                  Highlight,
                  IFrame,
                  Image,
                  Link,
                  MathJax,
                  MultiFigure,
                  Paper,
                  PopulateTable,
                  Table,
                  TableBody,
                  TableCell,
                  TableContainer,
                  TableHead,
                  TableRow,
                  Typography,
                }}
                bindings={{
                  algo_data: ["spot", "Sobel", "Prewitt", "Laplacian", "Canny"],
                  shape_data: ["circle", "square", "trapezoid", "triangle"],
                  mapNames: (prefix: string, shapes: string[]) =>
                    shapes.map(item => `${prefix}_${item.toLowerCase()}`),
                  populateTable: (data: any) =>
                    (Object.values(data)[0] as any[]).map((_, i) => (
                      <PopulateTable
                        lab={data.lab[i]}
                        lch={data.lch[i]}
                        key={i}
                        patchId={i + 1}
                      />
                    )),
                }}
              />
            )}
          </MathJax.Provider>
        </div>
        <div className="my-12">
          <Typography variant="h5">Keywords</Typography>
          {data.keywords.split(", ").map(keyword => (
            <Chip key={keyword}>{keyword}</Chip>
          ))}
        </div>
      </div>
    </BasePage>
  );
}

export default Post;
