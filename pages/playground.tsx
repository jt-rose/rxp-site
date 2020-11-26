import Layout from "../components/Layout";
import { useState, useEffect } from "react"
import { SiCodesandbox } from "react-icons/si"
import theme from "../styles/theme";

const PlaygroundPage = () => {
  const [screenWidth, setWidth] = useState(700);
  useEffect(() => {
    setWidth(window.innerWidth);
  });
  return (
    <Layout title="RXP Playground" pageTitle="RXP Playground" sizing="large">
      <h3>
        Using the embedded playground below, you can directly test out RXP code, courtesy of 
         <span>
          <SiCodesandbox /> <a href="https://codesandbox.io">CodeSandbox</a>
        </span>
      </h3>
      <div className="playground-container">
        <iframe src={`https://codesandbox.io/embed/rxp-sample-ks16u?fontsize=14&hidenavigation=1&runonclick=1&module=%2Fsrc%2FRXP-Sample.js&theme=dark&view=${screenWidth < 700 ? "preview" : "split"}`}
       title="RXP-Sample"
       allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
       sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />
      </div>
  <style jsx>{`
  h3 {
    text-align: center;
  }
  span {
    background-color: ${theme.colors.background};
    color: #fff;
    border-radius: 1em;
    padding: .3em .5em;
    margin: 0 .3em;
  }
  span:hover {
    background-color: ${theme.colors.backgroundHover};
  }
  a {
    text-decoration: none;
  }
  a:visited {
    color: #fff;
  }
  .playground-container {
    display: flex;
    justify-content: center;
  }
  iframe {
    width: 90%;
    height: 500px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1em;
  }
  `}</style>
    </Layout>
  );
};

export default PlaygroundPage;
