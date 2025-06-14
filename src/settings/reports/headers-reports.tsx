import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { currencyFormat } from "../../helpers/currency.helper";
export const headersReports = ({
  deleteReport,
}: {
  deleteReport: Function;
}) => [
  {
    title: "Entry",
    render: ({ item }: any) => (
      <div>
        <span>{currencyFormat(+item?.entry)}</span>
      </div>
    ),
  },
  {
    title: "Description",
    render: ({ item }: any) => (
      <div
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "12px",
          color: "gray",
          fontWeight: "bold",
        }}
      >
        <span>{item.description}</span>
      </div>
    ),
  },
  {
    title: "Exported at",
    render: ({ item }: any) => (
      <div>
        <span>{new Date(item?.createdAt).toLocaleString()}</span>
      </div>
    ),
  },
  {
    title: "Actions",
    render: ({ item }: any) => {
      return (
        <>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={`btn btn-${
                item.status === "In progress" ? "warning" : "light"
              } btn-sm`}
              onClick={() => {
                deleteReport(item.uuid);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <Link href={`/reports/${item?.uuid}`} passHref>
              <button type="button" className={`btn btn-${"danger"} btn-sm`}>
                <FontAwesomeIcon icon={faEye} />
              </button>
            </Link>
          </div>
        </>
      );
    },
  },
];
