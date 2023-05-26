
const PDFDocument = require('pdfkit');

const Registrationinvoice=(formData)=>{
    let pdfDoc = new PDFDocument();

    generateHeader(pdfDoc);
    generateCustomerInformation(pdfDoc,formData);
    generateInvoiceTable(pdfDoc,formData)
    //generateFooter()
    generateFooter(pdfDoc);

    pdfDoc.end();

    return pdfDoc;
};

const Subscribe=()=>{
    let pdfDoc = new PDFDocument();
    pdfDoc.end();

    return pdfDoc;
};


function generateHeader(doc) {
	doc.image('result.png', 30, 30, { width: 150 })
		.fillColor('#444444')
		.fontSize(20)
		.text('Posh Health Club', 50, 100)
		.fontSize(10)
		.text('GSTIN : 06ABDFP3070D1ZM', 200, 40, { align: 'right' })
		.text('SCO-52, 53, Old Judicial Complex ', 200, 65, { align: 'right' })
		.text('Civil Lines Rd,near Axis Bank, Civil Lines,', 200, 80, { align: 'right' })
		.text('Gurugram, Haryana 122001', 200, 95, { align: 'right' })
		.moveDown();
}


function generateCustomerInformation(doc, invoice) {
	console.log("invoice=====",invoice)
	const shipping = invoice.data.address;
	const userName = invoice.data.firstname + invoice.data.lastname;

	doc
	  .fillColor("#444444")
	  .fontSize(20)
	  .text("Invoice", 50, 160);
  
	generateHr(doc, 185);
  
	const customerInformationTop = 200;
  
	doc
	  .fontSize(10)
	  .text("Member Name:", 50, customerInformationTop)
	  .font("Helvetica-Bold")
	  .text(userName, 150, customerInformationTop)
	  .font("Helvetica")
	  .text("Invoice Date:", 50, customerInformationTop + 15)
	  .text(invoice.todayNewDate, 150, customerInformationTop + 15)
	  .text("Start Date:", 50, customerInformationTop + 30)
	  .text(invoice.subsStartDate,150,customerInformationTop + 30)
	  .text("Payment Mode:", 50, customerInformationTop + 45)
	  .text(invoice.data.payment,150,customerInformationTop + 45)
  
	  .text("Phone:", 300, customerInformationTop)
	  .font("Helvetica-Bold")
	  .text(invoice.data.phone, 350, customerInformationTop)
	  .font("Helvetica")
	  .text("Email:", 300, customerInformationTop + 15)
	  .text(invoice.data.email, 350, customerInformationTop + 15)
	  .font("Helvetica")
	  .text("Address:", 300, customerInformationTop + 40)
	  .text(shipping, 350, customerInformationTop + 40)
	  .moveDown();
  
	generateHr(doc, 270);
  }
function generateInvoiceTable(doc, invoice) {
	let i;
	const invoiceTableTop = 330;
  
	doc.font("Helvetica-Bold");
	generateTableRow(
	  doc,
	  invoiceTableTop,
	  "Package Detail",
	  "Expiry Date",
	  "Amount",
		"CGST",
		"SGST",
		"Total"
	);
	generateHr(doc, invoiceTableTop + 20);
	doc.font("Helvetica");
	for (i = 0; i < invoice.data.length; i++) {
		console.log('invoice.data: ', invoice.data[i]);
	const position = invoiceTableTop + (i + 1) * 30;

	  generateTableRow(
		doc,
		position,
		"",
		"",
		"",
		"",
		"",
		"",
		""
	  );
  
	  //generateHr(doc, position + 20);
	}
  
	const subtotalPosition = invoiceTableTop + (i + 1) * 30;
	generateTableRow(
		doc,
		subtotalPosition,
		invoice.data.subscription,
		invoice.newExpiryDate,
		formatCurrency(invoice.data.amount),
		"0",
		"0",
		formatCurrency(invoice.data.amount)
	);
  
  }
function generateTableRow(
	doc,
	y,
	packageDetail,
	subscription,
	expiryDate,
	CGST,
	SGST,
	total

  ) {
	doc
	  .fontSize(10)
	  .text(packageDetail, 50, y)
	  .text(subscription, 150, y)
	//   .text(startDate, 250, y)
	  .text(expiryDate, 250, y)
	  .text(CGST, 350, y)
	  .text(SGST, 420, y)
	  .text(total, 490, y)
  }
function generateHr(doc, y) {
	doc
	  .strokeColor("#aaaaaa")
	  .lineWidth(1)
	  .moveTo(50, y)
	  .lineTo(550, y)
	  .stroke();
  }
  function formatCurrency(cents) {
	return "Rs " + (cents);
  }  
  function formatDate(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
  
	return year + "/" + month + "/" + day;
  }

function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Thank you for joining the Posh Health Club Gym',
		50,
		600,
		{ align: 'center', width: 500 },
	);
}


module.exports = {
	Registrationinvoice,
};

//module.exports = Subscribe;