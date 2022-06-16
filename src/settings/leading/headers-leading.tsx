import DTProfileTable from "../../components/common/dt-profile-table";
import TrafficLights from "../../components/common/traffic-lights";
import CustomBtnGroups from "../../components/custom/btn-actions-groups";
import { currencyFormat } from "../../helpers/currency.helper";
import { StatusType } from "../../interfaces/utility/utilily.type";
interface headItemsLeadingI {
    showModalEdit: Function
    removeItem: Function
}
export const headersLeading = ({ removeItem, showModalEdit }: headItemsLeadingI) => [
    {
        title: 'Title',
        render: ({ item }: any) => { return (<DTProfileTable name={item?.name} image={item?.img} expense={item?.expense} paidOut={item?.paidOut} category={item?.category} />); },

    },
    {
        title: 'Expense',
        render: ({ item }: any) => {
            return (
                <>
                    <span>{currencyFormat(item.expense)}</span>
                </>
            )
        }
    },
    {
        title: 'Status',
        render: ({ item }: any) => { return (<TrafficLights status={item.status as StatusType} />) }
    },
    {
        title: "Date to request",
        key: "",
        render: ({ item }: any) => {
            return (
                <>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <span>{item?.dateToRequest}</span>
                    </div>
                </>
            );
        },
    },
    {
        title: 'Actions',
        render: ({ item }: any) => {
            return (<CustomBtnGroups
                action1={() => { }}
                action2={() => { showModalEdit(item) }}
                action3={() => { removeItem(item); }} />);
        }
    }
]