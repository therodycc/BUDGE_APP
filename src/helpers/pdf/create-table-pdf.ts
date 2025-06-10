import { jsPDF } from "jspdf";
import { currencyFormat } from "../currency.helper";

export const createTableForFinancialExpensePdf = (
  array: any[],
  entry: number,
  pending: number,
  remaining: number
) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let rowSpace = 20;

  const styles = {
    title: {
      fontSize: 18,
      fontStyle: "bold",
      color: "#2c3e50",
    },
    header: {
      fontSize: 12,
      fontStyle: "bold",
      color: "#34495e",
    },
    body: {
      fontSize: 10,
      color: "#7f8c8d",
    },
    total: {
      fontSize: 12,
      fontStyle: "bold",
      color: "#e74c3c",
    },
    line: {
      lineWidth: 0.5,
      lineColor: "#bdc3c7",
    },
  };

  doc.setTextColor(styles.title.color);
  doc.setFontSize(styles.title.fontSize);
  doc.setFont("helvetica", "bold");
  doc.text("Reporte de Presupuesto", pageWidth / 2, rowSpace, {
    align: "center",
  });
  rowSpace += 10;

  // Fecha de generación
  doc.setTextColor(styles.body.color);
  doc.setFontSize(styles.body.fontSize);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Generado el: ${new Date().toLocaleDateString()}`,
    pageWidth / 2,
    rowSpace,
    { align: "center" }
  );
  rowSpace += 15;

  doc.setTextColor(styles.header.color);
  doc.setFontSize(styles.header.fontSize);
  doc.setFont("helvetica", "bold");
  doc.text("Concepto", margin, rowSpace);
  doc.text("Total", margin + 70, rowSpace);
  doc.text("Pendiente", margin + 140, rowSpace);
  rowSpace += 5;

  doc.setDrawColor(styles.line.lineColor);
  doc.setLineWidth(styles.line.lineWidth);
  doc.line(margin, rowSpace, pageWidth - margin, rowSpace);
  rowSpace += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(styles.body.fontSize);
  array.forEach((item) => {
    doc.setTextColor(styles.body.color);
    doc.text(item.name, margin, rowSpace);
    doc.text(currencyFormat(item.expense), margin + 70, rowSpace);

    if (item.expense - item.paidOut > 0) {
      doc.setTextColor("#e74c3c");
      doc.text(
        currencyFormat(item.expense - item.paidOut),
        margin + 140,
        rowSpace
      );
    }
    rowSpace += 8;

    doc.setDrawColor(styles.line.lineColor);
    doc.line(margin, rowSpace, pageWidth - margin, rowSpace);
    rowSpace += 5;
  });

  doc.setFontSize(styles.total.fontSize);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#2c3e50");
  doc.text(`Total Ingresos: ${currencyFormat(entry)}`, margin, rowSpace + 10);
  doc.text(
    `Total Pendiente: ${currencyFormat(pending)}`,
    margin,
    rowSpace + 20
  );
  doc.text(
    `Saldo Restante: ${currencyFormat(remaining)}`,
    margin,
    rowSpace + 30
  );

  doc.save(`Presupuesto_${new Date().toLocaleDateString()}.pdf`);
};
