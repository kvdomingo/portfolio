import { MDBContainer as Container } from "mdbreact";

function FullPageLoading() {
  return (
    <Container className="text-center my-5 mt-5" style={{ height: "100vh" }}>
      <div className="my-5 mt-5 spinner-grow spinner-grow-lg d-inline-block" />
    </Container>
  );
}

export default FullPageLoading;
