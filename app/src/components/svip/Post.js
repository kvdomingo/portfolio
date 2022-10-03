import React, { Component, createRef } from "react";
import { Image } from "cloudinary-react";
import {
  MDBBadge as Badge,
  MDBContainer as Container,
  MDBIcon as Icon,
  MDBTable as Table,
  MDBTableBody as TableBody,
  MDBTableHead as TableHead,
  MDBTypography as Typography,
} from "mdbreact";
import Highlight from "react-highlight.js";
import IFrame from "react-iframe";
import JsxParser from "react-jsx-parser";
import MathJax from "react-mathjax";
import { withRouter } from "react-router-dom";
import dateFormat from "dateformat";
import PropTypes from "prop-types";
import api from "../../api";
import Loading from "../../shared/Loading";
import TitleComponent from "../../shared/TitleComponent";
import AreaFigure from "./AreaFigure";
import Cite from "./Cite";
import Figure from "./Figure";
import MultiFigure from "./MultiFigure";
import PopulateTable from "./PopulateTable";
import "./Svip.css";

window.MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    macros: {
      vec: ["{\\bf\\rm #1}", 1],
    },
    tags: "ams",
  },
};

class Post extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    setPostName: PropTypes.func.isRequired,
    subject: PropTypes.object.isRequired,
  };

  state = {
    isLoaded: false,
    post: [],
    created: "",
  };

  node = createRef();

  componentDidMount() {
    let { postSlug } = this.props.match.params;
    api.svip
      .blogPost("slug", postSlug)
      .then(res => {
        let post = res.data;
        post = post[0];
        this.setState({
          post,
          postName: post.title,
        });
      })
      .catch(err => console.error(err.message))
      .finally(() => this.setState({ isLoaded: true }));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.post !== this.state.post) {
      let { created } = this.state.post;
      created = dateFormat(created, "HH:MM, d mmm yyyy");
      this.setState({ created });
    }
  }

  render() {
    const { isLoaded, post, created } = this.state;
    const { subject } = this.props;

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
        <div className="my-5" ref={this.node}>
          <MathJax.Provider>
            <JsxParser
              bindings={{
                algo_data: ["spot", "Sobel", "Prewitt", "Laplacian", "Canny"],
                shape_data: ["circle", "square", "trapezoid", "triangle"],
                mapNames: (prefix, shapes) => shapes.map(item => `${prefix}_${item.toLowerCase()}`),
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
}

export default withRouter(Post);
