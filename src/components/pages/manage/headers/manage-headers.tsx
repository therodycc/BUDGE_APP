import { faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import { currencyFormat } from "../../../../helpers/currency.helper";
import { StatusType } from "../../../../interfaces/utility/utilily.type";
import Button from "../../../common/button";
import ButtonGroup from "../../../common/button/button-group";
import DTProfileTable from "../../../common/dt-profile-table";
import TrafficLights from "../../../common/traffic-lights";
import { ButtonGroupDataManage } from "../buttons-settings";
interface HeadersManageItemsI {
    removeItem: Function
    children: ({ columns }: { columns: any[] }) => ReactElement
    showModalEdit: Function
}
export const ColumnsManageItems = ({ showModalEdit, removeItem, children }: HeadersManageItemsI) => {
    let columns = [
        {
            title: "Title",
            render: ({ item }: any) => { return (<DTProfileTable name={item?.name} image={item?.img} expense={item?.expense} paidOut={item?.paidOut} category={item?.category} />); },

        },
        {
            title: "Expense",
            render: ({ item }: any) => {
                return (
                    <>
                        <span>{currencyFormat(item?.expense)}</span>
                    </>
                );
            },
        },
        // { title: "Paid Out", render: ({ item }: any) => { return <PayItemOn /> } },
        {
            title: "Status",
            render: ({ item }: any) => { return (<TrafficLights status={item.status as StatusType} />); },
        },
        {
            title: "Fast pay",
            render: ({ item }: any) => {
                return (<Button bgClass={"info"} type={"button"} loading={false} >
                    <FontAwesomeIcon className="cursor-pointer" icon={faUpDownLeftRight} />
                </Button>);
            },
        },
        {
            title: "Actions",
            render: ({ item }: any) => {
                return (<ButtonGroup buttonsGroupsData={ButtonGroupDataManage({
                    action1: () => showModalEdit(item),
                    action2: () => removeItem(item)
                })} />);
            },
        }]
    return children({ columns })
}