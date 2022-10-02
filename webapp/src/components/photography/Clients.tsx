import { Card, CardMedia, Grid } from "@mui/material";
import { useSelector } from "../../store/hooks";
import { selectClients } from "../../store/photographySlice";
import Loading from "../shared/Loading";
import Title from "../shared/Title";
import ButtonCard from "./ButtonCard";

function Clients() {
  const clients = useSelector(selectClients);

  return (
    <>
      <Title
        title="Clients"
        description="Clients section of the photography portfolio of Kenneth V. Domingo"
        keywords={["clients", "photography", "portfolio", "kvdomingo", "KVD Studio", "Kenneth V. Domingo"]}
      />
      {!clients.loaded ? (
        <Loading />
      ) : (
        <Grid container spacing={2}>
          {clients.data.map(client => (
            <Grid key={client.slug} item xs={12} lg={4} xl={3} data-aos="fade-up">
              <Card>
                <CardMedia
                  component={ButtonCard}
                  alt={client.name}
                  image={client.coverImage}
                  slug={client.slug}
                  sx={{
                    aspectRatio: "1",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Clients;
