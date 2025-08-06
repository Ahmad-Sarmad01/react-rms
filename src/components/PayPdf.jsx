import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePaySlipPDF = (employee, payrollData) => {
  const doc = new jsPDF("p", "mm", "a4");

  const logo = new Image();
  logo.src = "/logo.png"; 

  logo.onload = () => {
    doc.addImage(logo, "PNG", 140, 10, 55, 20); 

    doc.setFontSize(18);
    doc.text("InvexTech", 15, 20);
    doc.setFontSize(11);
    doc.text("Dolphin Mall, MA Jinnah Rd, Okara", 15, 27);
    doc.text("Email: info@invextech.com", 15, 34);
    doc.text("Phone: +92 44 2713690", 15, 41);

    const pageWidth = doc.internal.pageSize.width;
    const stripWidth = 183;
    const startX = (pageWidth - stripWidth) / 2; 

    doc.setFillColor(41, 128, 185);
    doc.rect(startX, 47, stripWidth, 8, "F");


    doc.setFontSize(13);
    doc.setFont("helvetica", "bold"); 
    doc.setTextColor(255, 255, 255);
    doc.text("PAYSLIP", 105, 53, { align: "center" });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(12);
    doc.text(`Employee Name: ${employee.name}`, 15, 65);
    doc.text(`Email: ${employee.email}`, 15, 72);
    doc.text(`Pay Month: ${payrollData.month}`, 15, 79);

    autoTable(doc, {
      startY: 90,
      head: [["Description", "Amount"]],
      body: [
        ["Basic Salary", `PKR ${payrollData.basicSalary}`],
        ["Bonus", `PKR ${payrollData.bonus}`],
        ["Deductions", `PKR ${payrollData.deductions}`],
        ["Net Salary", `PKR ${payrollData.netSalary}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
    });

    const pageHeight = doc.internal.pageSize.height;

    doc.setLineWidth(0.5);
    doc.line(140, pageHeight - 21, 200, pageHeight - 21);

    doc.setFontSize(12);
    doc.text("Authorized Signature", 150, pageHeight - 16);

    doc.setDrawColor(255, 215, 0); 
    doc.setFillColor(132, 0, 0); 
    doc.circle(40, pageHeight - 25, 18, "FD");

    doc.setFontSize(10);
    doc.setTextColor(255, 215, 0); 
    doc.setFont("helvetica", "bold");
    doc.text("APPROVED", 40, pageHeight - 24, { align: "center" });

    doc.save(`Payslip_${payrollData.month}_${employee.name}.pdf`);
  };
};
