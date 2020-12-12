import Link from "next/link";
import theme from "../styles/theme";

const createCodeLink = (pagePath: string) => (props: { sectionID: string, overWrite?: string }) => (
    <Link href={`/${pagePath}#${props.sectionID}`}>
      <a className="code-in-text">
      <style jsx>{`
      .code-in-text {
        color: #353535;
        background-color: #f5f2f0;
        border-radius: 3px;
        padding: .2em .5em 0;
        text-decoration: none;
      }
      `}</style>
        <code>{props.overWrite ? props.overWrite : props.sectionID}</code>
      </a>
    </Link>
    );

export const OptionalLink = (props: {regexName: string, APILink: string | null, whiteColor?: boolean;}) => {
      const { regexName, APILink } = props; 
      const whiteColor = "whiteColor" in props;
      if (APILink) {
        return (
          <div>
            <Link href={`/api-guide#${APILink}`}>
            <a>{regexName}</a>
          </Link>
            <style jsx>{`
              a {
              text-decoration: none;
              color: ${whiteColor ? "#fff" : theme.colors.background};
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

export const APICodeLink = createCodeLink("api-guide");
export const RegexCodeLink = createCodeLink("regex-guide");