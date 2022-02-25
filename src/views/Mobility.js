import React from "react";
// reactstrap components
import { Card, CardHeader, CardTitle, CardBody, CardFooter, Row, Col } from "reactstrap";
import GoogleMapReact from 'google-map-react';
import Fuel from "components/Fuel/Fuel.js";

const mapStyles = [
  {
    featureType: "water",
    stylers: [
      {
        saturation: 43,
      },
      {
        lightness: -11,
      },
      {
        hue: "#0088ff",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        hue: "#ff0000",
      },
      {
        saturation: -100,
      },
      {
        lightness: 99,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#808080",
      },
      {
        lightness: 54,
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ece2d9",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ccdca1",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#767676",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off",
      },
      {
        color: "#b8cb93",
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.medical",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
]

const mapOptions = {
  fullscreenControl : false,
  styles : mapStyles,
  zoomControl: true,
  panControl: true,
  mapTypeControl: false,
  scrollwheel: false,
}

const center = {
  lat: 44.84284,
  lng: -0.77373
};



function MapTraffic() {
  return (
    <>
      <div className="content">

        <Row>
          <Col lg="9" md="12" sm="12">
            <Card>
            <CardHeader>
                <CardTitle tag="h4">Trafic</CardTitle>
              </CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >

    <div style={{ height: '495px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB1foRxlJAeNiWFEROfGL1X-ixK6vdBnso" }}
          defaultCenter={center}
          defaultZoom={14}
          options={mapOptions}
          layerTypes={["TrafficLayer"]}
        >

        </GoogleMapReact>
      </div>

                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="12" sm="12">
              <Card>
                <CardHeader>
                <CardTitle tag="h4">Carburants</CardTitle>
              </CardHeader>
              <CardBody>
                      <div className="numbers">
                        <Fuel city="MARTIGNAS-SUR-JALLE"/>
                      </div>
                </CardBody>
                <CardFooter>
                  <span>Source : <a href="https://public.opendatasoft.com/explore/dataset/prix_des_carburants_j_7/map/?location=6,46.48839,2.49423&basemap=jawg.light">public.opendatasoft.com</a></span>
                </CardFooter>
              </Card>
            </Col>
        </Row>
      </div>
    </>
  )
}

export default MapTraffic;
