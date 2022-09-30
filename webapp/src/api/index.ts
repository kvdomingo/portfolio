import axios from "axios";

const baseURL = "/api";

const axi = axios.create({ baseURL });

const api = {
  home: {
    about() {
      return axi.get("home/about");
    },
    content() {
      return axi.get("home/content");
    },
    technologies() {
      return axi.get("home/technology");
    },
  },
  cv: {
    all() {
      return axi.get("cv");
    },
    education() {
      return axi.get("cv/education");
    },
    work() {
      return axi.get("cv/work");
    },
    projects() {
      return axi.get("cv/project");
    },
    certifications() {
      return axi.get("cv/certification");
    },
    publications() {
      return axi.get("cv/publication");
    },
    references() {
      return axi.get("cv/reference");
    },
  },
  svip: {
    blogPost(filter: string, slug: string) {
      return axi.get(`svip/blogpost?${filter}=${slug}`);
    },
    courses() {
      return axi.get("svip/course");
    },
  },
  photography: {
    clients(slug: string) {
      return axi.get(`photography/clients/${slug}`);
    },
    client() {
      return axi.get("photography/client");
    },
    gallery(slug: string) {
      return axi.get(`photography/${slug}`);
    },
  },
  dev: {
    projects() {
      return axi.get("dev/project");
    },
  },
};

export default api;
