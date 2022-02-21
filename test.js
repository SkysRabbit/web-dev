// javascript object
let mydata = {"employees":[
    { "firstName":"John", "lastName":"Doe" },
    { "firstName":"Anna", "lastName":"Smith" },
    { "firstName":"Peter", "lastName":"Jones" }
  ]};

console.log(mydata.employees[0].firstName);
// use table instead
/*function displayData() {
    // get the table attribute
    for(let i=0; i<mydata.employees.length; i++) {
        text += mydata.employees[i].firstName + ", " + 
        mydata.employees[i].lastName + "<br>";
        window.document.getElementById("show").innerHTML = text;
        // window can be omitted
    }
}*/

// start from first row
var rows = 1; 
 
function displayData() {
    var lastname = document.getElementById("lastname").value;
    var firstname = document.getElementById("firstname").value;
    console.log(lastname + firstname);

    if (!lastname || !firstname) {
        alert("fill in all the boxes");
        return;
    }

    var table = document.getElementById("table");
    // insert rows in a table
    var newRow = table.insertRow(rows); // from second row
    var cell1 = newRow.insertCell(0); 
    var cell2 = newRow.insertCell(1);

    cell1.innerHTML = lastname;
    cell2.innerHTML = firstname;

    rows++;
    console.log(rows);
}

function clearTable() {
    // get table property
    var table = document.getElementById("table"); 
    // delete tr instead of th
    // start index should be 1 instead of 0
    var rowCount = table.rows.length;
    for (var i=rowCount-1; i>=1; i--) {
        table.deleteRow(1); // this should be fixed
    }
    // remember to set rows because it has been removed
    rows = 1;
}

function removeLastRow() {
    // retrieve current row
    // after deleting
    // decrease row
    var table = document.getElementById("table");
    // remove last row
    var tablerows = document.getElementsByTagName('tr');
    var maxrow = tablerows.length;
    //table.deleteRow(maxrow-1);

    if (maxrow == 1 && rows == 1) {
        alert("Cannot remove the header");
    } else {
        // remember to decrease rows after each deletion
        table.deleteRow(maxrow-1);
        rows--;
    }
}

function exportData(separator=',') {
    // export data from data table to csv file
    // JS object
    // get maximum table row
    var tablerows = document.querySelectorAll('tr');
    var maxrows = tablerows.length;
    // duplicate all data from data table
    var csv = [];
    // construct csv
    for (var i=0; i<maxrows; i++) {
        var row = [], cols = tablerows[i].querySelectorAll('td, th');
        // column operation
        for (var j=0; j<cols.length; j++) {
            // clean innertext to remove multiple spaces and jumpline
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, '');
            // escape double-quote with double-quote-quote
            data = data.replace(/"/g, '""');
            // push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    } 
    var csv_string = csv.join('\n');
    // specify download filename
    var filename = "export_" + new Date().toLocaleDateString() + '.csv';
    // links are created using <a> element
    var link = document.createElement('a');
    link.style.display = 'none'; // setting and returning the display type of a specified data
    link.setAttribute('target', '_blank'); // open new window
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename); // 下載時的檔名在download設定
    // the download attribute specifies that the target will be
    // downloaded when a user clicks on the hyperlink (specified in href attribute)

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // <a href="#" onclick="exportData()">Export as csv</a>
}
