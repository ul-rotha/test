

function bindStockItem(arr) {
	//Check and add table header.
	if (!$("#modalStockItem table thead").length) {
		$("#modalStockItem table").append("<thead><tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Code</th><th>Name</th><th>Current Balace</th></tr></thead>");
	}

	//Check tbody, if not exist then create new.
	var $tbody = $("#modalStockItem table tbody")
	if (!$tbody.length) {
		$tbody = $(document.createElement("tbody"));
	}
	$tbody.empty();

	//Append row to tbody
	for (var i in arr) {
		$tbody.append("<tr val='" + arr[i].stockCode + "'><td><input type='checkbox'/></td><td>" + arr[i].stockCode + "</td><td>" + arr[i].stockName + "</td><td class='text-right'>" + arr[i].qtyBalance.format(2, 3) + "</td></tr>");
	}

	//Append tbody to table
	$("#modalStockItem table").append($tbody);
}

function bindStockFa(arr) {
	//Check and add table header.
	if (!$("#modalStockFa table thead").length) {
		$("#modalStockFa table").append("<thead><tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Code</th><th>Name</th><th>Current Balace</th></tr></thead>");
	}

	//Check tbody, if not exist then create new.
	var $tbody = $("#modalStockFa table tbody")
	if (!$tbody.length) {
		$tbody = $(document.createElement("tbody"));
	}
	$tbody.empty();

	//Append row to tbody
	for (var i in arr) {
		$tbody.append("<tr val='" + arr[i].stockCode + "'><td><input type='checkbox'/></td><td>" + arr[i].stockCode + "</td><td>" + arr[i].stockName + "</td><td class='text-right'>" + arr[i].qtyBalance.format(2, 3) + "</td></tr>");
	}

	//Append tbody to table
	$("#modalStockFa table").append($tbody);
}
/*
function bindStockLocation(arr) {
	//Check and add table header.
	if (!$("#modalStockLocation table thead").length) {
		$("#modalStockLocation table").append("<thead><tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Location Code</th><th>Name</th><th>Address</th></tr></thead>");
	}

	//Check tbody, if not exist then create new.
	var $tbody = $("#modalStockLocation table tbody")
	if (!$tbody.length) {
		$tbody = $(document.createElement("tbody"));
	}
	$tbody.empty();

	//Append row to tbody
	for (var i in arr) {
		$tbody.append("<tr val='" + arr[i].locationCode + "'><td><input type='checkbox'/></td><td>" + arr[i].locationCode + "</td><td>" + arr[i].locationName + "</td><td>" + arr[i].address + "</td></tr>");
	}

	//Append tbody to table
	$("#modalStockLocation table").append($tbody);
}
*/
function bindStockCategory(arr) {
	//Check and add table header.
	if (!$("#modalStockCategory table thead").length) {
		$("#modalStockCategory table").append("<thead><tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Category Code</th><th>Name</th></tr></thead>");
	}

	//Check tbody, if not exist then create new.
	var $tbody = $("#modalStockCategory table tbody")
	if (!$tbody.length) {
		$tbody = $(document.createElement("tbody"));
	}
	$tbody.empty();

	//Append row to tbody
	for (var i in arr) {
		$tbody.append("<tr val='" + arr[i].categoryCode + "'><td><input type='checkbox'/></td><td>" + arr[i].categoryCode + "</td><td>" + arr[i].categoryName + "</td></tr>");
	}

	//Append tbody to table
	$("#modalStockCategory table").append($tbody);
}

function bindStockGroup(arr) {
	//Check and add table header.
	if (!$("#modalStockGroup table thead").length) {
		$("#modalStockGroup table").append("<thead><tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Group Code</th><th>Name</th></tr></thead>");
	}

	//Check tbody, if not exist then create new.
	var $tbody = $("#modalStockGroup table tbody")
	if (!$tbody.length) {
		$tbody = $(document.createElement("tbody"));
	}
	$tbody.empty();

	//Append row to tbody
	for (var i in arr) {
		$tbody.append("<tr val='" + arr[i].groupCode + "'><td><input type='checkbox'/></td><td>" + arr[i].groupCode + "</td><td>" + arr[i].groupName + "</td></tr>");
	}

	//Append tbody to table
	$("#modalStockGroup table").append($tbody);
}

function bindStockClass(arr) {
	//Check and add table header.
	if (!$("#modalStockClass table thead").length) {
		$("#modalStockClass table").append("<thead><tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Class Code</th><th>Name</th></tr></thead>");
	}

	//Check tbody, if not exist then create new.
	var $tbody = $("#modalStockClass table tbody")
	if (!$tbody.length) {
		$tbody = $(document.createElement("tbody"));
	}
	$tbody.empty();

	//Append row to tbody
	for (var i in arr) {
		$tbody.append("<tr val='" + arr[i].classCode + "'><td><input type='checkbox'/></td><td>" + arr[i].classCode + "</td><td>" + arr[i].className + "</td></tr>");
	}

	//Append tbody to table
	$("#modalStockClass table").append($tbody);
}

/*
function bindProjectCode(arr, modalCount) {
	var body = [];
	for (var i in arr) {
		body.push(
			"<tr val='" + arr[i].code + "'>" +
			"<td><input type='checkbox'/></td><td>" + arr[i].code + "</td>" +
			"<td>" + arr[i].desc + "</td><td>" + arr[i].parentcode1 + "</td>" +
			"<td>" + arr[i].parentcode2 + " </td>" +
			"</tr>"
		);
	}

	for (var i = 1; i <= modalCount; i++) {
		var modalName = '#modalProject' + i;

		$(modalName + ' table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Code</th><th>Description</th><th>Parent[1]</th><th>Parent[2]</th></tr>");
		$(modalName + ' table tbody').html(body.join(''));
	}
}
*/
////////////////////Panha New

function bindAccount(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].desc + `</td>
			<td>` + arr[i].group + `</td>
			<td>` + arr[i].special + `</td>
			</tr>`
		);
	}
	$('#modalAccount table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Project code</th><th>Name </th><th>Name 2</th><th>Parent</th></tr>");
	$('#modalAccount table tbody').html(body.join(''));
	
	/*
	//Check and add table header.
	if (!$("#modalAccount table thead").length) {
		$("#modalAccount table").append("<thead><tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Account</th><th>Group</th><th>Special</th></tr></thead>");
	}
	
	//Check tbody, if not exist then create new.
	var $tbody = $("#modalAccount table tbody")
	if (!$tbody.length) {
		$tbody = $(document.createElement("tbody"));
	}
	$tbody.empty();

	//Append row to tbody
	for (var i in arr) {
		$tbody.append("<tr val='" + arr[i].code + "'><td><input type='checkbox'/></td><td>" + arr[i].desc + "</td><td>" + arr[i].group + "</td><td>" + arr[i].special + "</td></tr>");
	}

	//Append tbody to table
	$("#modalAccount table").append($tbody);
	*/
}

function bindProject(arr, modalCount) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].name + `</td>
			<td>` + arr[i].name2 + `</td>
			<td>` + arr[i].parent + `</td>
			</tr>`
		);
	}

	for (var i = 1; i <= modalCount; i++) {
		var modalName = '#modalProject' + i;

		$(modalName + ' table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Project code</th><th>Name </th><th>Name 2</th><th>Parent</th></tr>");
		$(modalName + ' table tbody').html(body.join(''));
	}
}

function bindArReceipt(arr, modalCount) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].debtor + `</td>
			<td>` + arr[i].receiveFrom + `</td>
			</tr>`
		);
	}

	for (var i = 1; i <= modalCount; i++) {
		var modalName = '#modalProject' + i;

		$(modalName + ' table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Receipt Code</th><th>Date</th><th>Customer</th><th>Receive From</th></tr>");
		$(modalName + ' table tbody').html(body.join(''));
	}
}

function bindQt(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].debtor + `</td>
			<td>` + arr[i].debtorName + `</td>
			</tr>`
		);
	}
	$('#modalQt table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Quotation code</th><th>Date</th><th>Customer</th><th>Customer name</th></tr>");
	$('#modalQt table tbody').html(body.join(''));
}

function bindSo(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].debtor + `</td>
			<td>` + arr[i].debtorName + `</td>
			</tr>`
		);
	}
	$('#modalSo table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>SO code</th><th>Date</th><th>Customer</th><th>Customer name</th></tr>");
	$('#modalSo table tbody').html(body.join(''));
}

function bindDo(arr)
{
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].debtor + `</td>
			<td>` + arr[i].debtorName + `</td>
			</tr>`
		);
	}
	$('#modalDo table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>DO code</th><th>Date</th><th>Customer</th><th>Customer name</th></tr>");
	$('#modalDo table tbody').html(body.join(''));
}

function bindSinv(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].debtor + `</td>
			<td>` + arr[i].debtorName + `</td>
			</tr>`
		);
	}
	$('#modalSinv table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>SINV code</th><th>Date</th><th>Customer</th><th>Customer name</th></tr>");
	$('#modalSinv table tbody').html(body.join(''));
}

function bindSdn(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].debtor + `</td>
			<td>` + arr[i].debtorName + `</td>
			</tr>`
		);
	}
	$('#modalSdn table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>SDN code</th><th>Date</th><th>Customer</th><th>Customer name</th></tr>");
	$('#modalSdn table tbody').html(body.join(''));
}

function bindScn(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].debtor + `</td>
			<td>` + arr[i].debtorName + `</td>
			</tr>`
		);
	}
	$('#modalScn table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>SCN code</th><th>Date</th><th>Customer</th><th>Customer name</th></tr>");
	$('#modalScn table tbody').html(body.join(''));
}

function bindCS(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].debtor + `</td>
			<td>` + arr[i].debtorName + `</td>
			</tr>`
		);
	}
	$('#modalCS table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>CashSales code</th><th>Date</th><th>Customer</th><th>Customer name</th></tr>");
	$('#modalCS table tbody').html(body.join(''));
}

function bindGrn(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].creditor + `</td>
			<td>` + arr[i].creditorName + `</td>
			</tr>`
		);
	}
	$('#modalPinv table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>GRN code</th><th>Date</th><th>Supplier</th><th>Supplier name</th></tr>");
	$('#modalPinv table tbody').html(body.join(''));
}

function bindPinv(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].date + `</td>
			<td>` + arr[i].creditor + `</td>
			<td>` + arr[i].creditorName + `</td>
			</tr>`
		);
	}
	$('#modalPinv table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>PINV code</th><th>Date</th><th>Supplier</th><th>Supplier name</th></tr>");
	$('#modalPinv table tbody').html(body.join(''));
}

function bindStock(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].name + `</td>
			<td>` + arr[i].name2 + `</td>
			<td>` + arr[i].type + `</td>
			<td>` + arr[i].qtyBalance + `</td>
			</tr>`
		);
	}
	$('#modalStock table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Stock code</th><th>Name</th><th>Name 2</th><th>Type</th><th>Qty Balance</th></tr>");
	$('#modalStock table tbody').html(body.join(''));
}

function bindDebtor(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].name + `</td>
			<td>` + arr[i].name2 + `</td>
			<td>` + arr[i].phone1 + `</td>
			<td>` + arr[i].address1 + `</td>
			</tr>`
		);
	}
	$('#modalDebtor table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Customer Code</th><th>Name</th><th>Name 2</th><th>Phone</th><th>Address</th></tr>");
	$('#modalDebtor table tbody').html(body.join(''));
}

function bindCreditor(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].name + `</td>
			<td>` + arr[i].name2 + `</td>
			<td>` + arr[i].phone1 + `</td>
			<td>` + arr[i].address1 + `</td>
			</tr>`
		);
	}
	$('#modalCreditor table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Creditor Code</th><th>Name</th><th>Name 2</th><th>Phone</th><th>Address</th></tr>");
	$('#modalCreditor table tbody').html(body.join(''));
}

function bindSalesPerson(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].name + `</td>
			<td>` + arr[i].phone1 + `</td>
			<td>` + arr[i].email + `</td>
			</tr>
		`);
	}
	$('#modalSalesPerson table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Agent code</th><th>Name</th><th>Phone</th><th>Email</th></tr>");
	$('#modalSalesPerson table tbody').html(body.join(''));
}

function bindPurchaser(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].name + `</td>
			<td>` + arr[i].phone1 + `</td>
			<td>` + arr[i].email + `</td>
			</tr>
		`);
	}
	$('#modalPurchaser table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Puchaser code</th><th>Name</th><th>Phone</th><th>Email</th></tr>");
	$('#modalPurchaser table tbody').html(body.join(''));
}

function bindUserProfile(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].name + `</td>
			<td>` + arr[i].position + `</td>
			<td>` + arr[i].phone + `</td>
			<td>` + arr[i].email + `</td>
			</tr>
		`);
	}
	$('#modalUserProfile table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>User code</th><th>Name</th><th>Position</th><th>Phone</th><th>Email</th></tr>");
	$('#modalUserProfile table tbody').html(body.join(''));
}

function bindStockLocation(arr) {
	var body = [];
	for (var i in arr) {
		body.push(`
			<tr val="` + arr[i].code + `">
			<td><input type='checkbox'/></td>
			<td>` + arr[i].code + `</td>
			<td>` + arr[i].name + `</td>
			<td>` + arr[i].address + `</td>
			</tr>
		`);
	}
	$('#modalStockLocation table thead').html("<tr><th><input type='checkbox' onchange='checkAllChild(this)'/></th><th>Location code</th><th>Name</th><th>Address</th></tr>");
	$('#modalStockLocation table tbody').html(body.join(''));
}

function bindReportColumn(data) {
	var listLi = [];

	for (var i in data) {
		var item = data[i];
		var li = document.createElement("li");		
		li.setAttribute("ColName", item.colName);
		li.innerHTML = item.colText;		
		if (item.colRequired == 1 || item.colChecked == 1)
			li.className = "list-group-item list-group-item-action btn p-1 mt-1 list-group-item-success";
        else
			li.className = "list-group-item list-group-item-action btn p-1 mt-1 list-group-item-light";
        
		if(item.colRequired == 0)
			li.onclick = function() {
			   $(this).toggleClass("list-group-item-success list-group-item-light");
			}		
		listLi.push(li);
	}

    $("#listReportColumn").append(listLi);
    $("#listReportColumn").sortable();
    $("#listReportColumn").disableSelection();
}

function saveReportColumnData(reportName, reportPos) {
    var list = $("#listReportColumn li");
    var allColName = [];
    list.each(function (idx, li) {
        if ($(li).hasClass("list-group-item-success"))
            allColName.push($(li).attr('ColName'));
    });
	jsObject.saveReportColumn(reportName, reportPos, JSON.stringify(allColName));
}





