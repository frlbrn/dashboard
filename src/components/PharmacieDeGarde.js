  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";

const PharmacieDeGarde = () => {

  return (
<>
<Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Pharmacie de garde</CardTitle>
              </CardHeader>
              <CardBody>

    <Row>
    <Col lg="6" md="6" xs="12">
      <div className="icon-big text-center icon-warning">
      <img alt="3237" src={process.env.PUBLIC_URL+"/3237.png"} />
      </div>
    </Col>
    <Col lg="6" md="6" xs="12">
      <div className="numbers">
      <span>ou consultez en ligne <a target="top" href="https://www.3237.fr/">3237.fr</a></span>
      </div>
    </Col>
  </Row>

            </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>

  </>
  );
}

export default PharmacieDeGarde;
