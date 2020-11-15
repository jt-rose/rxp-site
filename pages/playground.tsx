import Layout from "../components/Layout";
import { useState, useEffect } from "react"

const PlaygroundPage = () => {
  const [screenWidth, setWidth] = useState(700);
  useEffect(() => {
    setWidth(window.innerWidth);
  });
  return (
    <Layout title="RXP Playground" pageTitle="RXP Playground">
      <h3>
        Hello! I'm the playground page. I'll have a lot more to show off later ;)
      </h3>
      <div className="playground-container">
        <iframe src={`https://codesandbox.io/embed/rxp-sample-ks16u?fontsize=14&hidenavigation=1&module=%2Fsrc%2FRXP-Sample.js&theme=dark&view=${screenWidth < 700 ? "preview" : "split"}`}
       title="RXP-Sample"
       allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
       sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />
      </div>
  <style jsx>{`
  .playground-container {
    display: flex;
    justify-content: center;
  }
  iframe {
    width: 90%;
    height: 500px;
    border-radius: 4px;
    overflow: hidden;
  }
  `}</style>
    </Layout>
  );
};

export default PlaygroundPage;
