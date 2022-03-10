import React, { useEffect, createRef } from "react";
import { Button } from "react-bootstrap";

const Galaxy = () => {
  const galaxyRef = createRef();

  useEffect(() => {
    window.onscroll = () => {
      scrollRotate();
    };
  }, []);

  function scrollRotate() {
    galaxyRef.current.style.transform =
      "rotate(" + window.pageYOffset / 20 + "deg)";
  }

  return (
    <div className="galaxy-div">
      <div class="dimmer"></div>

      <div className="galaxy-back" ref={galaxyRef}></div>

      <div className="galaxy">
        <h2>MilkyWay Exchange Properties</h2>

        <div
          className="galaxy-circle"
          style={{ marginLeft: "56%", marginTop: "5%" }}
        >
          <h5> Title</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
          <Button className="dash-btn clickable">Enter</Button>
        </div>
        <div
          className="galaxy-circle"
          style={{ marginLeft: "15%", marginTop: "-7%" }}
        >
          <h5> Title</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
          <Button className="dash-btn clickable">Enter</Button>
        </div>
        <div
          className="galaxy-circle"
          style={{ marginLeft: "67%", marginTop: "0.1%" }}
        >
          <h5> Title</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
          <Button className="dash-btn clickable">Enter</Button>
        </div>
        <div
          className="galaxy-circle"
          style={{ marginLeft: "18%", marginTop: "-8%" }}
        >
          <h5> Title</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
          <Button className="dash-btn clickable">Enter</Button>
        </div>
        <div
          className="galaxy-circle"
          style={{ marginLeft: "46%", marginTop: "-3%" }}
        >
          <h5> Title</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
          <Button className="dash-btn clickable">Enter</Button>
        </div>
      </div>
    </div>
  );
};

export default Galaxy;
