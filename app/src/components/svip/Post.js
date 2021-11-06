import React, { createRef, useEffect, useState } from "react";
import {
  MDBTypography as Typography,
  MDBIcon as Icon,
  MDBBadge as Badge,
  MDBTable as Table,
  MDBTableBody as TableBody,
  MDBTableHead as TableHead,
  MDBContainer as Container,
} from "mdbreact";
import { useRouteMatch } from "react-router-dom";
import { Image } from "cloudinary-react";
import TitleComponent from "../../shared/TitleComponent";
import dateFormat from "dateformat";
import JsxParser from "react-jsx-parser";
import Highlight from "react-highlight.js";
import MathJax from "react-mathjax";
import IFrame from "react-iframe";
import Cite from "./Cite";
import Figure from "./Figure";
import MultiFigure from "./MultiFigure";
import AreaFigure from "./AreaFigure";
import Loading from "../../shared/Loading";
import PopulateTable from "./PopulateTable";
import "./Svip.css";
import api from "../../utils/Endpoints";

function Post({ setPostName, subject }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState([]);
  const [created, setCreated] = useState("");
  const node = createRef();
  const match = useRouteMatch();

  useEffect(() => {
    let { postSlug } = match.params;
    api.svip
      .blogPost("slug", postSlug)
      .then(res => {
        let post = res.data;
        post = post[0];
        setPost(post);
        setPostName(post.title);
      })
      .catch(err => console.error(err.message))
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    let { created } = post;
    created = dateFormat(created, "HH:MM, d mmm yyyy");
    setCreated(created);
  }, [post]);

  return !isLoaded ? (
    <Loading />
  ) : (
    <div>
      <TitleComponent
        title={`${post.title} | ${subject.name}`}
        description={`${subject.name} - ${post.title}`}
        keywords={`${post.keywords}, applied physics, app physics, ${subject.name}, computational physics, kvdomingo, Kenneth V. Domingo`}
      />
      <Typography tag="h1">{post.title}</Typography>
      <Icon far icon="clock" className="mr-1 text-muted" />
      <p className="text-muted d-inline">{created}</p>
      <div className="my-5" ref={node}>
        <MathJax.Provider>
          <JsxParser
            bindings={{
              algo_data: ["spot", "Sobel", "Prewitt", "Laplacian", "Canny"],
              shape_data: ["circle", "square", "trapezoid", "triangle"],
              mapNames: (prefix, shapes) => shapes.map((item, i) => `${prefix}_${item.toLowerCase()}`),
              populateTable: data =>
                Object.values(data)[0].map((el, i) => (
                  <PopulateTable lab={data.lab[i]} lch={data.lch[i]} key={i} patchId={i + 1} />
                )),
            }}
            components={{
              React,
              MathJax,
              Image,
              Figure,
              Cite,
              IFrame,
              MultiFigure,
              AreaFigure,
              Table,
              TableBody,
              TableHead,
              Container,
              Highlight,
            }}
            jsx={post.body}
          />
        </MathJax.Provider>
      </div>
      <div className="my-5">
        <Typography tag="h4">Keywords</Typography>
        {post.keywords.split(", ").map((keyword, i) => (
          <Badge key={i} color="light" className="m-1">
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default Post;
