import Layout from "../components/Layout";
import { RXPexamples } from "../utils/examples";
import { CodeSample } from "../components/CodeSample";

const ExampleSectionDivider = () => (
      <div>
        <h2>Examples</h2>
      <style jsx>{`
      div {
        width: 80%;
        margin: auto;
        margin-top: 3em;
        display: flex;
        justify-content: center;
        background: linear-gradient(180deg, 
        rgba(0,0,0,0) calc(50% - 1px), 
        rgba(192,192,192,1) calc(50%), 
        rgba(0,0,0,0) calc(50% + 1px)
        );
      }
      h2 {
        margin: auto;
        padding: 0 1em;
        background-color: #fff;
      }
      `}</style>
    </div>
  );

const Examples = () => (
  <ul>
      {RXPexamples.map(example => (
          <li key={`example-${example.title}`}>
              <h3>{example.title}</h3>
              <p>Target: {example.target}</p>
              <CodeSample sample={example.sample}/>
          </li>
      ))}
      <style jsx>{`
          ul {
              list-style-type: none;
          }
          h3, p {
            text-align: center;
          }
          h3 {
            margin-top: 1em;
            margin-bottom: 0;
          }
          p {
            margin-top: 0;
          }
          li {
            margin-bottom: 2.5em;
          }
      `}</style>
  </ul>
);

const IndexPage = () => (
  <Layout title="Home" pageTitle="RXP">
    <div className="rxp-intro">
      <p>A descriptive constructor for regular expressions</p>
      <p>
        RXP is a small library that provides a constructor for regular
        expressions, providing the following benefits:
      </p>
    </div>
    
    <ul>
    {[
      {
        title: "Plain English Descriptions",
        content: "Replace cryptic regex with intuitive descriptions",
      },
      {
        title: "Modular and Composable Regex Components",
        content: "Build regex as small, manageable pieces and combine or extend them as needed",
      },
      {
        title: "Automatic Escaping of Characters",
        content: "Write regex with a WYSIWYG mindset and let RXP handle escaping of special characters for you",
      },
      {
        title: "Accepts Strings, Regex, or Other RXP Units",
        content: "Highly flexible constructor that can format strings or accept other regex or RXP constructors - RXP will reconcile everything behind the scenes",
      },
      {
        title: "Automatically Formats Regex Variables",
        content: "Define a regex variable once, store it as an old-fashioned JavaScript variable, and insert it wherever you want - RXP will reconfigure it to work correctly, regardless of positioning",
      },
    ].map((x) => (
      <li key={`${x.title}-key`}>
        <h3>{x.title}</h3>
        <p>{x.content}</p>
      </li>
    ))}
    </ul>
    <ExampleSectionDivider />
    <Examples />
    <style jsx>{`
      .rxp-intro {
        text-align: center;
        margin-bottom: 2em;
      }
      p {
        padding: 0 2em;
      }
      li {
        list-style-type: none;
      }
      li p {
        padding: 0 1em 1em 1em;
      }
      .site-badges {
        display: flex;
        justify-content: center;
      }
    `}</style>
  </Layout>
);

export default IndexPage;
