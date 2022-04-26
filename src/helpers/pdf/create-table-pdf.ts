import { currencyFormat } from "../currency.helper";
import { jsPDF } from "jspdf";

export const createTablePdf = (array: any, entry: number, pending: number, remaining: number) => {
    var doc = new jsPDF();
    let rowSpace = 10
    let colSpace = 100
    doc.text(`NAME`, 5, rowSpace);
    doc.text(`TOTAL`, colSpace, rowSpace);
    doc.text(`PENDING`, colSpace + 50, rowSpace)
    rowSpace += 5
    doc.text(`---------------------------------------------------------------------------------------`, 5, rowSpace);
    rowSpace += 5
    array.map((item: any) => {
        rowSpace += 5
        doc.text(`${item.name}`, 5, rowSpace);
        doc.text(`${currencyFormat(item.expense)}`, colSpace, rowSpace);
        item.expense - item.paidOut > 0 && doc.text(`${currencyFormat(item.expense - item.paidOut)}`, colSpace + 50, rowSpace)
        rowSpace += 5
        doc.text(`---------------------------------------------------------------------------------------`, 5, rowSpace);
    })
    doc.text("Total: " + currencyFormat(entry), 10, rowSpace + 10)
    doc.text("Pending: " + currencyFormat(pending), 10, rowSpace + 20)
    doc.text("Remaining: " + currencyFormat(remaining), 10, rowSpace + 30)
    let documentBudget = doc.save(`${[new Date().toLocaleDateString()]} - budget.pdf`);
}