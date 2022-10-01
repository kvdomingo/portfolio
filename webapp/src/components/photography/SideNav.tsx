import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import Title from "../shared/Title";

const tabsList = [
  { path: "", label: "latest" },
  { path: "portraits", label: "portraits" },
  { path: "live", label: "live" },
  { path: "clients", label: "clients" },
  { path: "samoetikerffa", label: "#samoetikerffa" },
];

function SideNav() {
  const path = useParams()?.gallerySlug ?? "";
  const navigate = useNavigate();
  const activeIndex = tabsList.findIndex(t => t.path === path);
  const activeTab = tabsList[activeIndex];
  const title = activeTab.label[0].toUpperCase() + activeTab.label.slice(1);

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
