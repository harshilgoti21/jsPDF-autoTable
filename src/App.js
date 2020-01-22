import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import "./style.scss";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactDOM from "react-dom";

//require("jspdf-autotable");
var array = [];
var i = 0;
while (i < 100) {
  array.push(i);
  i++;
}
const dummyData = array.map(el => {
  return {
    ID: "1",
    Countrys: "Denmark",
    Rank: null,
    Capitals: "Copenhagen",
    Capital: "Copenhagen",
    first_name: "harshil",
    Last_name: "goti",
    Email: "harshil@gmail.com",
    Country: "ind",
    iP_address: "192.168"
  };
});

function App() {
  var pdfName = "harshil";

  var faker = window.faker;

  var examples = {};
  window.examples = examples;

  function headRows() {
    return [
      { id: "ID", name: "Name", email: "Email", city: "City", expenses: "Sum" }
    ];
  }

  function bodyRows(rowCount) {
    rowCount = rowCount || 10;
    let body = [];
    for (var j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        expenses: faker.finance.amount()
      });
    }
    return body;
  }

  function download() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("With content", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var text = doc.splitTextToSize(
      faker.lorem.sentence(45),
      pageWidth - 35,
      {}
    );
    doc.text(text, 14, 30);

    doc.autoTable({
      styles: { fillColor: [255, 0, 0] },
      columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
      margin: { top: 10 },
      tableWidth: "auto",
      head: headRows(),
      body: bodyRows(40),
      startY: 50,
      showHead: "everyPage"
    });

    doc.text(text, 14, doc.autoTable.previous.finalY + 10);

    return doc;
  }

  // ReactDOM.render(
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>ID</th>
  //         <th>First name</th>
  //         <th>Last name</th>
  //         <th>Email</th>
  //         <th>Country</th>
  //         <th>IP-address</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <td align="right">1</td>
  //         <td>Donna</td>
  //         <td>Moore</td>
  //         <td>dmoore0@furl.net</td>
  //         <td>China</td>
  //         <td>211.56.242.221</td>
  //       </tr>
  //       <tr>
  //         <td align="right">2</td>
  //         <td>Janice</td>
  //         <td>Henry</td>
  //         <td>jhenry1@theatlantic.com</td>
  //         <td>Ukraine</td>
  //         <td>38.36.7.199</td>
  //       </tr>
  //       <tr>
  //         <td align="right">3</td>
  //         <td>Ruth</td>
  //         <td>Wells</td>
  //         <td>rwells2@constantcontact.com</td>
  //         <td>Trinidad and Tobago</td>
  //         <td>19.162.133.184</td>
  //       </tr>
  //       <tr>
  //         <td align="right">4</td>
  //         <td>Jason</td>
  //         <td>Ray</td>
  //         <td>jray3@psu.edu</td>
  //         <td>Brazil</td>
  //         <td>10.68.11.42</td>
  //       </tr>
  //       <tr>
  //         <td align="right">5</td>
  //         <td>Jane</td>
  //         <td>Stephens</td>
  //         <td>jstephens4@go.com</td>
  //         <td>United States</td>
  //         <td>47.32.129.71</td>
  //       </tr>
  //       <tr>
  //         <td align="right">6</td>
  //         <td>Adam</td>
  //         <td>Nichols</td>
  //         <td>anichols5@com.com</td>
  //         <td>Canada</td>
  //         <td>18.186.38.37</td>
  //       </tr>
  //     </tbody>
  //   </table>,
  //   document.getElementById("table")
  // );

  // function generate() {
  //   var doc = new jsPDF("p", "pt");
  //   var elem = document.getElementById("table");
  //   var data = doc.autoTableHtmlToJson(elem);
  //   console.log("examples", data);
  //   var opts = {};
  //   doc.autoTable(data.columns, data.rows, opts);

  //   doc.save("table.pdf");
  // }

  // generate();

  // document.getElementById("pdf-button").onclick = function() {
  //   generatePdf();
  // };

  function generatePdf() {
    var doc = new jsPDF();

    //doc.text("With content", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    console.log("doc", doc);
    var key = Object.keys(dummyData[0]);
    var value = dummyData.map(Element => Object.values(Element));

    doc.text("This is the default font.", 20, 20);

    doc.setFont("courier");
    doc.setFontStyle("normal");
    doc.text("This is courier normal.", 20, 30);

    doc.setFont("times");
    doc.setFontStyle("italic");
    doc.text("This is times italic.", 20, 40);

    doc.setDrawColor(0);
    doc.setFillColor(105, 0, 0);
    doc.roundedRect(140, 20, 50, 10, 3, 3, "FD");

    doc.line(20, 20, 180, 20);

    doc.setFont("time");
    doc.setFontStyle("bolditalic");
    doc.text("This is courier bolditalic.", 60, 40);

    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.text("This is helvetica bold.", 20, 50);

    doc.setFont("courier");
    doc.setFontStyle("bolditalic");
    doc.text("This is courier bolditalic.", 20, 60);

    doc.setFont("times");
    doc.setFontStyle("normal");
    doc.text("This is centred text.", 105, 80, null, null, "center");
    doc.text(
      "And a little bit more underneath it.",
      105,
      90,
      null,
      null,
      "center"
    );
    doc.text("This is right aligned text", 200, 100, null, null, "right");
    doc.text("And some more", 200, 110, null, null, "right");
    doc.text("Back to left", 20, 120);

    doc.text("10 degrees rotated", 20, 140, null, 10);
    doc.text("-10 degrees rotated", 20, 160, null, -10);

    doc.autoTable({
      head: [key],
      body: value,
      startY: 150,
      cellWidth: "auto",
      showHead: "everyPage",
      styles: { fontSize: 8 },
      // columnStyles: { 0: { halign: "center", fillColor: [0, 255, 0] } }, // Cells in first column centered and green
      //margin: { top: 200 },
      tableWidth: "auto",
      theme: "striped"
    });
    doc.save(`${pdfName}.pdf`);
  }

  function handleClickPdfDownload() {
    generatePdf();
  }

  return (
    <div>
      {/* <div className="perent">
        relative
        <div className="one">one</div>
        <div className="two">two</div>
        <div className="three">three</div>
        <div className="six">six</div>
        <div className="four">four</div>
        <div className="five">five</div>
      </div>
      <div className="outer">
        <div className="inner">inner</div>
      </div> */}
      <button onClick={handleClickPdfDownload}>Download PDF</button>
    </div>
  );
}

export default App;
