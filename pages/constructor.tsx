import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>Constructor</h1>
    <h3>
      Hello! I'm the constructor page. I'll have a lot more to show off later ;)
    </h3>
    <div className="playground-container">
    <iframe src="https://codesandbox.io/embed/rxp-sample-ks16u?fontsize=14&hidenavigation=1&module=%2Fsrc%2FRXP-Sample.js&theme=dark"
     style={{width: "90%", height: "500px", border: "0", borderRadius: "4px", overflow: "hidden"}}
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
`}</style>
  </Layout>
);

export default AboutPage;
