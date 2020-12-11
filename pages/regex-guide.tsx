import Layout from "../components/Layout";
import Link from "next/link";
import theme from "../styles/theme";

import { regexData, specialCharData } from "../utils/regexData";
import { CodeSample } from "../components/CodeSample";

const OptionalLink = (props: {regexName: string, APILink: string | null}) => {
  const { regexName, APILink } = props;
  if (APILink) {
    return (
      <div>
        <Link href={`/api-guide#${APILink}`}>
        <a>{regexName}</a>
      </Link>
        <style jsx>{`
          a {
          text-decoration: none;
          color: ${theme.colors.background};
          font-weight: bold;
        }
      `}</style>
      </div>
    );
  } else {
    return (
      <>
        {regexName}
      </>
    );
  }
};

const RegexGuidePage = () => (
  <Layout title="Regex Guide" pageTitle="Regex Guide">
    <p>A quick reference guide to common regex characters</p>
    <h2 className="nunito-font">Regex Search Modifiers</h2>
    <table>
      <thead>
        <tr>
        <th>Symbol</th>
      <th>Name</th>
      <th>Description</th>
      <th>Example</th>
        </tr>
      </thead>
      <tbody>
      {regexData.map(data => (
        <tr id={data.name.replace(/ /g, "-")}>
          <td>{data.symbol}</td>
          <td>
            <OptionalLink regexName={data.name} APILink={data.APILink}/>
          </td>
          <td>{data.description}</td>
          <td><CodeSample sample={`/${data.example}/`} /></td>
        </tr>
      ))}
      </tbody>
    </table>
    <br />
    <h2 className="nunito-font">Special Characters</h2>
    <table>
      <thead>
        <tr>
        <th>Symbol</th>
      <th>Name</th>
      <th>Description</th>
        </tr>
      </thead>
    <tbody>
      {specialCharData.map(data => (
        <tr id={data.name.replace(/ /g, "-")}>
        <td>{data.symbol}</td>
        <td>
          <OptionalLink regexName={data.name} APILink={data.APILink}/>
        </td>
        <td>{data.description}</td>
      </tr>
      ))}
      </tbody>
    </table>
      <style jsx>{`
        table {
          border-collapse: collapse;
          margin: 25px 10px;
          font-size: 0.9em;
          min-width: 400px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.15)
        }
        thead tr {
          background-color: ${theme.colors.background};
          color: #ffffff;
          text-align: left;
        }
        th, td {
          padding: 12px 15px;
        }
       tbody tr {
          border-bottom: 1px solid #dddddd;
      }
      tbody tr:nth-of-type(even) {
          background-color: #f3f3f3;
      }
      tbody tr:last-of-type {
          border-bottom: 2px solid ${theme.colors.background};
      }
    p, h2 {
      text-align: center;
    }
      `}</style>
  </Layout>
);

export default RegexGuidePage;
