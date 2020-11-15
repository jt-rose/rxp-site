import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="RXP" pageTitle="RXP">
    <p>a descriptive constructor for regular expressions</p>
    <p>
      RXP is a small library that provides a constructor for regular
      expressions, providing the following benefits:
    </p>
    {[
      {
        title: "Plain English Descriptions",
        content: "lorem ipsum",
      },
      {
        title: "Modular and Composable Regex Components",
        content: "lorem ipsum",
      },
      {
        title: "Automatic Escaping of Characters",
        content: "good defaults - expand",
      },
      {
        title: "Accepts Strings, Regex, or Other RXP Units",
        content: "lorem ipsum",
      },
      {
        title: "Automatically Formats Regex Variables",
        content: "lorem ipsum",
      },
    ].map((x) => (
      <li key={`${x.title}-key`}>
        <h3>{x.title}</h3>
        <p>{x.content}</p>
      </li>
    ))}
    <style jsx global>
      {`
        body {
          margin: 0;
        }
      `}
    </style>
  </Layout>
);

export default IndexPage;
