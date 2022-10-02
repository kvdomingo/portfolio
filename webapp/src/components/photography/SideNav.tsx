import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import api from "../../api";
import { useDispatch, useSelector } from "../../store/hooks";
import { selectClients, updateClients } from "../../store/photographySlice";
import Title from "../shared/Title";
import tabsList from "./tabsList.json";

function SideNav() {
  const dispatch = useDispatch();
  const path = useParams()?.gallerySlug ?? "";
  const navigate = useNavigate();
  const clients = useSelector(selectClients);
  const activeIndex = tabsList.findIndex(t => t.path === path);
  const activeTab = tabsList[activeIndex];
  const title = activeTab.label[0].toUpperCase() + activeTab.label.slice(1);

  useEffect(() => {
    if (!clients.loaded) {
      api.photography
        .client()
        .then(res =>
          dispatch(
            updateClients({
              data: res.data,
              loaded: true,
            }),
          ),
        )
        .catch(err => console.error(err.message));
    }
  }, [dispatch, clients.loaded]);

  return (
    <>
      <Title
        title={title}
        description={`${title} | Photography section of the photography portfolio of Kenneth V. Domingo`}
        keywords={[
          "photography",
          "latest",
          "live",
          "clients",
          "portraits",
          "portfolio",
          "kvdomingo",
          "KVD Studio",
          "Kenneth V. Domingo",
        ]}
      />
      <Tabs
        orientation="vertical"
        variant="standard"
        value={activeIndex}
        onChange={(e, newValue) => navigate(`/photography/${tabsList[newValue].path}`)}
        sx={{
          "position": "sticky",
          "top": "2em",
          "& .MuiTabs-flexContainer": {
            alignItems: {
              xs: "center",
              lg: "flex-end",
            },
          },
        }}
      >
        {tabsList.map(tab => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>
    </>
  );
}

export default SideNav;
