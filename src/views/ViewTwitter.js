import React, { useState } from "react";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

function ViewTwitter() {
  const [animating, setAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselStyle = {
    padding: 0 + 'px !important'
   };
    const names = ["jeromepescina","BxMetro", "PrefAquitaine33"]
  const slides = names.map((name, input) => {
    return (
     <CarouselItem
      onExiting = {onExiting}
      onExited = {onExited}
      key = {input}
     >
            <Card style={{ backgroundColor: "#333", borderColor: "#333", align:"right" }}>
              <CardBody style={{ width:"90%", align:"right" }}>
              <TwitterTimelineEmbed sourceType="profile" screenName={name} options={{width: "100%", height: 800, align:"right"}} />
               </CardBody>
            </Card>
    </CarouselItem>
    );
   });

   const onExiting = () => {
    setAnimating(true)
  }

  const onExited = () => {
    setAnimating(false)
  }

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === names.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? names.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex)
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex)
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
              <Carousel interval={null} style={carouselStyle} className="landingCarousel"
    activeIndex={activeIndex}
    next={next}
    previous={previous}
   >
    <CarouselIndicators items={names} activeIndex={activeIndex} onClickHandler={goToIndex} />
    {slides}
    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
   </Carousel>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ViewTwitter;
