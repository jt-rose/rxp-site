import Layout from "../components/Layout";
import { OptionalLink } from "../components/CodeLink";
import { TableCardGroup } from "../components/TableCard";
import theme from "../styles/theme";

import { regexData, specialCharData } from "../utils/regexData";

const RegexGuidePage = () => (
  <Layout title="Regex Guide" pageTitle="Regex Guide">
    <p>A quick reference guide to common regex characters</p>
    <h2 className="nunito-font">Regex Search Modifiers</h2>
    <TableCardGroup data={regexData} />
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
        {regexData.map((data) => (
          <tr id={data.name.replace(/ /g, "-")}>
            <td>{data.symbol}</td>
            <td>
              <OptionalLink regexName={data.name} APILink={data.APILink} />
            </td>
            <td>{data.description}</td>
            <td>{data.example}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <br />
    <h2 className="nunito-font">Special Characters</h2>
    <TableCardGroup data={specialCharData} />
    <table id="special-char-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {specialCharData.map((data) => (
          <tr id={data.name.replace(/ /g, "-")}>
            <td>{data.symbol}</td>
            <td>
              <OptionalLink regexName={data.name} APILink={data.APILink} />
            </td>
            <td>{data.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <style jsx>{`
      table {
        display: none;
        border-collapse: collapse;
        margin: 25px 10px;
        font-size: 0.9em;
        min-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
      }
      @media (min-width: 600px) {
        table {
          display: block;
        }
      }

      #special-char-table {
        width: fit-content;
        margin: auto;
        margin-bottom: 2rem;
      }

      thead tr {
        background-color: ${theme.colors.background};
        color: #ffffff;
        text-align: left;
      }
      th,
      td {
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
      p,
      h2 {
        text-align: center;
      }
    `}</style>
  </Layout>
);

export default RegexGuidePage;
