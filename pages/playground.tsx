import Layout from "../components/Layout";

const PlaygroundPage = () => {
  return (
    <Layout title="Playground" pageTitle="RXP Playground" sizing="large">
      <h3>
        Using the embedded playground below, you can directly test out RXP code,
        courtesy of
        <a href="https://www.stackblitz.com">
          <img src="/stackblitz-logo.png" />
        </a>
      </h3>

      <div className="playground-container">
        <iframe src="https://stackblitz.com/edit/rxp-sample?ctl=1&embed=1&file=RXP-sample.ts&hideExplorer=1&hideNavigation=1" />
      </div>
      <style jsx>{`
        h3 {
          text-align: center;
        }
        img {
          height: 24px;
          border: 2px solid #4d4d4d;
          padding: 0.1em 0.4em;
          margin-left: 0.3em;
          margin-bottom: -0.3em;
          border-radius: 6px;
        }
        img:hover {
          border-color: #1289fd;
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
