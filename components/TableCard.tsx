import { RegexDataObj, SpecialCharData } from "../utils/regexData";
import { OptionalLink } from "../components/CodeLink";
import { CodeSample } from "../components/CodeSample";
import theme from "../styles/theme";

const TableCard = (props: { data: RegexDataObj | SpecialCharData }) => {
    const { symbol, name, description, APILink } = props.data;
    const example = "example" in props.data ? props.data.example : null;

    return (
        <li>
            <div className="card-header">
                <span className="span-symbol">
                    {symbol}
                </span>
                <span className="span-name">
                    <OptionalLink regexName={name} APILink={APILink} whiteColor/>
                </span>
            </div>
            <div className="card-body">
                <p>
                    {description}
                </p>
                {example && <CodeSample sample={`/${example}/`} />}
            </div>
            
            <style jsx>{`
                li {
                    border: 2px solid ${theme.colors.background};
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    background-color: ${theme.colors.background};
                    color: #fff;
                    font-weight: bold;
                }
                .card-header span {
                    text-align: center;
                }
                .span-symbol {
                    width: ${name === "variable" ? "50" : "40"}%;
                }
                .span-name {
                    width: ${name === "variable" ? "50" : "60"}%;
                }
                .span-name:hover {
                    text-decoration: underline;
                }
                .card-body {
                    padding: 1em;
                    text-align: center;
                }
                .card-body p {
                    margin-top: 0;
                }
            `}</style>
        </li>
    );
}

export const TableCardGroup = (props: {data: (RegexDataObj | SpecialCharData)[]}) => (
    <ul>
      {props.data.map(d => (
        <TableCard data={d} />
      ))}
      <style jsx>{`
        ul {
          list-style-type: none;
          padding: 0;
          display: block;
        }
        @media (min-width: 600px) {
          ul {
            display: none;
          }
        }
      `}</style>
    </ul>
  );