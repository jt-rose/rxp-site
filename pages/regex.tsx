import Layout from "../components/Layout";
import theme from "../styles/theme";

import { regexData, specialCharData } from "../utils/regexData";

const RegexGuidePage = () => (
  <Layout title="regex-guide">
    <h1>Regex Guide</h1>
    <p>A quick reference guide to common regex characters.</p>
    <h2>Regex Behavior Modifiers</h2>
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
        <tr>
          <td>{data.symbol}</td>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <td>{data.example}</td>
        </tr>
      ))}
      </tbody>
    </table>
    <br />
    <h2>Special Characters</h2>
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
        <tr>
        <td>{data.symbol}</td>
        <td>{data.name}</td>
        <td>{data.description}</td>
      </tr>
      ))}
      </tbody>
    </table>
      <style jsx>{`
        table {
          border-collapse: collapse;
          margin: 25px;
          font-size: 0.9em;
          font-damily: sans-serif;
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
      tbody tr:hover {
        font-weight: bold;
        color: ${theme.colors.background};
    }
    
      
      `}</style>
  </Layout>
);

export default RegexGuidePage;
