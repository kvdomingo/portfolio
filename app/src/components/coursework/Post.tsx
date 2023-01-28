import { useEffect, useRef, useState } from "react";
import Highlight from "react-highlight.js";
import IFrame from "react-iframe";
import MathJax from "react-mathjax";
import { Link, useParams } from "react-router-dom";
import { AccessTime } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Chip,
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
import api from "../../api";
import { selectCourses, updateCourses } from "../../store/courseworkSlice";
import { useDispatch, useSelector } from "../../store/hooks";
import { CourseworkPostMetadata } from "../../types/coursework";
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
  const dispatch = useDispatch();
  const { courseSlug, postSlug } = useParams();
  const courses = useSelector(selectCourses);
  const subject = courses.data.find(c => c.slug === courseSlug);
  const [data, setData] = useState<CourseworkPostMetadata>(null!);
  const [loading, setLoading] = useState(false);
  const BodyJsx = useRef<any | (() => null)>(() => null);

  useEffect(() => {
    if (postSlug) {
      api.svip
        .blogPost("slug", postSlug)
        .then(res => {
          setData(res.data[0]);
          if (READ_FROM_JSX) {
            try {
              import(`./content/${courseSlug}/${postSlug}`)
                .then(res => (BodyJsx.current = res.default))
                .catch(err => {
                  console.error(err);
                  BodyJsx.current = () => null;
                });
            } catch (e) {
              BodyJsx.current = () => null;
            }
          }
        })
        .catch(err => console.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [courseSlug, postSlug]);

  useEffect(() => {
    if (!courses.loaded) {
      api.svip
        .courses()
        .then(res =>
          dispatch(
            updateCourses({
              data: res.data,
              loaded: true,
            }),
          ),
        )
        .catch(err => console.error(err.message));
    }
  }, [dispatch, courses.loaded]);

  return loading || !data || !subject ? (
    <Loading />
  ) : (
    <>
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
      <Container>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Box component={Link} to="/svip" sx={{ color: "primary.main", textDecoration: "none" }}>
            Courses
          </Box>
          <Box component={Link} to=".." sx={{ color: "primary.main", textDecoration: "none" }}>
            {subject.name}
          </Box>
          <Typography sx={{ color: "text.secondary" }}>{data.title}</Typography>
        </Breadcrumbs>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {data.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AccessTime sx={{ mr: 1 }} />
          {dateFormat(data.created, "HH:MM, d mmm yyyy")}
        </Typography>
        <Box component="div" sx={{ my: 6 }}>
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
                  mapNames: (prefix: string, shapes: string[]) => shapes.map(item => `${prefix}_${item.toLowerCase()}`),
                  populateTable: (data: any) =>
                    (Object.values(data)[0] as any[]).map((el, i) => (
                      <PopulateTable lab={data.lab[i]} lch={data.lch[i]} key={i} patchId={i + 1} />
                    )),
                }}
              />
            )}
          </MathJax.Provider>
        </Box>
        <Box component="div" sx={{ my: 6 }}>
          <Typography variant="h5">Keywords</Typography>
          {data.keywords.split(", ").map(kw => (
            <Chip label={kw} key={kw} sx={{ m: 0.5 }} />
          ))}
        </Box>
      </Container>
    </>
  );
}

export default Post;
