import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert("No transactions to export.");
    return;
  }

  const data = transactions.map((item) => ({
    Title: item.title,
    Category: item.category,
    Type: item.type,
    Amount: item.amount,
    Date: item.date,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Finance_Report.xlsx");
};