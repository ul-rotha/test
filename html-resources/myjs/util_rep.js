

function writeReportCenter(data)
{
	$('#data').empty();

	var reportName = "",
	reportTitle = "",
	template = "",
	templatePos = 0,
	flagText = "",
	flag = "";
	
	var file = [];

	for (var i in data) {
		reportName = data[i].reportName;
		reportTitle = data[i].reportTitle;
		template = data[i].template;
		templatePos = data[i].templatePos;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "group":
				file.push(`
					<div class="my-3 px-3 bg-white shadow-sm"><h4 class="py-2 mx-2 mb-0"> `+ flagText +` </h4>
					<div class="list-group list-group-flush mx-2">
					`);			
				break;
			case "file":
				file.push(`
				<div class="row list-group-item report" name="`+reportName+`" pos="`+templatePos+`" title="`+reportTitle+`" remark="`+template+`">					
					<a class="open">`+ reportTitle +`<span class="text-secondary"> `+ template +`</span></a>
					<span class="float-right" >`+
						(templatePos == 0 ?
							`<i class="fas fa-asterisk mr-1"></i>`
							:
							`
							<!--<a class="fav"><i class="fas fa-heart mr-1"></i></a>-->
							<a class="edit"><i class="fas fa-edit mr-1"></i></a>
							<a class="copy"><i class="fas fa-copy mr-1"></i></a>
							<a class="del"><i class="fas fa-trash-alt m-1 mr-1"></i></a>
							`
						)+
					`</span>
				</div>
				`);
				break;
			case "groupEnd":
				file.push('</div></div>');							
				break;
			default:
				break;
		}
	}
	$('#reportCenter').html(file.join(""));	
}

function gl_columns(th_td, colName, colValue)
{
	var returnCol = "";
	switch(colName) {
		case "postDate":
			if(th_td == "th")
				returnCol = "<th data-a-v='center' data-a-h='left' class='text-left'>" + colValue + "</th>";
			else if (th_td == "td")
				returnCol = "<td data-a-v='center' data-a-h='left' class='text-left pl-2'>" + (colValue == null ? "" : colValue) + "</td>";
			break;	
		case "desc1":
		case "desc2":
		case "accDesc1":
		case "accDesc2":		
		case "fromAccDesc1":
		case "fromAccDesc2":
			if(th_td == "th")
				returnCol = "<th data-a-v='center' data-a-h='left' data-a-wrap='true'>" + colValue + "</th>";
			else if (th_td == "td")
				returnCol = "<td data-a-v='center' data-a-h='left' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
			break;
		case "accCode":
		case "fromAccCode":
		case "projectCode":
		case "refNo1":
		case "refNo2":		
		case "docNo":
		case "tranId":
		case "drcr":
		case "journalType":
			if(th_td == "th")
				returnCol = "<th data-a-v='center' data-a-h='left'>" + colValue + "</th>";
			else if (th_td == "td")
				returnCol = "<td data-a-v='center' data-a-h='left'>" + (colValue == null ? "" : colValue) + "</td>";
			break;		
		case "debit":
		case "credit":
		case "balance":
			if(th_td == "th")
				returnCol = "<th data-a-v='center' data-a-h='center' class='text-right'>" + colValue + "</th>";
			else if (th_td == "td")
				returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
			break;		
		default:
		break;
	}
	return returnCol;
}

function writeGL(data, repeatHeader)
{
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	debit = 0.0,
	credit = 0.0,	
	balance = 0.0,
	drcrHide = "",
	flagText = "",
	flag = "";

	var headerCount = 0;

	for (var i in data) {
		debit = data[i].debit;
		credit = data[i].credit;		
		drcrHide = data[i].drcrHide;
		flagText = data[i].flagText;
		flag = data[i].flag;		

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");				
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += gl_columns("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;	
			case "rowstart":
				balance = 0;
				balance = data[i].balance;
				/*if (headerCount == 0 || repeatHeader == 1) {
					var tmp = "";
					for(var l in Object.keys(data[i]) )
					{
						colKey = Object.keys(data[i])[l];
						colValue = data[i][colKey];
						tmp += pinv_reg("td", colKey, colValue);
					}				
					body.push("<tr>" + tmp + "</tr>");					
					break;
					headerCount++;
				}*/
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true' data-a-h='center' data-a-wrap='true' class='text-left'"+ data[i].html +">"+ flagText + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>Begin</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + balance.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "gb0":
				body.push(
					"<tr class='font-weight-bold' flag='gb0'>" +
					"<td data-f-bold='true' colspan=100% class='pl-4'>" + flagText + "</td>" +
					"</tr>");
				break;
			case "row":
			case "rowred":
			case "rowgray":
				balance += (drcrHide == 'DR' ? debit - credit : credit - debit);
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = (colKey == "balance" ? balance : data[i][colKey]);
					tmp += gl_columns("td", colKey, colValue);
				}
				if (flag == "row")
				{
					body.push("<tr flag='row'>" + tmp + "</tr>");
				}
				else if (flag == "rowred")
				{
					body.push("<tr flag='row' class='bg-danger text-white'>" + tmp + "</tr>");
				}
				else if (flag == "rowgray")
				{
					body.push("<tr flag='row' class='bg-secondary text-white'>" + tmp + "</tr>");
				}
				break;			
			case "gb1":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += gl_columns("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");
				break;
			case "rowend":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += gl_columns("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function writeBS(data)
{
	var accountCode;
	var accountName;
	var debit;
	var credit;
	var flagText;
	var flag;

	var head = [];
	var body = [];

	for (var i in data) {
		accountCode = data[i].accountCode;
		accountName = data[i].accountName;
		debit = data[i].debit;
		credit = data[i].credit;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' colspan=3 data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=3 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=3 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "parentgb0":
				body.push(
					"<tr class='bs-parentgb'>" +
					"<td data-f-bold='true' data-f-sz='16' colspan=3>" + flagText + "</td>" +
					"</tr>");
				break;
			case "parentgb1":
				body.push(
					"<tr class='bs-parentgb-total'>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16'>" + flagText + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + debit.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + credit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "gb0":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true' colspan=3>" + flagText + "</td>" +
					"</tr>");
				break;
			case "gb1":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + flagText + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + debit.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + credit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' " + ((accountCode == 'ZZZZZZZZZZZZZZZZZZZZ') ? "data-f-bold='true' class='tab-1 font-weight-bold'" : "class='tab-1'") + ">" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + debit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + credit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-1' colspan=3>" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"</tr>");
				break;
			case "row2":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2'>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + debit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + credit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-2'>" + "&nbsp;".repeat(10) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + debit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + credit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2' colspan=3>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"</tr>");
				break;
			case "row3":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + debit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + credit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + debit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + credit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3' colspan=3>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"</tr>");
				break;
			case "row4":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + debit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + credit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + debit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + credit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function writeBS_3periods(data)
{
	var accountCode;
	var accountName;
	var amount;
	var amount2;
	var amount3;
	var flagText;
	var flag;

	var head = [];
	var body = [];
	for (var i in data) {
		accountCode = data[i].accountCode;
		accountName = data[i].accountName;
		amount = data[i].amount;
		amount2 = data[i].amount2;
		amount3 = data[i].amount3;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' colspan=4 data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=4 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=4 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "parentgb0":
				body.push(
					"<tr class='bs-parentgb'>" +
					"<td data-f-bold='true' data-f-sz='16'>" + flagText.split('@')[0] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[1] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[2] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[3] + "</td>" +
					"</tr>");
				break;
			case "parentgb1":
				body.push(
					"<tr class='bs-parentgb-total'>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16'>" + flagText + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "gb0":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true' colspan=4>" + flagText + "</td>" +
					"</tr>");
				break;
			case "gb1":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + flagText + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' " + ((accountCode == 'ZZZZZZZZZZZZZZZZZZZZ') ? "data-f-bold='true' class='tab-1 font-weight-bold'" : "class='tab-1'") + ">" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-1' colspan=4>" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"</tr>");
				break;
			case "row2":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2'>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-2'>" + "&nbsp;".repeat(10) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2' colspan=4>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"</tr>");
				break;
			case "row3":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3' colspan=4>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"</tr>");
				break;
			case "row4":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function writeBS_12months(data)
{
	var accountCode;
	var accountName;
	var amount;
	var amount2;
	var amount3;
	var amount4;
	var amount5;
	var amount6;
	var amount7;
	var amount8;
	var amount9;
	var amount10;
	var amount11;
	var amount12;
	var flagText;
	var flag;

	var head = [];
	var body = [];
	for (var i in data) {
		accountCode = data[i].accountCode;
		accountName = data[i].accountName;
		amount = data[i].amount;
		amount2 = data[i].amount2;
		amount3 = data[i].amount3;
		amount4 = data[i].amount4;
		amount5 = data[i].amount5;
		amount6 = data[i].amount6;
		amount7 = data[i].amount7;
		amount8 = data[i].amount8;
		amount9 = data[i].amount9;
		amount10 = data[i].amount10;
		amount11 = data[i].amount11;
		amount12 = data[i].amount12;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' colspan=13 data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=13 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=13 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "parentgb0":
				body.push(
					"<tr class='bs-parentgb'>" +
					"<td data-f-bold='true' data-f-sz='16'>" + flagText.split('@')[0] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[1] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[2] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[3] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[4] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[5] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[6] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[7] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[8] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[9] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[10] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[11] + "</td>" +
					"<td data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + flagText.split('@')[12] + "</td>" +
					"</tr>");
				break;
			case "parentgb1":
				body.push(
					"<tr class='bs-parentgb-total'>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16'>" + flagText + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "gb0":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true' colspan=4>" + flagText + "</td>" +
					"</tr>");
				break;
			case "gb1":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + flagText + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' " + ((accountCode == 'ZZZZZZZZZZZZZZZZZZZZ') ? "data-f-bold='true' class='tab-1 font-weight-bold'" : "class='tab-1'") + ">" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-1' colspan=4>" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"</tr>");
				break;
			case "row2":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2'>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-2'>" + "&nbsp;".repeat(10) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2' colspan=4>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"</tr>");
				break;
			case "row3":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3' colspan=4>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"</tr>");
				break;
			case "row4":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function writeTB(data)
{
	var accountCode;
	var accountName;
	var openingDebit;
	var openingCredit;
	var mtdDebit;
	var mtdCredit;
	var ytdDebit;
	var ytdCredit;
	var flagText;
	var flag;

	var head = [];
	var body = [];

	for (var i in data) {
		accountCode = data[i].accountCode;
		accountName = data[i].accountName;
		openingDebit = data[i].openingDebit;
		openingCredit = data[i].openingCredit;
		mtdDebit = data[i].mtdDebit;
		mtdCredit = data[i].mtdCredit;
		ytdDebit = data[i].ytdDebit;
		ytdCredit = data[i].ytdCredit;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' colspan=8 data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=8 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=8 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "head1":
				head.push(
					"<tr>" +
					"<th data-a-v='center' data-a-wrap='true' rowspan=2 class='align-middle'>" + flagText.split('@')[0] + "</th>" +
					"<th data-a-v='center' data-a-wrap='true' rowspan=2 class='align-middle'>" + flagText.split('@')[1] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-center' colspan=2>" + flagText.split('@')[2] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-center' colspan=2>" + flagText.split('@')[3] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-center' colspan=2>" + flagText.split('@')[4] + "</th>" +
					"</tr>");
				break;
			case "head2":
				head.push(
					"<tr>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[2] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[3] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[4] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[5] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[6] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[7] + "</th>" +
					"</tr>");
				break;
			case "row":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true'>" + accountCode + "</td>" +
					"<td data-a-v='center' data-a-wrap='true'>" + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + openingDebit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + openingCredit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + mtdDebit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + mtdCredit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + ytdDebit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + ytdCredit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "rowend":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center'></td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>Total:</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + openingDebit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + openingCredit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + mtdDebit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + mtdCredit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + ytdDebit.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + ytdCredit.format(2, 3) + "</td>" +
					"</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function writePL(data)
{
	var accountCode;
	var accountName;
	var amount;
	var flagText;
	var flag;

	var head = [];
	var body = [];

	for (var i in data) {
		accountCode = data[i].accountCode;
		accountName = data[i].accountName;
		amount = data[i].amount;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' colspan=2 data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=2 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=2 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "parentgb1":
				body.push(
					"<tr class='bs-parentgb-total'>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16'>" + flagText + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "gb0":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true' colspan=2>" + flagText + "</td>" +
					"</tr>");
				break;
			case "gb1":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true'>" + "&nbsp;".repeat(5) + flagText + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' " + ((accountCode == 'ZZZZZZZZZZZZZZZZZZZZ') ? "data-f-bold='true' class='tab-1 font-weight-bold'" : "class='tab-1'") + ">" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2start":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-1' colspan=2>" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"</tr>");
				break;
			case "row2":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2'>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-2'>" + "&nbsp;".repeat(10) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2' colspan=2>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"</tr>");
				break;
			case "row3":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3' colspan=2>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"</tr>");
				break;
			case "row4":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount.format(2, 3) + "</td>" +
					"</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function writePL_2periods(data)
{
	var accountCode;
	var accountName;
	var amount1;
	var amount2;
	var flagText;
	var flag;

	var head = [];
	var body = [];
	var headerCount = 0;
	for (var i in data) {
		accountCode = data[i].accountCode;
		accountName = data[i].accountName;
		amount1 = data[i].amount1;
		amount2 = data[i].amount2;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' colspan=4 data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=4 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=4 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "parentgb1":
				body.push(
					"<tr class='bs-parentgb-total'>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16'>" + flagText + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + (amount1 - amount2).format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "gb0":
				if (headerCount == 0) {
					body.push(
						"<tr class='font-weight-bold'>" +
						"<td data-f-bold='true'>" + flagText.split('@')[0] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[1] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[2] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[3] + "</td>" +
						"</tr>");
					headerCount = 1;
				}
				else {
					body.push(
						"<tr class='font-weight-bold'>" +
						"<td data-f-bold='true' colspan=4>" + flagText.split('@')[0] + "</td>" +
						"</tr>");
				}
				break;
			case "gb1":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true'>" + "&nbsp;".repeat(5) + flagText + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + (amount1 - amount2).format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' " + ((accountCode == 'ZZZZZZZZZZZZZZZZZZZZ') ? "data-f-bold='true' class='tab-1 font-weight-bold'" : "class='tab-1'") + ">" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + (amount1 - amount2).format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-1' colspan=4>" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"</tr>");
				break;
			case "row2":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2'>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + (amount1 - amount2).format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-2'>" + "&nbsp;".repeat(10) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + (amount1 - amount2).format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2' colspan=4>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"</tr>");
				break;
			case "row3":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + (amount1 - amount2).format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + (amount1 - amount2).format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3' colspan=4>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"</tr>");
				break;
			case "row4":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + (amount1 - amount2).format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + (amount1 - amount2).format(2, 3) + "</td>" +
					"</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function writePL_12months(data) {
	var accountCode;
	var accountName;
	var amount1;
	var amount2;
	var amount3;
	var amount4;
	var amount5;
	var amount6;
	var amount7;
	var amount8;
	var amount9;
	var amount10;
	var amount11;
	var amount12;
	var flagText;
	var flag;

	var head = [];
	var body = [];
	var headerCount = 0;
	for (var i in data) {
		accountCode = data[i].accountCode;
		accountName = data[i].accountName;
		amount1 = data[i].amount1;
		amount2 = data[i].amount2;
		amount3 = data[i].amount3;
		amount4 = data[i].amount4;
		amount5 = data[i].amount5;
		amount6 = data[i].amount6;
		amount7 = data[i].amount7;
		amount8 = data[i].amount8;
		amount9 = data[i].amount9;
		amount10 = data[i].amount10;
		amount11 = data[i].amount11;
		amount12 = data[i].amount12;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' colspan=13 data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=13 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=13 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "parentgb1":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16'>" + flagText + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "gb0":
				if (headerCount == 0) {
					body.push(
						"<tr class='font-weight-bold'>" +
						"<td data-f-bold='true'>" + flagText.split('@')[0] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[1] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[2] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[3] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[4] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[5] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[6] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[7] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[8] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[9] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[10] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[11] + "</td>" +
						"<td data-f-bold='true'  data-a-h='right' class='text-right'>" + flagText.split('@')[12] + "</td>" +
						"</tr>");
					headerCount = 1;
				}
				else {
					body.push(
						"<tr class='font-weight-bold'>" +
						"<td data-f-bold='true' colspan=13>" + flagText.split('@')[0] + "</td>" +
						"</tr>");
				}
				break;
			case "gb1":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true'>" + "&nbsp;".repeat(5) + flagText + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-f-bold='true' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' " + ((accountCode == 'ZZZZZZZZZZZZZZZZZZZZ') ? "data-f-bold='true' class='tab-1 font-weight-bold'" : "class='tab-1'") + ">" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-1' colspan=13>" + "&nbsp;".repeat(5) + accountName + "</td>" +
					"</tr>");
				break;
			case "row2":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2'>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row2end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' data-f-bold='true' class='tab-2'>" + "&nbsp;".repeat(10) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' data-f-bold='true' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-2' colspan=13>" + "&nbsp;".repeat(10) + accountName + "</td>" +
					"</tr>");
				break;
			case "row3":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row3end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3'>" + "&nbsp;".repeat(15) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4start":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-3' colspan=13>" + "&nbsp;".repeat(15) + accountName + "</td>" +
					"</tr>");
				break;
			case "row4":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "row4end":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' class='tab-4'>" + "&nbsp;".repeat(20) + "Total: " + accountName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount1.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount2.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount3.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount4.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount5.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount6.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount7.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount8.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount9.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount10.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount11.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + amount12.format(2, 3) + "</td>" +
					"</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function writeSLAB(data)
{
	var stockCode;
	var stockName;
	var stockName2;
	var uom;
	var categoryCode;
	var groupCode;
	var classCode;
	var qtyBalance;
	var stockCost;
	var stockCost_x_Qty;
	var stockPrice;
	var stockPrice_x_Qty;
	var flagText;
	var flag;

	var head = [];
	var body = [];

	for (var i in data) {
		stockCode = data[i].stockCode;
		stockName = data[i].stockName;
		stockName2 = data[i].stockName2;
		uom = data[i].uom;
		categoryCode = data[i].categoryCode;
		groupCode = data[i].groupCode;
		classCode = data[i].classCode;
		qtyBalance = data[i].qtyBalance;
		stockCost = data[i].stockCost;
		stockCost_x_Qty = data[i].cost_x_qty;
		stockPrice = data[i].stockPrice;
		stockPrice_x_Qty = data[i].price_x_qty;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' colspan=12 data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=12 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=12 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "head":
				head.push(
					"<tr>" +
					"<th data-a-v='center' data-a-wrap='true'>" + flagText.split('@')[0] + "</th>" +
					"<th data-a-v='center' data-a-wrap='true'>" + flagText.split('@')[1] + "</th>" +
					"<th data-a-v='center' data-a-wrap='true'>" + flagText.split('@')[2] + "</th>" +
					"<th data-a-v='center' data-a-h='center' class='text-center'>" + flagText.split('@')[3] + "</th>" +
					"<th data-a-v='center' data-a-h='center' class='text-center'>" + flagText.split('@')[4] + "</th>" +
					"<th data-a-v='center' data-a-h='center' class='text-center'>" + flagText.split('@')[5] + "</th>" +
					"<th data-a-v='center' data-a-h='center' class='text-center'>" + flagText.split('@')[6] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[7] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[8] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[9] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[10] + "</th>" +
					"<th data-a-v='center' data-a-h='right' class='text-right'>" + flagText.split('@')[11] + "</th>" +
					"</tr>");
				break;
			case "location":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=12 class='text-left'>" + flagText + "</td>" +
					"</tr>");
				break;
			case "groupName":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=12 class='text-left'>"+ "&nbsp;".repeat(10) + flagText + "</td>" +
					"</tr>");
				break;
			case "row":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-wrap='true'>" + stockCode + "</td>" +
					"<td data-a-v='center' data-a-wrap='true'>" + stockName + "</td>" +
					"<td data-a-v='center' data-a-wrap='true'>" + stockName2 + "</td>" +
					"<td data-a-v='center' data-a-h='center' class='text-center'>" + uom + "</td>" +
					"<td data-a-v='center' data-a-h='center' class='text-center'>" + categoryCode + "</td>" +
					"<td data-a-v='center' data-a-h='center' class='text-center'>" + groupCode + "</td>" +
					"<td data-a-v='center' data-a-h='center' class='text-center'>" + classCode + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + qtyBalance.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + stockCost.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + stockCost_x_Qty.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + stockPrice.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + stockPrice_x_Qty.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "groupTotal":
				body.push(
					"<tr class='font-weight-bold bg-light'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=7 class='text-right'>" + flagText + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + qtyBalance.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + stockCost.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + stockCost_x_Qty.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + stockPrice.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + stockPrice_x_Qty.format(2, 3) + "</td>" +
					"</tr>");
				break;
			case "grandTotal":
				body.push(
					"<tr class='font-weight-bold bg-info text-white'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=7 class='text-right'>" + flagText + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right double-underline'>" + qtyBalance.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right double-underline'>" + stockCost.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right double-underline'>" + stockCost_x_Qty.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right double-underline'>" + stockPrice.format(2, 3) + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right double-underline'>" + stockPrice_x_Qty.format(2, 3) + "</td>" +
					"</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_pr_reg(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "pqPURCHASEREQUISITIONCODE":
			case "pqCREDITORACCOUNT":
			case "pqCREDITORNAME":
			case "pqATTENTION":
			case "pqPHONE":
			case "pqFAX":
			case "pqADDRESS1":
			case "pqADDRESS2":
			case "pqADDRESS3":
			case "pqADDRESS4":
			case "pqPURCHASEREQUISITIONREFNO":
			case "pqTERMCODE":
			case "pqPURCHASERCODE":
			case "pqDELIVERYTERM":
			case "pqTITLE":
			case "pqREF1":
			case "pqREF2":
			case "pqREMARK1":
			case "pqREMARK2":
			case "pqREQUESTBY":
			case "pqASKINGAPPROVALFROM":
			case "pqAPPROVED":
			case "pqAPPROVEDBY":
			case "pqDELIVERCONTACT":
			case "pqDELIVERPHONE":
			case "pqDELIVERFAX":
			case "pqDELIVERADDRESS1":
			case "pqDELIVERADDRESS2":
			case "pqDELIVERADDRESS3":
			case "pqDELIVERADDRESS4":
			case "pqPROJECTCODE":
			case "pqJOBNAME":
			case "pqNOTES":
			case "pqFCURRENCYCODE":
			case "pqCANCELLED":
			case "pqDISCOUNTSTR":
			case "pqPURCHASETAXSTR":
			case "pqGSTTYPE":
			case "pqCLOSED":
			case "pqPASTENTRY":
			case "pqATTACHMENTS":
			case "pqASKINGAPPROVALFROM1STLEVEL":
			case "pqFIRSTLEVELAPPROVED":
			case "pqASKINGAPPROVALFROM2NDLEVEL":
			case "pqSECONDLEVELAPPROVED":
			case "pqPURCHASESTYPECODE":
			case "pqFIRSTCREATEDUSERCODE":
			case "pqLASTMODIFIEDUSERCODE":
			case "pqMODIFYCOUNT":
			case "pqLASTPRINTEDUSERCODE":
			case "pqPRINTCOUNT":
			case "pqTAXINCLUSIVE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "pqPURCHASEREQUISITIONDATE":
			case "pqREQUIREDATE":
			case "pqFIRSTLEVELAPPROVEDDATE":
			case "pqSECONDLEVELAPPROVEDDATE":
			case "pqFIRSTCREATEDDATE":
			case "pqLASTMODIFIEDDATE":
			case "pqLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "pqFRATE":
			case "pqTOTALAMOUNT":
			case "pqDISCOUNT":
			case "pqPURCHASETAX":
			case "pqLOCALTOTALAMOUNT":
			case "pqGSTTAXRATE":
			case "pqGSTAMOUNT":
			case "pqGSTTAXAMOUNT":
			case "pqGSTLAMOUNT":
			case "pqGSTTAXLAMOUNT":
			case "pqWTAXAMOUNT":
			case "pqWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_pr_reg_detail(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "pqPURCHASEREQUISITIONCODE":
			case "pqCREDITORACCOUNT":
			case "pqCREDITORNAME":
			case "pqATTENTION":
			case "pqPHONE":
			case "pqFAX":
			case "pqADDRESS1":
			case "pqADDRESS2":
			case "pqADDRESS3":
			case "pqADDRESS4":
			case "pqPURCHASEREQUISITIONREFNO":
			case "pqTERMCODE":
			case "pqPURCHASERCODE":
			case "pqDELIVERYTERM":
			case "pqTITLE":
			case "pqREF1":
			case "pqREF2":
			case "pqREMARK1":
			case "pqREMARK2":
			case "pqREQUESTBY":
			case "pqASKINGAPPROVALFROM":
			case "pqAPPROVED":
			case "pqAPPROVEDBY":
			case "pqDELIVERCONTACT":
			case "pqDELIVERPHONE":
			case "pqDELIVERFAX":
			case "pqDELIVERADDRESS1":
			case "pqDELIVERADDRESS2":
			case "pqDELIVERADDRESS3":
			case "pqDELIVERADDRESS4":
			case "pqPROJECTCODE":
			case "pqJOBNAME":
			case "pqNOTES":
			case "pqFCURRENCYCODE":
			case "pqCANCELLED":
			case "pqDISCOUNTSTR":
			case "pqPURCHASETAXSTR":
			case "pqGSTTYPE":
			case "pqCLOSED":
			case "pqPASTENTRY":
			case "pqATTACHMENTS":
			case "pqASKINGAPPROVALFROM1STLEVEL":
			case "pqFIRSTLEVELAPPROVED":
			case "pqASKINGAPPROVALFROM2NDLEVEL":
			case "pqSECONDLEVELAPPROVED":
			case "pqPURCHASESTYPECODE":
			case "pqFIRSTCREATEDUSERCODE":
			case "pqLASTMODIFIEDUSERCODE":
			case "pqMODIFYCOUNT":
			case "pqLASTPRINTEDUSERCODE":
			case "pqPRINTCOUNT":
			case "pqTAXINCLUSIVE":
			case "poPURCHASEREQUISITIONCODE":
			case "poPOS":
			case "poNUMBERING":
			case "poSTOCKCODE":
			case "poDESCRIPTION":
			case "poPROJECTCODE":
			case "poJOBNAME":
			case "poUOM":
			case "poDISCOUNT":
			case "poLOCATIONCODE":
			case "poSUPPLIERITEMCODE":
			case "poREFERENCE1":
			case "poREFERENCE2":
			case "poFROMPOS":
			case "poPUOM":
			case "poBUNDLED":
			case "poSERIALNO":
			case "poSERIALNOBYLINE":
			case "poPURCHASESTYPECODE":
			case "poSUBITEMS":
			case "poSTOCKBUNDLEDPOS":
			case "poGSTTYPE":
			case "poREFERENCE3":
			case "poREFERENCE4":
			case "poREFERENCE5":
			case "poREFERENCE6":
			case "poREFERENCE7":
			case "poREFERENCE8":
			case "poREFERENCE9":
			case "poREFERENCE10":
			case "poWTAXTYPECODE":
			case "poGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "pqPURCHASEREQUISITIONDATE":
			case "pqREQUIREDATE":
			case "pqFIRSTLEVELAPPROVEDDATE":
			case "pqSECONDLEVELAPPROVEDDATE":
			case "pqFIRSTCREATEDDATE":
			case "pqLASTMODIFIEDDATE":
			case "pqLASTPRINTEDDATE":
			case "poREQUIREDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "pqFRATE":
			case "pqTOTALAMOUNT":
			case "pqDISCOUNT":
			case "pqPURCHASETAX":
			case "pqLOCALTOTALAMOUNT":
			case "pqGSTTAXRATE":
			case "pqGSTAMOUNT":
			case "pqGSTTAXAMOUNT":
			case "pqGSTLAMOUNT":
			case "pqGSTTAXLAMOUNT":
			case "pqWTAXAMOUNT":
			case "pqWTAXLAMOUNT":
			case "poQTY":
			case "poUNITPRICE":
			case "poAMOUNT":
			case "poQTY1":
			case "poUOM1PRICE":
			case "poQTY2":
			case "poUOM2PRICE":
			case "poQTY3":
			case "poUOM3PRICE":
			case "poCANCELLEDQTY":
			case "poPACKING":
			case "poPQTY":
			case "poGSTAMOUNT":
			case "poGSTTAXAMOUNT":
			case "poWAMOUNT":
			case "poWTAXAMOUNT":
			case "poONECENTSDIFF":
			case "poADJAMOUNT":
			case "poADJTAXAMOUNT":
			case "poADJTOTALAMOUNT":
			case "poADJUNITPRICE":
			case "poADJTAXUNITPRICE":
			case "poADJTOTALUNITPRICE":
			case "poLOCALONECENTSDIFF":
			case "poTAXABLEDPURCHASES":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_po_reg(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "puPURCHASEORDERCODE":
			case "puCREDITORACCOUNT":
			case "puCREDITORNAME":
			case "puATTENTION":
			case "puPHONE":
			case "puFAX":
			case "puADDRESS1":
			case "puADDRESS2":
			case "puADDRESS3":
			case "puADDRESS4":
			case "puPURCHASEORDERREFNO":
			case "puTERMCODE":
			case "puPURCHASERCODE":
			case "puDELIVERYTERM":
			case "puTITLE":
			case "puREF1":
			case "puREF2":
			case "puREMARK1":
			case "puREMARK2":
			case "puREQUESTBY":
			case "puAPPROVEDBY":
			case "puDELIVERCONTACT":
			case "puDELIVERPHONE":
			case "puDELIVERFAX":
			case "puDELIVERADDRESS1":
			case "puDELIVERADDRESS2":
			case "puDELIVERADDRESS3":
			case "puDELIVERADDRESS4":
			case "puPROJECTCODE":
			case "puJOBNAME":
			case "puNOTES":
			case "puFCURRENCYCODE":
			case "puCANCELLED":
			case "puFROMTYPE":
			case "puFROMCODE":
			case "puDISCOUNTSTR":
			case "puPURCHASETAXSTR":
			case "puGSTTYPE":
			case "puCLOSED":
			case "puPASTENTRY":
			case "puATTACHMENTS":
			case "puPURCHASESTYPECODE":
			case "puFROMSALESORDERCODE":
			case "puFIRSTCREATEDUSERCODE":
			case "puLASTMODIFIEDUSERCODE":
			case "puMODIFYCOUNT":
			case "puLASTPRINTEDUSERCODE":
			case "puPRINTCOUNT":
			case "puTAXINCLUSIVE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "puPURCHASEORDERDATE":
			case "puREQUIREDATE":
			case "puFIRSTCREATEDDATE":
			case "puLASTMODIFIEDDATE":
			case "puLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "puFRATE":
			case "puTOTALAMOUNT":
			case "puDISCOUNT":
			case "puPURCHASETAX":
			case "puLOCALTOTALAMOUNT":
			case "puGSTTAXRATE":
			case "puGSTAMOUNT":
			case "puGSTTAXAMOUNT":
			case "puGSTLAMOUNT":
			case "puGSTTAXLAMOUNT":
			case "puWTAXAMOUNT":
			case "puWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_po_reg_detail(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "puPURCHASEORDERCODE":
			case "puCREDITORACCOUNT":
			case "puCREDITORNAME":
			case "puATTENTION":
			case "puPHONE":
			case "puFAX":
			case "puADDRESS1":
			case "puADDRESS2":
			case "puADDRESS3":
			case "puADDRESS4":
			case "puPURCHASEORDERREFNO":
			case "puTERMCODE":
			case "puPURCHASERCODE":
			case "puDELIVERYTERM":
			case "puTITLE":
			case "puREF1":
			case "puREF2":
			case "puREMARK1":
			case "puREMARK2":
			case "puREQUESTBY":
			case "puAPPROVEDBY":
			case "puDELIVERCONTACT":
			case "puDELIVERPHONE":
			case "puDELIVERFAX":
			case "puDELIVERADDRESS1":
			case "puDELIVERADDRESS2":
			case "puDELIVERADDRESS3":
			case "puDELIVERADDRESS4":
			case "puPROJECTCODE":
			case "puJOBNAME":
			case "puNOTES":
			case "puFCURRENCYCODE":
			case "puCANCELLED":
			case "puFROMTYPE":
			case "puFROMCODE":
			case "puDISCOUNTSTR":
			case "puPURCHASETAXSTR":
			case "puGSTTYPE":
			case "puCLOSED":
			case "puPASTENTRY":
			case "puATTACHMENTS":
			case "puPURCHASESTYPECODE":
			case "puFROMSALESORDERCODE":
			case "puFIRSTCREATEDUSERCODE":
			case "puLASTMODIFIEDUSERCODE":
			case "puMODIFYCOUNT":
			case "puLASTPRINTEDUSERCODE":
			case "puPRINTCOUNT":
			case "puTAXINCLUSIVE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "puPURCHASEORDERDATE":
			case "puREQUIREDATE":
			case "puFIRSTCREATEDDATE":
			case "puLASTMODIFIEDDATE":
			case "puLASTPRINTEDDATE":
			case "plREQUIREDATE":
			case "plFROMPURCHASEREQUISITIONDATE":
			case "plPURCHASEORDERCODE":
			case "plPOS":
			case "plNUMBERING":
			case "plSTOCKCODE":
			case "plDESCRIPTION":
			case "plPROJECTCODE":
			case "plJOBNAME":
			case "plUOM":
			case "plDISCOUNT":
			case "plLOCATIONCODE":
			case "plSUPPLIERITEMCODE":
			case "plREFERENCE1":
			case "plREFERENCE2":
			case "plFROMTYPE":
			case "plFROMCODE":
			case "plFROMPOS":
			case "plPUOM":
			case "plBUNDLED":
			case "plFROMPURCHASEREQUISITIONCODE":
			case "plFROMPURCHASEREQUISITIONREFNO":
			case "plSERIALNO":
			case "plSERIALNOBYLINE":
			case "plPURCHASESTYPECODE":
			case "plSUBITEMS":
			case "plTRANSFERTO":
			case "plTRANSFERTOSUPPLIERCODE":
			case "plSTOCKBUNDLEDPOS":
			case "plGSTTYPE":
			case "plREFERENCE3":
			case "plREFERENCE4":
			case "plREFERENCE5":
			case "plREFERENCE6":
			case "plREFERENCE7":
			case "plREFERENCE8":
			case "plREFERENCE9":
			case "plREFERENCE10":
			case "plWTAXTYPECODE":
			case "plGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "puFRATE":
			case "puTOTALAMOUNT":
			case "puDISCOUNT":
			case "puPURCHASETAX":
			case "puLOCALTOTALAMOUNT":
			case "puGSTTAXRATE":
			case "puGSTAMOUNT":
			case "puGSTTAXAMOUNT":
			case "puGSTLAMOUNT":
			case "puGSTTAXLAMOUNT":
			case "puWTAXAMOUNT":
			case "puWTAXLAMOUNT":
			case "plQTY":
			case "plUNITPRICE":
			case "plAMOUNT":
			case "plQTY1":
			case "plUOM1PRICE":
			case "plQTY2":
			case "plUOM2PRICE":
			case "plQTY3":
			case "plUOM3PRICE":
			case "plCANCELLEDQTY":
			case "plPACKING":
			case "plPQTY":
			case "plBACKORDER":
			case "plGSTAMOUNT":
			case "plGSTTAXAMOUNT":
			case "plWAMOUNT":
			case "plWTAXAMOUNT":
			case "plONECENTSDIFF":
			case "plADJAMOUNT":
			case "plADJTAXAMOUNT":
			case "plADJTOTALAMOUNT":
			case "plADJUNITPRICE":
			case "plADJTAXUNITPRICE":
			case "plADJTOTALUNITPRICE":
			case "plLOCALONECENTSDIFF":
			case "plTAXABLEDPURCHASES":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_grn_reg(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "gnGRNCODE":
			case "gnCREDITORACCOUNT":
			case "gnCREDITORNAME":
			case "gnATTENTION":
			case "gnPHONE":
			case "gnFAX":
			case "gnADDRESS1":
			case "gnADDRESS2":
			case "gnADDRESS3":
			case "gnADDRESS4":
			case "gnGRNREFNO":
			case "gnSUPPLIERDONO":
			case "gnTERMCODE":
			case "gnPURCHASERCODE":
			case "gnDELIVERYTERM":
			case "gnTITLE":
			case "gnREF1":
			case "gnREF2":
			case "gnREMARK1":
			case "gnREMARK2":
			case "gnDELIVERCONTACT":
			case "gnDELIVERPHONE":
			case "gnDELIVERFAX":
			case "gnDELIVERADDRESS1":
			case "gnDELIVERADDRESS2":
			case "gnDELIVERADDRESS3":
			case "gnDELIVERADDRESS4":
			case "gnPROJECTCODE":
			case "gnJOBNAME":
			case "gnNOTES":
			case "gnFCURRENCYCODE":
			case "gnCANCELLED":
			case "gnFROMTYPE":
			case "gnFROMCODE":
			case "gnDISCOUNTSTR":
			case "gnPURCHASETAXSTR":
			case "gnDETAILPOSTING2GL":
			case "gnGROUPACCOUNTPOSTING":
			case "gnGRNGLTRANSACTIONID":
			case "gnACCRUALSTOCKRECEIVEDCODE":
			case "gnGSTTYPE":
			case "gnCLOSED":
			case "gnPASTENTRY":
			case "gnATTACHMENTS":
			case "gnPURCHASESTYPECODE":
			case "gnFIRSTCREATEDUSERCODE":
			case "gnLASTMODIFIEDUSERCODE":
			case "gnMODIFYCOUNT":
			case "gnLASTPRINTEDUSERCODE":
			case "gnPRINTCOUNT":
			case "gnTAXINCLUSIVE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "gnGRNDATE":
			case "gnFIRSTCREATEDDATE":
			case "gnLASTMODIFIEDDATE":
			case "gnLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "gnFRATE":
			case "gnTOTALAMOUNT":
			case "gnDISCOUNT":
			case "gnPURCHASETAX":
			case "gnLOCALTOTALAMOUNT":
			case "gnGSTTAXRATE":
			case "gnGSTAMOUNT":
			case "gnGSTTAXAMOUNT":
			case "gnGSTLAMOUNT":
			case "gnGSTTAXLAMOUNT":
			case "gnWTAXAMOUNT":
			case "gnWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_grn_reg_detail(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "gnGRNCODE":
			case "gnCREDITORACCOUNT":
			case "gnCREDITORNAME":
			case "gnATTENTION":
			case "gnPHONE":
			case "gnFAX":
			case "gnADDRESS1":
			case "gnADDRESS2":
			case "gnADDRESS3":
			case "gnADDRESS4":
			case "gnGRNREFNO":
			case "gnSUPPLIERDONO":
			case "gnTERMCODE":
			case "gnPURCHASERCODE":
			case "gnDELIVERYTERM":
			case "gnTITLE":
			case "gnREF1":
			case "gnREF2":
			case "gnREMARK1":
			case "gnREMARK2":
			case "gnDELIVERCONTACT":
			case "gnDELIVERPHONE":
			case "gnDELIVERFAX":
			case "gnDELIVERADDRESS1":
			case "gnDELIVERADDRESS2":
			case "gnDELIVERADDRESS3":
			case "gnDELIVERADDRESS4":
			case "gnPROJECTCODE":
			case "gnJOBNAME":
			case "gnNOTES":
			case "gnFCURRENCYCODE":
			case "gnCANCELLED":
			case "gnFROMTYPE":
			case "gnFROMCODE":
			case "gnDISCOUNTSTR":
			case "gnPURCHASETAXSTR":
			case "gnDETAILPOSTING2GL":
			case "gnGROUPACCOUNTPOSTING":
			case "gnGRNGLTRANSACTIONID":
			case "gnACCRUALSTOCKRECEIVEDCODE":
			case "gnGSTTYPE":
			case "gnCLOSED":
			case "gnPASTENTRY":
			case "gnATTACHMENTS":
			case "gnPURCHASESTYPECODE":
			case "gnFIRSTCREATEDUSERCODE":
			case "gnLASTMODIFIEDUSERCODE":
			case "gnMODIFYCOUNT":
			case "gnLASTPRINTEDUSERCODE":
			case "gnPRINTCOUNT":
			case "gnTAXINCLUSIVE":
			case "gtGRNCODE":
			case "gtPOS":
			case "gtNUMBERING":
			case "gtSTOCKCODE":
			case "gtDESCRIPTION":
			case "gtPROJECTCODE":
			case "gtJOBNAME":
			case "gtUOM":
			case "gtDISCOUNT":
			case "gtLOCATIONCODE":
			case "gtSUPPLIERITEMCODE":
			case "gtREFERENCE1":
			case "gtREFERENCE2":
			case "gtFROMTYPE":
			case "gtFROMCODE":
			case "gtFROMPOS":
			case "gtSTOCKTRANSACTIONID":
			case "gtGLACCOUNTCODE":
			case "gtPUOM":
			case "gtBUNDLED":
			case "gtBATCHNO":
			case "gtFROMPURCHASEREQUISITIONCODE":
			case "gtFROMPURCHASEREQUISITIONREFNO":
			case "gtFROMPURCHASEORDERCODE":
			case "gtFROMPURCHASEORDERREFNO":
			case "gtSERIALNO":
			case "gtSERIALNOBYLINE":
			case "gtPURCHASESTYPECODE":
			case "gtSUBITEMS":
			case "gtSTOCKBUNDLEDPOS":
			case "gtGSTTYPE":
			case "gtREFERENCE3":
			case "gtREFERENCE4":
			case "gtREFERENCE5":
			case "gtREFERENCE6":
			case "gtREFERENCE7":
			case "gtREFERENCE8":
			case "gtREFERENCE9":
			case "gtREFERENCE10":
			case "gtWTAXTYPECODE":
			case "gtGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "gnGRNDATE":
			case "gnFIRSTCREATEDDATE":
			case "gnLASTMODIFIEDDATE":
			case "gnLASTPRINTEDDATE":
			case "gtBATCHNOEXPIRYDATE":
			case "gtFROMPURCHASEREQUISITIONDATE":
			case "gtFROMPURCHASEORDERDATE":
			case "gtREQUIREDATE":
			case "gtBNMANUFACTURINGDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "gnFRATE":
			case "gnTOTALAMOUNT":
			case "gnDISCOUNT":
			case "gnPURCHASETAX":
			case "gnLOCALTOTALAMOUNT":
			case "gnGSTTAXRATE":
			case "gnGSTAMOUNT":
			case "gnGSTTAXAMOUNT":
			case "gnGSTLAMOUNT":
			case "gnGSTTAXLAMOUNT":
			case "gnWTAXAMOUNT":
			case "gnWTAXLAMOUNT":
			case "gtQTY":
			case "gtUNITPRICE":
			case "gtAMOUNT":
			case "gtQTY1":
			case "gtUOM1PRICE":
			case "gtQTY2":
			case "gtUOM2PRICE":
			case "gtQTY3":
			case "gtUOM3PRICE":
			case "gtCANCELLEDQTY":
			case "gtCOSTA":
			case "gtCOSTB":
			case "gtCOSTC":
			case "gtCOSTD":
			case "gtPACKING":
			case "gtPQTY":
			case "gtBACKORDER":
			case "gtPOQTY":
			case "gtGSTAMOUNT":
			case "gtGSTTAXAMOUNT":
			case "gtWAMOUNT":
			case "gtWTAXAMOUNT":
			case "gtONECENTSDIFF":
			case "gtADJAMOUNT":
			case "gtADJTAXAMOUNT":
			case "gtADJTOTALAMOUNT":
			case "gtADJUNITPRICE":
			case "gtADJTAXUNITPRICE":
			case "gtADJTOTALUNITPRICE":
			case "gtLOCALONECENTSDIFF":
			case "gtTAXABLEDPURCHASES":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_inv_reg(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "pvPURCHASEINVOICECODE":
			case "pvCREDITORACCOUNT":
			case "pvCREDITORNAME":
			case "pvATTENTION":
			case "pvPHONE":
			case "pvFAX":
			case "pvADDRESS1":
			case "pvADDRESS2":
			case "pvADDRESS3":
			case "pvADDRESS4":
			case "pvPURCHASEINVOICEREFNO":
			case "pvSUPPLIERDONO":
			case "pvSUPPLIERINVNO":
			case "pvTERMCODE":
			case "pvPURCHASERCODE":
			case "pvDELIVERYTERM":
			case "pvTITLE":
			case "pvTITLE2":
			case "pvREF1":
			case "pvREF2":
			case "pvREMARK1":
			case "pvREMARK2":
			case "pvDELIVERCONTACT":
			case "pvDELIVERPHONE":
			case "pvDELIVERFAX":
			case "pvDELIVERADDRESS1":
			case "pvDELIVERADDRESS2":
			case "pvDELIVERADDRESS3":
			case "pvDELIVERADDRESS4":
			case "pvPROJECTCODE":
			case "pvJOBNAME":
			case "pvNOTES":
			case "pvFCURRENCYCODE":
			case "pvCANCELLED":
			case "pvFROMTYPE":
			case "pvFROMCODE":
			case "pvRECEIVED":
			case "pvDETAILPOSTING2GL":
			case "pvGROUPACCOUNTPOSTING":
			case "pvDISCOUNTSTR":
			case "pvPURCHASETAXSTR":
			case "pvACCRUALSTOCKRECEIVEDCODE":
			case "pvGSTTYPE":
			case "pvPASTENTRY":
			case "pvATTACHMENTS":
			case "pvPURCHASESTYPECODE":
			case "pvFIRSTCREATEDUSERCODE":
			case "pvLASTMODIFIEDUSERCODE":
			case "pvMODIFYCOUNT":
			case "pvLASTPRINTEDUSERCODE":
			case "pvPRINTCOUNT":
			case "pvTAXINCLUSIVE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "pvPURCHASEINVOICEDATE":
			case "pvPOSTDATE":
			case "pvFIRSTCREATEDDATE":
			case "pvLASTMODIFIEDDATE":
			case "pvLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "pvFRATE":
			case "pvDISCOUNT":
			case "pvPURCHASETAX":
			case "pvMISCCHARGES":
			case "pvTOTALAMOUNT":
			case "pvLOCALTOTALAMOUNT":
			case "pvGSTTAXRATE":
			case "pvGSTAMOUNT":
			case "pvGSTTAXAMOUNT":
			case "pvGSTLAMOUNT":
			case "pvGSTTAXLAMOUNT":
			case "pvWTAXAMOUNT":
			case "pvWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_inv_reg_detail(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "pvPURCHASEINVOICECODE":
			case "pvCREDITORACCOUNT":
			case "pvCREDITORNAME":
			case "pvATTENTION":
			case "pvPHONE":
			case "pvFAX":
			case "pvADDRESS1":
			case "pvADDRESS2":
			case "pvADDRESS3":
			case "pvADDRESS4":
			case "pvPURCHASEINVOICEREFNO":
			case "pvSUPPLIERDONO":
			case "pvSUPPLIERINVNO":
			case "pvTERMCODE":
			case "pvPURCHASERCODE":
			case "pvDELIVERYTERM":
			case "pvTITLE":
			case "pvTITLE2":
			case "pvREF1":
			case "pvREF2":
			case "pvREMARK1":
			case "pvREMARK2":
			case "pvDELIVERCONTACT":
			case "pvDELIVERPHONE":
			case "pvDELIVERFAX":
			case "pvDELIVERADDRESS1":
			case "pvDELIVERADDRESS2":
			case "pvDELIVERADDRESS3":
			case "pvDELIVERADDRESS4":
			case "pvPROJECTCODE":
			case "pvJOBNAME":
			case "pvNOTES":
			case "pvFCURRENCYCODE":
			case "pvCANCELLED":
			case "pvFROMTYPE":
			case "pvFROMCODE":
			case "pvRECEIVED":
			case "pvDETAILPOSTING2GL":
			case "pvGROUPACCOUNTPOSTING":
			case "pvDISCOUNTSTR":
			case "pvPURCHASETAXSTR":
			case "pvACCRUALSTOCKRECEIVEDCODE":
			case "pvGSTTYPE":
			case "pvPASTENTRY":
			case "pvATTACHMENTS":
			case "pvPURCHASESTYPECODE":
			case "pvFIRSTCREATEDUSERCODE":
			case "pvLASTMODIFIEDUSERCODE":
			case "pvMODIFYCOUNT":
			case "pvLASTPRINTEDUSERCODE":
			case "pvPRINTCOUNT":
			case "pvTAXINCLUSIVE":
			case "pePURCHASEINVOICECODE":
			case "pePOS":
			case "peNUMBERING":
			case "peSTOCKCODE":
			case "peDESCRIPTION":
			case "pePROJECTCODE":
			case "peJOBNAME":
			case "peUOM":
			case "peDISCOUNT":
			case "peLOCATIONCODE":
			case "peSUPPLIERITEMCODE":
			case "peREFERENCE1":
			case "peREFERENCE2":
			case "peFROMTYPE":
			case "peFROMCODE":
			case "peFROMPOS":
			case "peSTOCKTRANSACTIONID":
			case "peGLACCOUNTCODE":
			case "pePUOM":
			case "peBUNDLED":
			case "peBATCHNO":
			case "peFROMPURCHASEREQUISITIONCODE":
			case "peFROMPURCHASEREQUISITIONREFNO":
			case "peFROMPURCHASEORDERCODE":
			case "peFROMPURCHASEORDERREFNO":
			case "peFROMGRNCODE":
			case "peFROMGRNREFNO":
			case "peFROMGRNSUPPLIERDONO":
			case "peSERIALNO":
			case "peSERIALNOBYLINE":
			case "pePURCHASESTYPECODE":
			case "peSUBITEMS":
			case "peSTOCKBUNDLEDPOS":
			case "peGSTTYPE":
			case "peREFERENCE3":
			case "peREFERENCE4":
			case "peREFERENCE5":
			case "peREFERENCE6":
			case "peREFERENCE7":
			case "peREFERENCE8":
			case "peREFERENCE9":
			case "peREFERENCE10":
			case "peWTAXTYPECODE":
			case "peGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "pvPURCHASEINVOICEDATE":
			case "pvPOSTDATE":
			case "pvFIRSTCREATEDDATE":
			case "pvLASTMODIFIEDDATE":
			case "pvLASTPRINTEDDATE":
			case "peBATCHNOEXPIRYDATE":
			case "peFROMPURCHASEREQUISITIONDATE":
			case "peFROMPURCHASEORDERDATE":
			case "peFROMGRNDATE":
			case "peBNMANUFACTURINGDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "pvFRATE":
			case "pvDISCOUNT":
			case "pvPURCHASETAX":
			case "pvMISCCHARGES":
			case "pvTOTALAMOUNT":
			case "pvLOCALTOTALAMOUNT":
			case "pvGSTTAXRATE":
			case "pvGSTAMOUNT":
			case "pvGSTTAXAMOUNT":
			case "pvGSTLAMOUNT":
			case "pvGSTTAXLAMOUNT":
			case "pvWTAXAMOUNT":
			case "pvWTAXLAMOUNT":
			case "peQTY":
			case "peUNITPRICE":
			case "pePURCHASETAX":
			case "peAMOUNT":
			case "peQTY1":
			case "peUOM1PRICE":
			case "peQTY2":
			case "peUOM2PRICE":
			case "peQTY3":
			case "peUOM3PRICE":
			case "peCOSTA":
			case "peCOSTB":
			case "peCOSTC":
			case "peCOSTD":
			case "pePACKING":
			case "pePQTY":
			case "peBACKORDER":
			case "pePOQTY":
			case "peGSTAMOUNT":
			case "peGSTTAXAMOUNT":
			case "peWTAXAMOUNT":
			case "peWAMOUNT":
			case "peONECENTSDIFF":
			case "peADJAMOUNT":
			case "peADJTAXAMOUNT":
			case "peADJTOTALAMOUNT":
			case "peADJUNITPRICE":
			case "peADJTAXUNITPRICE":
			case "peADJTOTALUNITPRICE":
			case "peLOCALONECENTSDIFF":
			case "peTAXABLEDPURCHASES":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_return_reg(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "pnPURCHASERETURNCODE":
			case "pnCREDITORACCOUNT":
			case "pnCREDITORNAME":
			case "pnATTENTION":
			case "pnPHONE":
			case "pnFAX":
			case "pnADDRESS1":
			case "pnADDRESS2":
			case "pnADDRESS3":
			case "pnADDRESS4":
			case "pnPURCHASERETURNREFNO":
			case "pnSUPPLIERCNNO":
			case "pnTITLE":
			case "pnTITLE2":
			case "pnREF1":
			case "pnREF2":
			case "pnREMARK1":
			case "pnREMARK2":
			case "pnDELIVERCONTACT":
			case "pnDELIVERPHONE":
			case "pnDELIVERFAX":
			case "pnDELIVERADDRESS1":
			case "pnDELIVERADDRESS2":
			case "pnDELIVERADDRESS3":
			case "pnDELIVERADDRESS4":
			case "pnPROJECTCODE":
			case "pnJOBNAME":
			case "pnNOTES":
			case "pnFCURRENCYCODE":
			case "pnCANCELLED":
			case "pnRECEIVED":
			case "pnDETAILPOSTING2GL":
			case "pnGROUPACCOUNTPOSTING":
			case "pnDISCOUNTSTR":
			case "pnPURCHASETAXSTR":
			case "pnGSTTYPE":
			case "pnPASTENTRY":
			case "pnPURCHASERCODE":
			case "pnATTACHMENTS":
			case "pnPURCHASESTYPECODE":
			case "pnFIRSTCREATEDUSERCODE":
			case "pnLASTMODIFIEDUSERCODE":
			case "pnMODIFYCOUNT":
			case "pnLASTPRINTEDUSERCODE":
			case "pnPRINTCOUNT":
			case "pnTAXINCLUSIVE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "pnPURCHASERETURNDATE":
			case "pnPOSTDATE":
			case "pnFIRSTCREATEDDATE":
			case "pnLASTMODIFIEDDATE":
			case "pnLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "pnFRATE":
			case "pnDISCOUNT":
			case "pnPURCHASETAX":
			case "pnMISCCHARGES":
			case "pnTOTALAMOUNT":
			case "pnLOCALTOTALAMOUNT":
			case "pnGSTTAXRATE":
			case "pnGSTAMOUNT":
			case "pnGSTTAXAMOUNT":
			case "pnGSTLAMOUNT":
			case "pnGSTTAXLAMOUNT":
			case "pnWTAXAMOUNT":
			case "pnWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_p_return_reg_detail(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "pnPURCHASERETURNCODE":
			case "pnCREDITORACCOUNT":
			case "pnCREDITORNAME":
			case "pnATTENTION":
			case "pnPHONE":
			case "pnFAX":
			case "pnADDRESS1":
			case "pnADDRESS2":
			case "pnADDRESS3":
			case "pnADDRESS4":
			case "pnPURCHASERETURNREFNO":
			case "pnSUPPLIERCNNO":
			case "pnTITLE":
			case "pnTITLE2":
			case "pnREF1":
			case "pnREF2":
			case "pnREMARK1":
			case "pnREMARK2":
			case "pnDELIVERCONTACT":
			case "pnDELIVERPHONE":
			case "pnDELIVERFAX":
			case "pnDELIVERADDRESS1":
			case "pnDELIVERADDRESS2":
			case "pnDELIVERADDRESS3":
			case "pnDELIVERADDRESS4":
			case "pnPROJECTCODE":
			case "pnJOBNAME":
			case "pnNOTES":
			case "pnFCURRENCYCODE":
			case "pnCANCELLED":
			case "pnRECEIVED":
			case "pnDETAILPOSTING2GL":
			case "pnGROUPACCOUNTPOSTING":
			case "pnDISCOUNTSTR":
			case "pnPURCHASETAXSTR":
			case "pnGSTTYPE":
			case "pnPASTENTRY":
			case "pnPURCHASERCODE":
			case "pnATTACHMENTS":
			case "pnPURCHASESTYPECODE":
			case "pnFIRSTCREATEDUSERCODE":
			case "pnLASTMODIFIEDUSERCODE":
			case "pnMODIFYCOUNT":
			case "pnLASTPRINTEDUSERCODE":
			case "pnPRINTCOUNT":
			case "pnTAXINCLUSIVE":
			case "pfPURCHASERETURNCODE":
			case "pfPOS":
			case "pfNUMBERING":
			case "pfSTOCKCODE":
			case "pfDESCRIPTION":
			case "pfPROJECTCODE":
			case "pfJOBNAME":
			case "pfUOM":
			case "pfDISCOUNT":
			case "pfLOCATIONCODE":
			case "pfSUPPLIERITEMCODE":
			case "pfREFERENCE1":
			case "pfREFERENCE2":
			case "pfSTOCKTRANSACTIONID":
			case "pfGLACCOUNTCODE":
			case "pfPUOM":
			case "pfBUNDLED":
			case "pfBATCHNO":
			case "pfBATCHNOFROMTYPE":
			case "pfBATCHNOFROMCODE":
			case "pfBATCHNOFROMPOS":
			case "pfSERIALNO":
			case "pfSERIALNOBYLINE":
			case "pfPURCHASESTYPECODE":
			case "pfSUBITEMS":
			case "pfSTOCKBUNDLEDPOS":
			case "pfGSTTYPE":
			case "pfREFERENCE3":
			case "pfREFERENCE4":
			case "pfREFERENCE5":
			case "pfREFERENCE6":
			case "pfREFERENCE7":
			case "pfREFERENCE8":
			case "pfREFERENCE9":
			case "pfREFERENCE10":
			case "pfWTAXTYPECODE":
			case "pfGSTTAXCODE":
			case "pfMATCHEDPURCHASEINVOICE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "pnPURCHASERETURNDATE":
			case "pnPOSTDATE":
			case "pnFIRSTCREATEDDATE":
			case "pnLASTMODIFIEDDATE":
			case "pnLASTPRINTEDDATE":
			case "pfBATCHNOEXPIRYDATE":
			case "pfBNMANUFACTURINGDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "pnFRATE":
			case "pnDISCOUNT":
			case "pnPURCHASETAX":
			case "pnMISCCHARGES":
			case "pnTOTALAMOUNT":
			case "pnLOCALTOTALAMOUNT":
			case "pnGSTTAXRATE":
			case "pnGSTAMOUNT":
			case "pnGSTTAXAMOUNT":
			case "pnGSTLAMOUNT":
			case "pnGSTTAXLAMOUNT":
			case "pnWTAXAMOUNT":
			case "pnWTAXLAMOUNT":
			case "pfQTY":
			case "pfUNITPRICE":
			case "pfPURCHASETAX":
			case "pfAMOUNT":
			case "pfQTY1":
			case "pfUOM1PRICE":
			case "pfQTY2":
			case "pfUOM2PRICE":
			case "pfQTY3":
			case "pfUOM3PRICE":
			case "pfPACKING":
			case "pfPQTY":
			case "pfGSTAMOUNT":
			case "pfGSTTAXAMOUNT":
			case "pfWAMOUNT":
			case "pfWTAXAMOUNT":
			case "pfONECENTSDIFF":
			case "pfADJAMOUNT":
			case "pfADJTAXAMOUNT":
			case "pfADJTOTALAMOUNT":
			case "pfADJUNITPRICE":
			case "pfADJTAXUNITPRICE":
			case "pfADJTOTALUNITPRICE":
			case "pfLOCALONECENTSDIFF":
			case "pfTAXABLEDPURCHASES":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_qt_reg(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "quQUOTATIONCODE":
			case "quDEBTORACCOUNT":
			case "quDEBTORNAME":
			case "quATTENTION":
			case "quPHONE":
			case "quFAX":
			case "quADDRESS1":
			case "quADDRESS2":
			case "quADDRESS3":
			case "quADDRESS4":
			case "quQUOTATIONREFNO":
			case "quTERMCODE":
			case "quSALESPERSONCODE":
			case "quVALIDITY":
			case "quDELIVERYTERM":
			case "quTITLE":
			case "quREF1":
			case "quREF2":
			case "quREF3":
			case "quREF4":
			case "quREF5":
			case "quREMARK1":
			case "quREMARK2":
			case "quREMARK3":
			case "quREMARK4":
			case "quREMARK5":
			case "quSALESTAXEXEMPTIONNO":
			case "quDOBRANCHNAME":
			case "quDOCONTACT":
			case "quDOPHONE":
			case "quDOFAX":
			case "quDOADDRESS1":
			case "quDOADDRESS2":
			case "quDOADDRESS3":
			case "quDOADDRESS4":
			case "quPROJECTCODE":
			case "quJOBNAME":
			case "quNOTES":
			case "quFCURRENCYCODE":
			case "quCANCELLED":
			case "quDISCOUNTSTR":
			case "quSALESTAXSTR":
			case "quPRINTCOUNT":
			case "quGSTTYPE":
			case "quCLOSED":
			case "quPASTENTRY":
			case "quATTACHMENTS":
			case "quSALESTYPECODE":
			case "quPRICETAG":
			case "quDOLONGBRANCHNAME":
			case "quFIRSTCREATEDUSERCODE":
			case "quLASTMODIFIEDUSERCODE":
			case "quMODIFYCOUNT":
			case "quLASTPRINTEDUSERCODE":
			case "quTAXINCLUSIVE":
			case "quDISCOUNTGSTTYPE":
			case "quSERVICEGSTTYPE":
			case "quGSTTAXCODE":
			case "quDISGSTTAXCODE":
			case "quSTGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "quQUOTATIONDATE":
			case "quSALESTAXEXPIRYDATE":
			case "quFIRSTCREATEDDATE":
			case "quLASTMODIFIEDDATE":
			case "quLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "quFRATE":
			case "quTOTALAMOUNT":
			case "quDISCOUNT":
			case "quSALESTAX":
			case "quLOCALTOTALAMOUNT":
			case "quGSTTAXRATE":
			case "quGSTAMOUNT":
			case "quGSTTAXAMOUNT":
			case "quGSTLAMOUNT":
			case "quGSTTAXLAMOUNT":
			case "quDISGSTAMOUNT":
			case "quDISGSTTAXAMOUNT":
			case "quSTGSTAMOUNT":
			case "quSTGSTTAXAMOUNT":
			case "quWTAXAMOUNT":
			case "quWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_qt_reg_detail(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "quQUOTATIONCODE":
			case "quDEBTORACCOUNT":
			case "quDEBTORNAME":
			case "quATTENTION":
			case "quPHONE":
			case "quFAX":
			case "quADDRESS1":
			case "quADDRESS2":
			case "quADDRESS3":
			case "quADDRESS4":
			case "quQUOTATIONREFNO":
			case "quTERMCODE":
			case "quSALESPERSONCODE":
			case "quVALIDITY":
			case "quDELIVERYTERM":
			case "quTITLE":
			case "quREF1":
			case "quREF2":
			case "quREF3":
			case "quREF4":
			case "quREF5":
			case "quREMARK1":
			case "quREMARK2":
			case "quREMARK3":
			case "quREMARK4":
			case "quREMARK5":
			case "quSALESTAXEXEMPTIONNO":
			case "quDOBRANCHNAME":
			case "quDOCONTACT":
			case "quDOPHONE":
			case "quDOFAX":
			case "quDOADDRESS1":
			case "quDOADDRESS2":
			case "quDOADDRESS3":
			case "quDOADDRESS4":
			case "quPROJECTCODE":
			case "quJOBNAME":
			case "quNOTES":
			case "quFCURRENCYCODE":
			case "quCANCELLED":
			case "quDISCOUNTSTR":
			case "quSALESTAXSTR":
			case "quPRINTCOUNT":
			case "quGSTTYPE":
			case "quCLOSED":
			case "quPASTENTRY":
			case "quATTACHMENTS":
			case "quSALESTYPECODE":
			case "quPRICETAG":
			case "quDOLONGBRANCHNAME":
			case "quFIRSTCREATEDUSERCODE":
			case "quLASTMODIFIEDUSERCODE":
			case "quMODIFYCOUNT":
			case "quLASTPRINTEDUSERCODE":
			case "quTAXINCLUSIVE":
			case "quDISCOUNTGSTTYPE":
			case "quSERVICEGSTTYPE":
			case "quGSTTAXCODE":
			case "quDISGSTTAXCODE":
			case "quSTGSTTAXCODE":
			case "qdQUOTATIONCODE":
			case "qdPOS":
			case "qdNUMBERING":
			case "qdSTOCKCODE":
			case "qdDESCRIPTION":
			case "qdPROJECTCODE":
			case "qdJOBNAME":
			case "qdUOM":
			case "qdDISCOUNT":
			case "qdLOCATIONCODE":
			case "qdCUSTOMERITEMCODE":
			case "qdREFERENCE1":
			case "qdREFERENCE2":
			case "qdPUOM":
			case "qdBUNDLED":
			case "qdSERIALNO":
			case "qdSERIALNOBYLINE":
			case "qdSALESTYPECODE":
			case "qdTAGCODE":
			case "qdSUBITEMS":
			case "qdSTOCKBUNDLEDPOS":
			case "qdGSTTYPE":
			case "qdREFERENCE3":
			case "qdREFERENCE4":
			case "qdREFERENCE5":
			case "qdREFERENCE6":
			case "qdREFERENCE7":
			case "qdREFERENCE8":
			case "qdREFERENCE9":
			case "qdREFERENCE10":
			case "qdWTAXTYPECODE":
			case "qdGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "quQUOTATIONDATE":
			case "quSALESTAXEXPIRYDATE":
			case "quFIRSTCREATEDDATE":
			case "quLASTMODIFIEDDATE":
			case "quLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "quFRATE":
			case "quTOTALAMOUNT":
			case "quDISCOUNT":
			case "quSALESTAX":
			case "quLOCALTOTALAMOUNT":
			case "quGSTTAXRATE":
			case "quGSTAMOUNT":
			case "quGSTTAXAMOUNT":
			case "quGSTLAMOUNT":
			case "quGSTTAXLAMOUNT":
			case "quDISGSTAMOUNT":
			case "quDISGSTTAXAMOUNT":
			case "quSTGSTAMOUNT":
			case "quSTGSTTAXAMOUNT":
			case "quWTAXAMOUNT":
			case "quWTAXLAMOUNT":
			case "qdQTY":
			case "qdUNITPRICE":
			case "qdSALESTAX":
			case "qdAMOUNT":
			case "qdQTY1":
			case "qdUOM1PRICE":
			case "qdQTY2":
			case "qdUOM2PRICE":
			case "qdQTY3":
			case "qdUOM3PRICE":
			case "qdCANCELLEDQTY":
			case "qdPACKING":
			case "qdPQTY":
			case "qdSERVICECOST":
			case "qdGSTAMOUNT":
			case "qdGSTTAXAMOUNT":
			case "qdTAXABLEDSALES":
			case "qdWAMOUNT":
			case "qdWTAXAMOUNT":
			case "qdONECENTSDIFF":
			case "qdADJAMOUNT":
			case "qdADJTAXAMOUNT":
			case "qdADJTOTALAMOUNT":
			case "qdADJUNITPRICE":
			case "qdADJTAXUNITPRICE":
			case "qdADJTOTALUNITPRICE":
			case "qdLOCALONECENTSDIFF":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_so_reg(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "soSALESORDERCODE":
			case "soDEBTORACCOUNT":
			case "soDEBTORNAME":
			case "soATTENTION":
			case "soPHONE":
			case "soFAX":
			case "soADDRESS1":
			case "soADDRESS2":
			case "soADDRESS3":
			case "soADDRESS4":
			case "soSALESORDERREFNO":
			case "soTERMCODE":
			case "soSALESPERSONCODE":
			case "soDELIVERYTERM":
			case "soTITLE":
			case "soREF1":
			case "soREF2":
			case "soREF3":
			case "soREF4":
			case "soREF5":
			case "soREMARK1":
			case "soREMARK2":
			case "soREMARK3":
			case "soREMARK4":
			case "soREMARK5":
			case "soSALESTAXEXEMPTIONNO":
			case "soDOBRANCHNAME":
			case "soDOCONTACT":
			case "soDOPHONE":
			case "soDOFAX":
			case "soDOADDRESS1":
			case "soDOADDRESS2":
			case "soDOADDRESS3":
			case "soDOADDRESS4":
			case "soPROJECTCODE":
			case "soJOBNAME":
			case "soNOTES":
			case "soFCURRENCYCODE":
			case "soCANCELLED":
			case "soFROMTYPE":
			case "soFROMCODE":
			case "soDISCOUNTSTR":
			case "soSALESTAXSTR":
			case "soPRINTCOUNT":
			case "soGSTTYPE":
			case "soCLOSED":
			case "soPASTENTRY":
			case "soATTACHMENTS":
			case "soSALESTYPECODE":
			case "soPRICETAG":
			case "soDOLONGBRANCHNAME":
			case "soFIRSTCREATEDUSERCODE":
			case "soLASTMODIFIEDUSERCODE":
			case "soMODIFYCOUNT":
			case "soLASTPRINTEDUSERCODE":
			case "soTAXINCLUSIVE":
			case "soDISCOUNTGSTTYPE":
			case "soSERVICEGSTTYPE":
			case "soSUPERVISOR":
			case "soGSTTAXCODE":
			case "soDISGSTTAXCODE":
			case "soSTGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "soSALESORDERDATE":
			case "soREQUIREDATE":
			case "soSALESTAXEXPIRYDATE":
			case "soFIRSTCREATEDDATE":
			case "soLASTMODIFIEDDATE":
			case "soLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "soFRATE":
			case "soTOTALAMOUNT":
			case "soDISCOUNT":
			case "soSALESTAX":
			case "soLOCALTOTALAMOUNT":
			case "soGSTTAXRATE":
			case "soGSTAMOUNT":
			case "soGSTTAXAMOUNT":
			case "soGSTLAMOUNT":
			case "soGSTTAXLAMOUNT":
			case "soDISGSTAMOUNT":
			case "soDISGSTTAXAMOUNT":
			case "soSTGSTAMOUNT":
			case "soSTGSTTAXAMOUNT":
			case "soWTAXAMOUNT":
			case "soWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_so_reg_detail(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "soSALESORDERCODE":
			case "soDEBTORACCOUNT":
			case "soDEBTORNAME":
			case "soATTENTION":
			case "soPHONE":
			case "soFAX":
			case "soADDRESS1":
			case "soADDRESS2":
			case "soADDRESS3":
			case "soADDRESS4":
			case "soSALESORDERREFNO":
			case "soTERMCODE":
			case "soSALESPERSONCODE":
			case "soDELIVERYTERM":
			case "soTITLE":
			case "soREF1":
			case "soREF2":
			case "soREF3":
			case "soREF4":
			case "soREF5":
			case "soREMARK1":
			case "soREMARK2":
			case "soREMARK3":
			case "soREMARK4":
			case "soREMARK5":
			case "soSALESTAXEXEMPTIONNO":
			case "soDOBRANCHNAME":
			case "soDOCONTACT":
			case "soDOPHONE":
			case "soDOFAX":
			case "soDOADDRESS1":
			case "soDOADDRESS2":
			case "soDOADDRESS3":
			case "soDOADDRESS4":
			case "soPROJECTCODE":
			case "soJOBNAME":
			case "soNOTES":
			case "soFCURRENCYCODE":
			case "soCANCELLED":
			case "soFROMTYPE":
			case "soFROMCODE":
			case "soDISCOUNTSTR":
			case "soSALESTAXSTR":
			case "soPRINTCOUNT":
			case "soGSTTYPE":
			case "soCLOSED":
			case "soPASTENTRY":
			case "soATTACHMENTS":
			case "soSALESTYPECODE":
			case "soPRICETAG":
			case "soDOLONGBRANCHNAME":
			case "soFIRSTCREATEDUSERCODE":
			case "soLASTMODIFIEDUSERCODE":
			case "soMODIFYCOUNT":
			case "soLASTPRINTEDUSERCODE":
			case "soTAXINCLUSIVE":
			case "soDISCOUNTGSTTYPE":
			case "soSERVICEGSTTYPE":
			case "soSUPERVISOR":
			case "soGSTTAXCODE":
			case "soDISGSTTAXCODE":
			case "soSTGSTTAXCODE":
			case "srSALESORDERCODE":
			case "srPOS":
			case "srNUMBERING":
			case "srSTOCKCODE":
			case "srDESCRIPTION":
			case "srPROJECTCODE":
			case "srJOBNAME":
			case "srUOM":
			case "srDISCOUNT":
			case "srLOCATIONCODE":
			case "srCUSTOMERITEMCODE":
			case "srREFERENCE1":
			case "srREFERENCE2":
			case "srFROMTYPE":
			case "srFROMCODE":
			case "srFROMPOS":
			case "srPUOM":
			case "srBUNDLED":
			case "srFROMQUOTATIONCODE":
			case "srFROMQUOTATIONREFNO":
			case "srSERIALNO":
			case "srSERIALNOBYLINE":
			case "srSALESTYPECODE":
			case "srTAGCODE":
			case "srSUBITEMS":
			case "srTRANSFERTO":
			case "srSTOCKBUNDLEDPOS":
			case "srGSTTYPE":
			case "srREFERENCE3":
			case "srREFERENCE4":
			case "srREFERENCE5":
			case "srREFERENCE6":
			case "srREFERENCE7":
			case "srREFERENCE8":
			case "srREFERENCE9":
			case "srREFERENCE10":
			case "srWTAXTYPECODE":
			case "srGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "soSALESORDERDATE":
			case "soREQUIREDATE":
			case "soSALESTAXEXPIRYDATE":
			case "soFIRSTCREATEDDATE":
			case "soLASTMODIFIEDDATE":
			case "soLASTPRINTEDDATE":
			case "srFROMQUOTATIONDATE":
			case "srREQUIREDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "soFRATE":
			case "soTOTALAMOUNT":
			case "soDISCOUNT":
			case "soSALESTAX":
			case "soLOCALTOTALAMOUNT":
			case "soGSTTAXRATE":
			case "soGSTAMOUNT":
			case "soGSTTAXAMOUNT":
			case "soGSTLAMOUNT":
			case "soGSTTAXLAMOUNT":
			case "soDISGSTAMOUNT":
			case "soDISGSTTAXAMOUNT":
			case "soSTGSTAMOUNT":
			case "soSTGSTTAXAMOUNT":
			case "soWTAXAMOUNT":
			case "soWTAXLAMOUNT":
			case "srQTY":
			case "srUNITPRICE":
			case "srSALESTAX":
			case "srAMOUNT":
			case "srQTY1":
			case "srUOM1PRICE":
			case "srQTY2":
			case "srUOM2PRICE":
			case "srQTY3":
			case "srUOM3PRICE":
			case "srCANCELLEDQTY":
			case "srPACKING":
			case "srPQTY":
			case "srSERVICECOST":
			case "srBACKORDER":
			case "srGSTAMOUNT":
			case "srGSTTAXAMOUNT":
			case "srTAXABLEDSALES":
			case "srWAMOUNT":
			case "srWTAXAMOUNT":
			case "srONECENTSDIFF":
			case "srADJAMOUNT":
			case "srADJTAXAMOUNT":
			case "srADJTOTALAMOUNT":
			case "srADJUNITPRICE":
			case "srADJTAXUNITPRICE":
			case "srADJTOTALUNITPRICE":
			case "srLOCALONECENTSDIFF":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_do_reg(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "doDELIVERYORDERCODE":
			case "doDEBTORACCOUNT":
			case "doDEBTORNAME":
			case "doATTENTION":
			case "doPHONE":
			case "doFAX":
			case "doADDRESS1":
			case "doADDRESS2":
			case "doADDRESS3":
			case "doADDRESS4":
			case "doDELIVERYORDERREFNO":
			case "doTERMCODE":
			case "doSALESPERSONCODE":
			case "doDELIVERYTERM":
			case "doTITLE":
			case "doREF1":
			case "doREF2":
			case "doREF3":
			case "doREF4":
			case "doREF5":
			case "doREMARK1":
			case "doREMARK2":
			case "doREMARK3":
			case "doREMARK4":
			case "doREMARK5":
			case "doSALESTAXEXEMPTIONNO":
			case "doDOBRANCHNAME":
			case "doDOCONTACT":
			case "doDOPHONE":
			case "doDOFAX":
			case "doDOADDRESS1":
			case "doDOADDRESS2":
			case "doDOADDRESS3":
			case "doDOADDRESS4":
			case "doPROJECTCODE":
			case "doJOBNAME":
			case "doNOTES":
			case "doFCURRENCYCODE":
			case "doCANCELLED":
			case "doFROMTYPE":
			case "doFROMCODE":
			case "doDISCOUNTSTR":
			case "doSALESTAXSTR":
			case "doPRINTCOUNT":
			case "doGSTTYPE":
			case "doCLOSED":
			case "doPASTENTRY":
			case "doATTACHMENTS":
			case "doSALESTYPECODE":
			case "doPRICETAG":
			case "doDELIVERED":
			case "doDOLONGBRANCHNAME":
			case "doFIRSTCREATEDUSERCODE":
			case "doLASTMODIFIEDUSERCODE":
			case "doMODIFYCOUNT":
			case "doLASTPRINTEDUSERCODE":
			case "doTAXINCLUSIVE":
			case "doDISCOUNTGSTTYPE":
			case "doSERVICEGSTTYPE":
			case "doSUPERVISOR":
			case "doGSTTAXCODE":
			case "doDISGSTTAXCODE":
			case "doSTGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "doDELIVERYORDERDATE":
			case "doSALESTAXEXPIRYDATE":
			case "doFIRSTCREATEDDATE":
			case "doLASTMODIFIEDDATE":
			case "doLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "doFRATE":
			case "doTOTALAMOUNT":
			case "doDISCOUNT":
			case "doSALESTAX":
			case "doLOCALTOTALAMOUNT":
			case "doGSTTAXRATE":
			case "doGSTAMOUNT":
			case "doGSTTAXAMOUNT":
			case "doGSTLAMOUNT":
			case "doGSTTAXLAMOUNT":
			case "doDISGSTAMOUNT":
			case "doDISGSTTAXAMOUNT":
			case "doSTGSTAMOUNT":
			case "doSTGSTTAXAMOUNT":
			case "doWTAXAMOUNT":
			case "doWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_do_reg_detail(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "doDELIVERYORDERCODE":
			case "doDEBTORACCOUNT":
			case "doDEBTORNAME":
			case "doATTENTION":
			case "doPHONE":
			case "doFAX":
			case "doADDRESS1":
			case "doADDRESS2":
			case "doADDRESS3":
			case "doADDRESS4":
			case "doDELIVERYORDERREFNO":
			case "doTERMCODE":
			case "doSALESPERSONCODE":
			case "doDELIVERYTERM":
			case "doTITLE":
			case "doREF1":
			case "doREF2":
			case "doREF3":
			case "doREF4":
			case "doREF5":
			case "doREMARK1":
			case "doREMARK2":
			case "doREMARK3":
			case "doREMARK4":
			case "doREMARK5":
			case "doSALESTAXEXEMPTIONNO":
			case "doDOBRANCHNAME":
			case "doDOCONTACT":
			case "doDOPHONE":
			case "doDOFAX":
			case "doDOADDRESS1":
			case "doDOADDRESS2":
			case "doDOADDRESS3":
			case "doDOADDRESS4":
			case "doPROJECTCODE":
			case "doJOBNAME":
			case "doNOTES":
			case "doFCURRENCYCODE":
			case "doCANCELLED":
			case "doFROMTYPE":
			case "doFROMCODE":
			case "doDISCOUNTSTR":
			case "doSALESTAXSTR":
			case "doPRINTCOUNT":
			case "doGSTTYPE":
			case "doCLOSED":
			case "doPASTENTRY":
			case "doATTACHMENTS":
			case "doSALESTYPECODE":
			case "doPRICETAG":
			case "doDELIVERED":
			case "doDOLONGBRANCHNAME":
			case "doFIRSTCREATEDUSERCODE":
			case "doLASTMODIFIEDUSERCODE":
			case "doMODIFYCOUNT":
			case "doLASTPRINTEDUSERCODE":
			case "doTAXINCLUSIVE":
			case "doDISCOUNTGSTTYPE":
			case "doSERVICEGSTTYPE":
			case "doSUPERVISOR":
			case "doGSTTAXCODE":
			case "doDISGSTTAXCODE":
			case "doSTGSTTAXCODE":
			case "dvDELIVERYORDERCODE":
			case "dvPOS":
			case "dvNUMBERING":
			case "dvSTOCKCODE":
			case "dvDESCRIPTION":
			case "dvPROJECTCODE":
			case "dvJOBNAME":
			case "dvUOM":
			case "dvDISCOUNT":
			case "dvLOCATIONCODE":
			case "dvCUSTOMERITEMCODE":
			case "dvREFERENCE1":
			case "dvREFERENCE2":
			case "dvFROMTYPE":
			case "dvFROMCODE":
			case "dvFROMPOS":
			case "dvSTOCKTRANSACTIONID":
			case "dvPUOM":
			case "dvBUNDLED":
			case "dvBATCHNO":
			case "dvBATCHNOFROMTYPE":
			case "dvBATCHNOFROMCODE":
			case "dvBATCHNOFROMPOS":
			case "dvFROMQUOTATIONCODE":
			case "dvFROMQUOTATIONREFNO":
			case "dvFROMSALESORDERCODE":
			case "dvFROMSALESORDERREFNO":
			case "dvSERIALNO":
			case "dvSERIALNOBYLINE":
			case "dvSALESTYPECODE":
			case "dvTAGCODE":
			case "dvSUBITEMS":
			case "dvSTOCKBUNDLEDPOS":
			case "dvGSTTYPE":
			case "dvREFERENCE3":
			case "dvREFERENCE4":
			case "dvREFERENCE5":
			case "dvREFERENCE6":
			case "dvREFERENCE7":
			case "dvREFERENCE8":
			case "dvREFERENCE9":
			case "dvREFERENCE10":
			case "dvWTAXTYPECODE":
			case "dvGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "doDELIVERYORDERDATE":
			case "doSALESTAXEXPIRYDATE":
			case "doFIRSTCREATEDDATE":
			case "doLASTMODIFIEDDATE":
			case "doLASTPRINTEDDATE":
			case "dvBATCHNOEXPIRYDATE":
			case "dvFROMQUOTATIONDATE":
			case "dvFROMSALESORDERDATE":
			case "dvBNMANUFACTURINGDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "doFRATE":
			case "doTOTALAMOUNT":
			case "doDISCOUNT":
			case "doSALESTAX":
			case "doLOCALTOTALAMOUNT":
			case "doGSTTAXRATE":
			case "doGSTAMOUNT":
			case "doGSTTAXAMOUNT":
			case "doGSTLAMOUNT":
			case "doGSTTAXLAMOUNT":
			case "doDISGSTAMOUNT":
			case "doDISGSTTAXAMOUNT":
			case "doSTGSTAMOUNT":
			case "doSTGSTTAXAMOUNT":
			case "doWTAXAMOUNT":
			case "doWTAXLAMOUNT":
			case "dvQTY":
			case "dvUNITPRICE":
			case "dvSALESTAX":
			case "dvAMOUNT":
			case "dvQTY1":
			case "dvUOM1PRICE":
			case "dvQTY2":
			case "dvUOM2PRICE":
			case "dvQTY3":
			case "dvUOM3PRICE":
			case "dvCANCELLEDQTY":
			case "dvPACKING":
			case "dvPQTY":
			case "dvSERVICECOST":
			case "dvBACKORDER":
			case "dvGSTAMOUNT":
			case "dvGSTTAXAMOUNT":
			case "dvTAXABLEDSALES":
			case "dvWAMOUNT":
			case "dvWTAXAMOUNT":
			case "dvONECENTSDIFF":
			case "dvADJAMOUNT":
			case "dvADJTAXAMOUNT":
			case "dvADJTOTALAMOUNT":
			case "dvADJUNITPRICE":
			case "dvADJTAXUNITPRICE":
			case "dvADJTOTALUNITPRICE":
			case "dvLOCALONECENTSDIFF":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_inv_reg(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "siSALESINVOICECODE":
			case "siDEBTORACCOUNT":
			case "siDEBTORNAME":
			case "siATTENTION":
			case "siPHONE":
			case "siFAX":
			case "siADDRESS1":
			case "siADDRESS2":
			case "siADDRESS3":
			case "siADDRESS4":
			case "siSALESINVOICEREFNO":
			case "siOURDONO":
			case "siTERMCODE":
			case "siSALESPERSONCODE":
			case "siDELIVERYTERM":
			case "siTITLE":
			case "siREF1":
			case "siREF2":
			case "siREF3":
			case "siREF4":
			case "siREF5":
			case "siREMARK1":
			case "siREMARK2":
			case "siREMARK3":
			case "siREMARK4":
			case "siREMARK5":
			case "siSALESTAXEXEMPTIONNO":
			case "siDOBRANCHNAME":
			case "siDOCONTACT":
			case "siDOPHONE":
			case "siDOFAX":
			case "siDOADDRESS1":
			case "siDOADDRESS2":
			case "siDOADDRESS3":
			case "siDOADDRESS4":
			case "siPROJECTCODE":
			case "siJOBNAME":
			case "siNOTES":
			case "siFCURRENCYCODE":
			case "siCANCELLED":
			case "siFROMTYPE":
			case "siFROMCODE":
			case "siDETAILPOSTING2GL":
			case "siGROUPACCOUNTPOSTING":
			case "siTITLE2":
			case "siDISCOUNTSTR":
			case "siSALESTAXSTR":
			case "siPRINTCOUNT":
			case "siGSTTYPE":
			case "siPASTENTRY":
			case "siATTACHMENTS":
			case "siSALESTYPECODE":
			case "siPRICETAG":
			case "siDOLONGBRANCHNAME":
			case "siFIRSTCREATEDUSERCODE":
			case "siLASTMODIFIEDUSERCODE":
			case "siMODIFYCOUNT":
			case "siLASTPRINTEDUSERCODE":
			case "siTAXINCLUSIVE":
			case "siDISCOUNTGSTTYPE":
			case "siSERVICEGSTTYPE":
			case "siMISCGSTTYPE":
			case "siSUPERVISOR":
			case "siGSTTAXCODE":
			case "siDISGSTTAXCODE":
			case "siSTGSTTAXCODE":
			case "siMISCGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "siSALESINVOICEDATE":
			case "siSALESTAXEXPIRYDATE":
			case "siFIRSTCREATEDDATE":
			case "siLASTMODIFIEDDATE":
			case "siLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "siFRATE":
			case "siDISCOUNT":
			case "siSALESTAX":
			case "siMISCCHARGES":
			case "siTOTALAMOUNT":
			case "siLESSDEPOSIT":
			case "siLOCALTOTALAMOUNT":
			case "siGSTTAXRATE":
			case "siGSTAMOUNT":
			case "siGSTTAXAMOUNT":
			case "siGSTLAMOUNT":
			case "siGSTTAXLAMOUNT":
			case "siBALANCE":
			case "siDISGSTAMOUNT":
			case "siDISGSTTAXAMOUNT":
			case "siSTGSTAMOUNT":
			case "siSTGSTTAXAMOUNT":
			case "siMISGSTAMOUNT":
			case "siMISGSTTAXAMOUNT":
			case "siWTAXAMOUNT":
			case "siWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_inv_reg_detail(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "siSALESINVOICECODE":
			case "siDEBTORACCOUNT":
			case "siDEBTORNAME":
			case "siATTENTION":
			case "siPHONE":
			case "siFAX":
			case "siADDRESS1":
			case "siADDRESS2":
			case "siADDRESS3":
			case "siADDRESS4":
			case "siSALESINVOICEREFNO":
			case "siOURDONO":
			case "siTERMCODE":
			case "siSALESPERSONCODE":
			case "siDELIVERYTERM":
			case "siTITLE":
			case "siREF1":
			case "siREF2":
			case "siREF3":
			case "siREF4":
			case "siREF5":
			case "siREMARK1":
			case "siREMARK2":
			case "siREMARK3":
			case "siREMARK4":
			case "siREMARK5":
			case "siSALESTAXEXEMPTIONNO":
			case "siDOBRANCHNAME":
			case "siDOCONTACT":
			case "siDOPHONE":
			case "siDOFAX":
			case "siDOADDRESS1":
			case "siDOADDRESS2":
			case "siDOADDRESS3":
			case "siDOADDRESS4":
			case "siPROJECTCODE":
			case "siJOBNAME":
			case "siNOTES":
			case "siFCURRENCYCODE":
			case "siCANCELLED":
			case "siFROMTYPE":
			case "siFROMCODE":
			case "siDETAILPOSTING2GL":
			case "siGROUPACCOUNTPOSTING":
			case "siTITLE2":
			case "siDISCOUNTSTR":
			case "siSALESTAXSTR":
			case "siPRINTCOUNT":
			case "siGSTTYPE":
			case "siPASTENTRY":
			case "siATTACHMENTS":
			case "siSALESTYPECODE":
			case "siPRICETAG":
			case "siDOLONGBRANCHNAME":
			case "siFIRSTCREATEDUSERCODE":
			case "siLASTMODIFIEDUSERCODE":
			case "siMODIFYCOUNT":
			case "siLASTPRINTEDUSERCODE":
			case "siTAXINCLUSIVE":
			case "siDISCOUNTGSTTYPE":
			case "siSERVICEGSTTYPE":
			case "siMISCGSTTYPE":
			case "siSUPERVISOR":
			case "siGSTTAXCODE":
			case "siDISGSTTAXCODE":
			case "siSTGSTTAXCODE":
			case "siMISCGSTTAXCODE":
			case "svSALESINVOICECODE":
			case "svPOS":
			case "svNUMBERING":
			case "svSTOCKCODE":
			case "svDESCRIPTION":
			case "svPROJECTCODE":
			case "svJOBNAME":
			case "svUOM":
			case "svDISCOUNT":
			case "svLOCATIONCODE":
			case "svCUSTOMERITEMCODE":
			case "svREFERENCE1":
			case "svREFERENCE2":
			case "svFROMTYPE":
			case "svFROMCODE":
			case "svFROMPOS":
			case "svSTOCKTRANSACTIONID":
			case "svGLACCOUNTCODE":
			case "svPUOM":
			case "svBUNDLED":
			case "svBATCHNO":
			case "svBATCHNOFROMTYPE":
			case "svBATCHNOFROMCODE":
			case "svBATCHNOFROMPOS":
			case "svFROMQUOTATIONCODE":
			case "svFROMQUOTATIONREFNO":
			case "svFROMSALESORDERCODE":
			case "svFROMSALESORDERREFNO":
			case "svFROMDELIVERYORDERCODE":
			case "svFROMDELIVERYORDERREFNO":
			case "svSERIALNO":
			case "svSERIALNOBYLINE":
			case "svSALESTYPECODE":
			case "svTAGCODE":
			case "svSUBITEMS":
			case "svSTOCKBUNDLEDPOS":
			case "svGSTTYPE":
			case "svREFERENCE3":
			case "svREFERENCE4":
			case "svREFERENCE5":
			case "svREFERENCE6":
			case "svREFERENCE7":
			case "svREFERENCE8":
			case "svREFERENCE9":
			case "svREFERENCE10":
			case "svWTAXTYPECODE":
			case "svGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "siSALESINVOICEDATE":
			case "siSALESTAXEXPIRYDATE":
			case "siFIRSTCREATEDDATE":
			case "siLASTMODIFIEDDATE":
			case "siLASTPRINTEDDATE":
			case "svBATCHNOEXPIRYDATE":
			case "svFROMQUOTATIONDATE":
			case "svFROMSALESORDERDATE":
			case "svFROMDELIVERYORDERDATE":
			case "svBNMANUFACTURINGDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "siFRATE":
			case "siDISCOUNT":
			case "siSALESTAX":
			case "siMISCCHARGES":
			case "siTOTALAMOUNT":
			case "siLESSDEPOSIT":
			case "siLOCALTOTALAMOUNT":
			case "siGSTTAXRATE":
			case "siGSTAMOUNT":
			case "siGSTTAXAMOUNT":
			case "siGSTLAMOUNT":
			case "siGSTTAXLAMOUNT":
			case "siBALANCE":
			case "siDISGSTAMOUNT":
			case "siDISGSTTAXAMOUNT":
			case "siSTGSTAMOUNT":
			case "siSTGSTTAXAMOUNT":
			case "siMISGSTAMOUNT":
			case "siMISGSTTAXAMOUNT":
			case "siWTAXAMOUNT":
			case "siWTAXLAMOUNT":
			case "svQTY":
			case "svUNITPRICE":
			case "svSALESTAX":
			case "svAMOUNT":
			case "svQTY1":
			case "svUOM1PRICE":
			case "svQTY2":
			case "svUOM2PRICE":
			case "svQTY3":
			case "svUOM3PRICE":
			case "svPACKING":
			case "svPQTY":
			case "svHIDDENDISCOUNT":
			case "svSERVICECOST":
			case "svBACKORDER":
			case "svGSTAMOUNT":
			case "svGSTTAXAMOUNT":
			case "svTAXABLEDSALES":
			case "svWAMOUNT":
			case "svWTAXAMOUNT":
			case "svONECENTSDIFF":
			case "svADJAMOUNT":
			case "svADJTAXAMOUNT":
			case "svADJTOTALAMOUNT":
			case "svADJUNITPRICE":
			case "svADJTAXUNITPRICE":
			case "svADJTOTALUNITPRICE":
			case "svLOCALONECENTSDIFF":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_dn_reg(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "snSALESDNCODE":
			case "snDEBTORACCOUNT":
			case "snDEBTORNAME":
			case "snATTENTION":
			case "snPHONE":
			case "snFAX":
			case "snADDRESS1":
			case "snADDRESS2":
			case "snADDRESS3":
			case "snADDRESS4":
			case "snSALESDNREFNO":
			case "snTERMCODE":
			case "snSALESPERSONCODE":
			case "snDELIVERYTERM":
			case "snTITLE":
			case "snREF1":
			case "snREF2":
			case "snREF3":
			case "snREF4":
			case "snREF5":
			case "snREMARK1":
			case "snREMARK2":
			case "snREMARK3":
			case "snREMARK4":
			case "snREMARK5":
			case "snSALESTAXEXEMPTIONNO":
			case "snDOBRANCHNAME":
			case "snDOCONTACT":
			case "snDOPHONE":
			case "snDOFAX":
			case "snDOADDRESS1":
			case "snDOADDRESS2":
			case "snDOADDRESS3":
			case "snDOADDRESS4":
			case "snPROJECTCODE":
			case "snJOBNAME":
			case "snNOTES":
			case "snFCURRENCYCODE":
			case "snCANCELLED":
			case "snDETAILPOSTING2GL":
			case "snGROUPACCOUNTPOSTING":
			case "snTITLE2":
			case "snDISCOUNTSTR":
			case "snSALESTAXSTR":
			case "snPRINTCOUNT":
			case "snGSTTYPE":
			case "snPASTENTRY":
			case "snATTACHMENTS":
			case "snSALESTYPECODE":
			case "snPRICETAG":
			case "snDOLONGBRANCHNAME":
			case "snFIRSTCREATEDUSERCODE":
			case "snLASTMODIFIEDUSERCODE":
			case "snMODIFYCOUNT":
			case "snLASTPRINTEDUSERCODE":
			case "snTAXINCLUSIVE":
			case "snDISCOUNTGSTTYPE":
			case "snSERVICEGSTTYPE":
			case "snSUPERVISOR":
			case "snGSTTAXCODE":
			case "snDISGSTTAXCODE":
			case "snSTGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "snSALESDNDATE":
			case "snSALESTAXEXPIRYDATE":
			case "snFIRSTCREATEDDATE":
			case "snLASTMODIFIEDDATE":
			case "snLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "snFRATE":
			case "snTOTALAMOUNT":
			case "snDISCOUNT":
			case "snSALESTAX":
			case "snLOCALTOTALAMOUNT":
			case "snGSTTAXRATE":
			case "snGSTAMOUNT":
			case "snGSTTAXAMOUNT":
			case "snGSTLAMOUNT":
			case "snGSTTAXLAMOUNT":
			case "snDISGSTAMOUNT":
			case "snDISGSTTAXAMOUNT":
			case "snSTGSTAMOUNT":
			case "snSTGSTTAXAMOUNT":
			case "snWTAXAMOUNT":
			case "snWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_dn_reg_detail(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "snSALESDNCODE":
			case "snDEBTORACCOUNT":
			case "snDEBTORNAME":
			case "snATTENTION":
			case "snPHONE":
			case "snFAX":
			case "snADDRESS1":
			case "snADDRESS2":
			case "snADDRESS3":
			case "snADDRESS4":
			case "snSALESDNREFNO":
			case "snTERMCODE":
			case "snSALESPERSONCODE":
			case "snDELIVERYTERM":
			case "snTITLE":
			case "snREF1":
			case "snREF2":
			case "snREF3":
			case "snREF4":
			case "snREF5":
			case "snREMARK1":
			case "snREMARK2":
			case "snREMARK3":
			case "snREMARK4":
			case "snREMARK5":
			case "snSALESTAXEXEMPTIONNO":
			case "snDOBRANCHNAME":
			case "snDOCONTACT":
			case "snDOPHONE":
			case "snDOFAX":
			case "snDOADDRESS1":
			case "snDOADDRESS2":
			case "snDOADDRESS3":
			case "snDOADDRESS4":
			case "snPROJECTCODE":
			case "snJOBNAME":
			case "snNOTES":
			case "snFCURRENCYCODE":
			case "snCANCELLED":
			case "snDETAILPOSTING2GL":
			case "snGROUPACCOUNTPOSTING":
			case "snTITLE2":
			case "snDISCOUNTSTR":
			case "snSALESTAXSTR":
			case "snPRINTCOUNT":
			case "snGSTTYPE":
			case "snPASTENTRY":
			case "snATTACHMENTS":
			case "snSALESTYPECODE":
			case "snPRICETAG":
			case "snDOLONGBRANCHNAME":
			case "snFIRSTCREATEDUSERCODE":
			case "snLASTMODIFIEDUSERCODE":
			case "snMODIFYCOUNT":
			case "snLASTPRINTEDUSERCODE":
			case "snTAXINCLUSIVE":
			case "snDISCOUNTGSTTYPE":
			case "snSERVICEGSTTYPE":
			case "snSUPERVISOR":
			case "snGSTTAXCODE":
			case "snDISGSTTAXCODE":
			case "snSTGSTTAXCODE":
			case "stSALESDNCODE":
			case "stPOS":
			case "stNUMBERING":
			case "stSTOCKCODE":
			case "stDESCRIPTION":
			case "stPROJECTCODE":
			case "stJOBNAME":
			case "stUOM":
			case "stDISCOUNT":
			case "stLOCATIONCODE":
			case "stCUSTOMERITEMCODE":
			case "stREFERENCE1":
			case "stREFERENCE2":
			case "stSTOCKTRANSACTIONID":
			case "stGLACCOUNTCODE":
			case "stPUOM":
			case "stBUNDLED":
			case "stBATCHNO":
			case "stBATCHNOFROMTYPE":
			case "stBATCHNOFROMCODE":
			case "stBATCHNOFROMPOS":
			case "stSERIALNO":
			case "stSERIALNOBYLINE":
			case "stSALESTYPECODE":
			case "stTAGCODE":
			case "stSUBITEMS":
			case "stSTOCKBUNDLEDPOS":
			case "stGSTTYPE":
			case "stREFERENCE3":
			case "stREFERENCE4":
			case "stREFERENCE5":
			case "stREFERENCE6":
			case "stREFERENCE7":
			case "stREFERENCE8":
			case "stREFERENCE9":
			case "stREFERENCE10":
			case "stWTAXTYPECODE":
			case "stGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "snSALESDNDATE":
			case "snSALESTAXEXPIRYDATE":
			case "snFIRSTCREATEDDATE":
			case "snLASTMODIFIEDDATE":
			case "snLASTPRINTEDDATE":
			case "stBATCHNOEXPIRYDATE":
			case "stBNMANUFACTURINGDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "snFRATE":
			case "snTOTALAMOUNT":
			case "snDISCOUNT":
			case "snSALESTAX":
			case "snLOCALTOTALAMOUNT":
			case "snGSTTAXRATE":
			case "snGSTAMOUNT":
			case "snGSTTAXAMOUNT":
			case "snGSTLAMOUNT":
			case "snGSTTAXLAMOUNT":
			case "snDISGSTAMOUNT":
			case "snDISGSTTAXAMOUNT":
			case "snSTGSTAMOUNT":
			case "snSTGSTTAXAMOUNT":
			case "snWTAXAMOUNT":
			case "snWTAXLAMOUNT":
			case "stQTY":
			case "stUNITPRICE":
			case "stSALESTAX":
			case "stAMOUNT":
			case "stQTY1":
			case "stUOM1PRICE":
			case "stQTY2":
			case "stUOM2PRICE":
			case "stQTY3":
			case "stUOM3PRICE":
			case "stPACKING":
			case "stPQTY":
			case "stHIDDENDISCOUNT":
			case "stSERVICECOST":
			case "stGSTAMOUNT":
			case "stGSTTAXAMOUNT":
			case "stTAXABLEDSALES":
			case "stWAMOUNT":
			case "stWTAXAMOUNT":
			case "stONECENTSDIFF":
			case "stADJAMOUNT":
			case "stADJTAXAMOUNT":
			case "stADJTOTALAMOUNT":
			case "stADJUNITPRICE":
			case "stADJTAXUNITPRICE":
			case "stADJTOTALUNITPRICE":
			case "stLOCALONECENTSDIFF":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_cn_reg(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "ssSALESCNCODE":
			case "ssDEBTORACCOUNT":
			case "ssDEBTORNAME":
			case "ssATTENTION":
			case "ssPHONE":
			case "ssFAX":
			case "ssADDRESS1":
			case "ssADDRESS2":
			case "ssADDRESS3":
			case "ssADDRESS4":
			case "ssSALESCNREFNO":
			case "ssTITLE":
			case "ssREF1":
			case "ssREF2":
			case "ssREF3":
			case "ssREF4":
			case "ssREF5":
			case "ssREMARK1":
			case "ssREMARK2":
			case "ssREMARK3":
			case "ssREMARK4":
			case "ssREMARK5":
			case "ssSALESTAXEXEMPTIONNO":
			case "ssDOBRANCHNAME":
			case "ssDOCONTACT":
			case "ssDOPHONE":
			case "ssDOFAX":
			case "ssDOADDRESS1":
			case "ssDOADDRESS2":
			case "ssDOADDRESS3":
			case "ssDOADDRESS4":
			case "ssPROJECTCODE":
			case "ssJOBNAME":
			case "ssNOTES":
			case "ssFCURRENCYCODE":
			case "ssCANCELLED":
			case "ssDETAILPOSTING2GL":
			case "ssGROUPACCOUNTPOSTING":
			case "ssTITLE2":
			case "ssDISCOUNTSTR":
			case "ssSALESTAXSTR":
			case "ssPRINTCOUNT":
			case "ssGSTTYPE":
			case "ssSALESPERSONCODE":
			case "ssPASTENTRY":
			case "ssATTACHMENTS":
			case "ssSALESTYPECODE":
			case "ssPRICETAG":
			case "ssDOLONGBRANCHNAME":
			case "ssFIRSTCREATEDUSERCODE":
			case "ssLASTMODIFIEDUSERCODE":
			case "ssMODIFYCOUNT":
			case "ssLASTPRINTEDUSERCODE":
			case "ssTAXINCLUSIVE":
			case "ssDISCOUNTGSTTYPE":
			case "ssSERVICEGSTTYPE":
			case "ssGSTTAXCODE":
			case "ssDISGSTTAXCODE":
			case "ssSTGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "ssSALESCNDATE":
			case "ssSALESTAXEXPIRYDATE":
			case "ssFIRSTCREATEDDATE":
			case "ssLASTMODIFIEDDATE":
			case "ssLASTPRINTEDDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "ssFRATE":
			case "ssTOTALAMOUNT":
			case "ssDISCOUNT":
			case "ssSALESTAX":
			case "ssLOCALTOTALAMOUNT":
			case "ssGSTTAXRATE":
			case "ssGSTAMOUNT":
			case "ssGSTTAXAMOUNT":
			case "ssGSTLAMOUNT":
			case "ssGSTTAXLAMOUNT":
			case "ssDISGSTAMOUNT":
			case "ssDISGSTTAXAMOUNT":
			case "ssSTGSTAMOUNT":
			case "ssSTGSTTAXAMOUNT":
			case "ssWTAXAMOUNT":
			case "ssWTAXLAMOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_cn_reg_detail(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "ssSALESCNCODE":
			case "ssDEBTORACCOUNT":
			case "ssDEBTORNAME":
			case "ssATTENTION":
			case "ssPHONE":
			case "ssFAX":
			case "ssADDRESS1":
			case "ssADDRESS2":
			case "ssADDRESS3":
			case "ssADDRESS4":
			case "ssSALESCNREFNO":
			case "ssTITLE":
			case "ssREF1":
			case "ssREF2":
			case "ssREF3":
			case "ssREF4":
			case "ssREF5":
			case "ssREMARK1":
			case "ssREMARK2":
			case "ssREMARK3":
			case "ssREMARK4":
			case "ssREMARK5":
			case "ssSALESTAXEXEMPTIONNO":
			case "ssDOBRANCHNAME":
			case "ssDOCONTACT":
			case "ssDOPHONE":
			case "ssDOFAX":
			case "ssDOADDRESS1":
			case "ssDOADDRESS2":
			case "ssDOADDRESS3":
			case "ssDOADDRESS4":
			case "ssPROJECTCODE":
			case "ssJOBNAME":
			case "ssNOTES":
			case "ssFCURRENCYCODE":
			case "ssCANCELLED":
			case "ssDETAILPOSTING2GL":
			case "ssGROUPACCOUNTPOSTING":
			case "ssTITLE2":
			case "ssDISCOUNTSTR":
			case "ssSALESTAXSTR":
			case "ssPRINTCOUNT":
			case "ssGSTTYPE":
			case "ssSALESPERSONCODE":
			case "ssPASTENTRY":
			case "ssATTACHMENTS":
			case "ssSALESTYPECODE":
			case "ssPRICETAG":
			case "ssDOLONGBRANCHNAME":
			case "ssFIRSTCREATEDUSERCODE":
			case "ssLASTMODIFIEDUSERCODE":
			case "ssMODIFYCOUNT":
			case "ssLASTPRINTEDUSERCODE":
			case "ssTAXINCLUSIVE":
			case "ssDISCOUNTGSTTYPE":
			case "ssSERVICEGSTTYPE":
			case "ssGSTTAXCODE":
			case "ssDISGSTTAXCODE":
			case "ssSTGSTTAXCODE":
			case "sdSALESCNCODE":
			case "sdPOS":
			case "sdNUMBERING":
			case "sdSTOCKCODE":
			case "sdDESCRIPTION":
			case "sdPROJECTCODE":
			case "sdJOBNAME":
			case "sdUOM":
			case "sdDISCOUNT":
			case "sdLOCATIONCODE":
			case "sdCUSTOMERITEMCODE":
			case "sdREFERENCE1":
			case "sdREFERENCE2":
			case "sdSTOCKTRANSACTIONID":
			case "sdGLACCOUNTCODE":
			case "sdPUOM":
			case "sdBUNDLED":
			case "sdBATCHNO":
			case "sdSERIALNO":
			case "sdSERIALNOBYLINE":
			case "sdMATCHEDSALESINVOICE":
			case "sdSALESTYPECODE":
			case "sdTAGCODE":
			case "sdSUBITEMS":
			case "sdSTOCKBUNDLEDPOS":
			case "sdGSTTYPE":
			case "sdREFERENCE3":
			case "sdREFERENCE4":
			case "sdREFERENCE5":
			case "sdREFERENCE6":
			case "sdREFERENCE7":
			case "sdREFERENCE8":
			case "sdREFERENCE9":
			case "sdREFERENCE10":
			case "sdWTAXTYPECODE":
			case "sdGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "ssSALESCNDATE":
			case "ssSALESTAXEXPIRYDATE":
			case "ssFIRSTCREATEDDATE":
			case "ssLASTMODIFIEDDATE":
			case "ssLASTPRINTEDDATE":
			case "sdBATCHNOEXPIRYDATE":
			case "sdBNMANUFACTURINGDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "ssFRATE":
			case "ssTOTALAMOUNT":
			case "ssDISCOUNT":
			case "ssSALESTAX":
			case "ssLOCALTOTALAMOUNT":
			case "ssGSTTAXRATE":
			case "ssGSTAMOUNT":
			case "ssGSTTAXAMOUNT":
			case "ssGSTLAMOUNT":
			case "ssGSTTAXLAMOUNT":
			case "ssDISGSTAMOUNT":
			case "ssDISGSTTAXAMOUNT":
			case "ssSTGSTAMOUNT":
			case "ssSTGSTTAXAMOUNT":
			case "ssWTAXAMOUNT":
			case "ssWTAXLAMOUNT":
			case "sdQTY":
			case "sdUNITPRICE":
			case "sdSALESTAX":
			case "sdAMOUNT":
			case "sdQTY1":
			case "sdUOM1PRICE":
			case "sdQTY2":
			case "sdUOM2PRICE":
			case "sdQTY3":
			case "sdUOM3PRICE":
			case "sdUNITCOST":
			case "sdPACKING":
			case "sdPQTY":
			case "sdSERVICECOST":
			case "sdGSTAMOUNT":
			case "sdGSTTAXAMOUNT":
			case "sdTAXABLEDSALES":
			case "sdWAMOUNT":
			case "sdWTAXAMOUNT":
			case "sdONECENTSDIFF":
			case "sdADJAMOUNT":
			case "sdADJTAXAMOUNT":
			case "sdADJTOTALAMOUNT":
			case "sdADJUNITPRICE":
			case "sdADJTAXUNITPRICE":
			case "sdADJTOTALUNITPRICE":
			case "sdLOCALONECENTSDIFF":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'><del>" + (colValue == null ? "" : colValue.format(2, 3)) + "</del></td>";
			break;
			default:
			break;
		}
		return returnCol;
	}
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_cs_reg(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "csCASHSALESCODE":
			case "csDEBTORACCOUNT":
			case "csDEBTORNAME":
			case "csATTENTION":
			case "csPHONE":
			case "csFAX":
			case "csADDRESS1":
			case "csADDRESS2":
			case "csADDRESS3":
			case "csADDRESS4":
			case "csCASHSALESREFNO":
			case "csSALESPERSONCODE":
			case "csTITLE":
			case "csREF1":
			case "csREF2":
			case "csREF3":
			case "csREF4":
			case "csREF5":
			case "csREMARK1":
			case "csREMARK2":
			case "csREMARK3":
			case "csREMARK4":
			case "csREMARK5":
			case "csSALESTAXEXEMPTIONNO":
			case "csDOBRANCHNAME":
			case "csDOCONTACT":
			case "csDOPHONE":
			case "csDOFAX":
			case "csDOADDRESS1":
			case "csDOADDRESS2":
			case "csDOADDRESS3":
			case "csDOADDRESS4":
			case "csPROJECTCODE":
			case "csJOBNAME":
			case "csNOTES":
			case "csFCURRENCYCODE":
			case "csCANCELLED":
			case "csFROMTYPE":
			case "csFROMCODE":
			case "csDETAILPOSTING2GL":
			case "csGROUPACCOUNTPOSTING":
			case "csTITLE2":
			case "csRECEIVEACCOUNT":
			case "csBANKCHARGESACCOUNT":
			case "csCHEQUENO":
			case "csDISCOUNTSTR":
			case "csSALESTAXSTR":
			case "csPRINTCOUNT":
			case "csGSTTYPE":
			case "csUSERCODE":
			case "csPASTENTRY":
			case "csATTACHMENTS":
			case "csMULTIPAYMENT":
			case "csPOSTTODEBTORACCOUNT":
			case "csSALESTYPECODE":
			case "csPRICETAG":
			case "csLOCATIONCODE":
			case "csCOUNTERCODE":
			case "csCASHIERCODE":
			case "csPROMOTERCODE":
			case "csDOLONGBRANCHNAME":
			case "csFIRSTCREATEDUSERCODE":
			case "csLASTMODIFIEDUSERCODE":
			case "csMODIFYCOUNT":
			case "csLASTPRINTEDUSERCODE":
			case "csTAXINCLUSIVE":
			case "csDISCOUNTGSTTYPE":
			case "csSERVICEGSTTYPE":
			case "csMISCGSTTYPE":
			case "csSUPERVISOR":
			case "csGSTTAXCODE":
			case "csDISGSTTAXCODE":
			case "csSTGSTTAXCODE":
			case "csMISCGSTTAXCODE":
			case "csISPOS":
			case "csFLAG":
			case "csDRAWERID":
			case "csCURRENCYCODE1":
			case "csCURRENCYCODE2":
			case "csCURRENCYCODE3":
			case "csCASHSALESCODE":
			case "csDEBTORACCOUNT":
			case "csDEBTORNAME":
			case "csATTENTION":
			case "csPHONE":
			case "csFAX":
			case "csADDRESS1":
			case "csADDRESS2":
			case "csADDRESS3":
			case "csADDRESS4":
			case "csCASHSALESREFNO":
			case "csSALESPERSONCODE":
			case "csTITLE":
			case "csREF1":
			case "csREF2":
			case "csREF3":
			case "csREF4":
			case "csREF5":
			case "csREMARK1":
			case "csREMARK2":
			case "csREMARK3":
			case "csREMARK4":
			case "csREMARK5":
			case "csSALESTAXEXEMPTIONNO":
			case "csDOBRANCHNAME":
			case "csDOCONTACT":
			case "csDOPHONE":
			case "csDOFAX":
			case "csDOADDRESS1":
			case "csDOADDRESS2":
			case "csDOADDRESS3":
			case "csDOADDRESS4":
			case "csPROJECTCODE":
			case "csJOBNAME":
			case "csNOTES":
			case "csFCURRENCYCODE":
			case "csCANCELLED":
			case "csFROMTYPE":
			case "csFROMCODE":
			case "csDETAILPOSTING2GL":
			case "csGROUPACCOUNTPOSTING":
			case "csTITLE2":
			case "csRECEIVEACCOUNT":
			case "csBANKCHARGESACCOUNT":
			case "csCHEQUENO":
			case "csDISCOUNTSTR":
			case "csSALESTAXSTR":
			case "csPRINTCOUNT":
			case "csGSTTYPE":
			case "csUSERCODE":
			case "csPASTENTRY":
			case "csATTACHMENTS":
			case "csMULTIPAYMENT":
			case "csPOSTTODEBTORACCOUNT":
			case "csSALESTYPECODE":
			case "csPRICETAG":
			case "csLOCATIONCODE":
			case "csCOUNTERCODE":
			case "csCASHIERCODE":
			case "csPROMOTERCODE":
			case "csDOLONGBRANCHNAME":
			case "csFIRSTCREATEDUSERCODE":
			case "csLASTMODIFIEDUSERCODE":
			case "csMODIFYCOUNT":
			case "csLASTPRINTEDUSERCODE":
			case "csTAXINCLUSIVE":
			case "csDISCOUNTGSTTYPE":
			case "csSERVICEGSTTYPE":
			case "csMISCGSTTYPE":
			case "csSUPERVISOR":
			case "csGSTTAXCODE":
			case "csDISGSTTAXCODE":
			case "csSTGSTTAXCODE":
			case "csMISCGSTTAXCODE":
			case "csISPOS":
			case "csFLAG":
			case "csDRAWERID":
			case "csCURRENCYCODE1":
			case "csCURRENCYCODE2":
			case "csCURRENCYCODE3":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true' class='bg-warning'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "csCASHSALESDATE":
			case "csSALESTAXEXPIRYDATE":
			case "csCASHSALESDATETIME":
			case "csFIRSTCREATEDDATE":
			case "csLASTMODIFIEDDATE":
			case "csLASTPRINTEDDATE":
			case "csNIGHTAUDITDATE":	
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center bg-warning'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "csFRATE":
			case "csDISCOUNT":
			case "csSALESTAX":
			case "csMISCCHARGES":
			case "csTOTALAMOUNT":
			case "csLESSDEPOSIT":
			case "csBANKCHARGESAMOUNT":
			case "csLOCALTOTALAMOUNT":
			case "csGSTTAXRATE":
			case "csGSTAMOUNT":
			case "csGSTTAXAMOUNT":
			case "csGSTLAMOUNT":
			case "csGSTTAXLAMOUNT":
			case "csAMOUNTTENDERED":
			case "csCHANGED":
			case "csDISGSTAMOUNT":
			case "csDISGSTTAXAMOUNT":
			case "csSTGSTAMOUNT":
			case "csSTGSTTAXAMOUNT":
			case "csMISGSTAMOUNT":
			case "csMISGSTTAXAMOUNT":
			case "csWTAXAMOUNT":
			case "csWTAXLAMOUNT":
			case "csCURRENCYAMOUNT1":
			case "csCURRENCYRATE1":
			case "csCURRENCYAMOUNT2":
			case "csCURRENCYRATE2":
			case "csCURRENCYAMOUNT3":
			case "csCURRENCYRATE3":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right bg-warning'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
			break;
			default:
			break;
		}
		return returnCol;
	}
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_s_cs_reg_detail(data) 
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "csCASHSALESCODE":
			case "csDEBTORACCOUNT":
			case "csDEBTORNAME":
			case "csATTENTION":
			case "csPHONE":
			case "csFAX":
			case "csADDRESS1":
			case "csADDRESS2":
			case "csADDRESS3":
			case "csADDRESS4":
			case "csCASHSALESREFNO":
			case "csSALESPERSONCODE":
			case "csTITLE":
			case "csREF1":
			case "csREF2":
			case "csREF3":
			case "csREF4":
			case "csREF5":
			case "csREMARK1":
			case "csREMARK2":
			case "csREMARK3":
			case "csREMARK4":
			case "csREMARK5":
			case "csSALESTAXEXEMPTIONNO":
			case "csDOBRANCHNAME":
			case "csDOCONTACT":
			case "csDOPHONE":
			case "csDOFAX":
			case "csDOADDRESS1":
			case "csDOADDRESS2":
			case "csDOADDRESS3":
			case "csDOADDRESS4":
			case "csPROJECTCODE":
			case "csJOBNAME":
			case "csNOTES":
			case "csFCURRENCYCODE":
			case "csCANCELLED":
			case "csFROMTYPE":
			case "csFROMCODE":
			case "csDETAILPOSTING2GL":
			case "csGROUPACCOUNTPOSTING":
			case "csTITLE2":
			case "csRECEIVEACCOUNT":
			case "csBANKCHARGESACCOUNT":
			case "csCHEQUENO":
			case "csDISCOUNTSTR":
			case "csSALESTAXSTR":
			case "csPRINTCOUNT":
			case "csGSTTYPE":
			case "csUSERCODE":
			case "csPASTENTRY":
			case "csATTACHMENTS":
			case "csMULTIPAYMENT":
			case "csPOSTTODEBTORACCOUNT":
			case "csSALESTYPECODE":
			case "csPRICETAG":
			case "csLOCATIONCODE":
			case "csCOUNTERCODE":
			case "csCASHIERCODE":
			case "csPROMOTERCODE":
			case "csDOLONGBRANCHNAME":
			case "csFIRSTCREATEDUSERCODE":
			case "csLASTMODIFIEDUSERCODE":
			case "csMODIFYCOUNT":
			case "csLASTPRINTEDUSERCODE":
			case "csTAXINCLUSIVE":
			case "csDISCOUNTGSTTYPE":
			case "csSERVICEGSTTYPE":
			case "csMISCGSTTYPE":
			case "csSUPERVISOR":
			case "csGSTTAXCODE":
			case "csDISGSTTAXCODE":
			case "csSTGSTTAXCODE":
			case "csMISCGSTTAXCODE":
			case "csISPOS":
			case "csFLAG":
			case "csDRAWERID":
			case "csCURRENCYCODE1":
			case "csCURRENCYCODE2":
			case "csCURRENCYCODE3":
			case "csCASHSALESCODE":
			case "csDEBTORACCOUNT":
			case "csDEBTORNAME":
			case "csATTENTION":
			case "csPHONE":
			case "csFAX":
			case "csADDRESS1":
			case "csADDRESS2":
			case "csADDRESS3":
			case "csADDRESS4":
			case "csCASHSALESREFNO":
			case "csSALESPERSONCODE":
			case "csTITLE":
			case "csREF1":
			case "csREF2":
			case "csREF3":
			case "csREF4":
			case "csREF5":
			case "csREMARK1":
			case "csREMARK2":
			case "csREMARK3":
			case "csREMARK4":
			case "csREMARK5":
			case "csSALESTAXEXEMPTIONNO":
			case "csDOBRANCHNAME":
			case "csDOCONTACT":
			case "csDOPHONE":
			case "csDOFAX":
			case "csDOADDRESS1":
			case "csDOADDRESS2":
			case "csDOADDRESS3":
			case "csDOADDRESS4":
			case "csPROJECTCODE":
			case "csJOBNAME":
			case "csNOTES":
			case "csFCURRENCYCODE":
			case "csCANCELLED":
			case "csFROMTYPE":
			case "csFROMCODE":
			case "csDETAILPOSTING2GL":
			case "csGROUPACCOUNTPOSTING":
			case "csTITLE2":
			case "csRECEIVEACCOUNT":
			case "csBANKCHARGESACCOUNT":
			case "csCHEQUENO":
			case "csDISCOUNTSTR":
			case "csSALESTAXSTR":
			case "csPRINTCOUNT":
			case "csGSTTYPE":
			case "csUSERCODE":
			case "csPASTENTRY":
			case "csATTACHMENTS":
			case "csMULTIPAYMENT":
			case "csPOSTTODEBTORACCOUNT":
			case "csSALESTYPECODE":
			case "csPRICETAG":
			case "csLOCATIONCODE":
			case "csCOUNTERCODE":
			case "csCASHIERCODE":
			case "csPROMOTERCODE":
			case "csDOLONGBRANCHNAME":
			case "csFIRSTCREATEDUSERCODE":
			case "csLASTMODIFIEDUSERCODE":
			case "csMODIFYCOUNT":
			case "csLASTPRINTEDUSERCODE":
			case "csTAXINCLUSIVE":
			case "csDISCOUNTGSTTYPE":
			case "csSERVICEGSTTYPE":
			case "csMISCGSTTYPE":
			case "csSUPERVISOR":
			case "csGSTTAXCODE":
			case "csDISGSTTAXCODE":
			case "csSTGSTTAXCODE":
			case "csMISCGSTTAXCODE":
			case "csISPOS":
			case "csFLAG":
			case "csDRAWERID":
			case "csCURRENCYCODE1":
			case "csCURRENCYCODE2":
			case "csCURRENCYCODE3":
			case "cdCASHSALESCODE":
			case "cdPOS":
			case "cdNUMBERING":
			case "cdSTOCKCODE":
			case "cdDESCRIPTION":
			case "cdPROJECTCODE":
			case "cdJOBNAME":
			case "cdUOM":
			case "cdDISCOUNT":
			case "cdLOCATIONCODE":
			case "cdCUSTOMERITEMCODE":
			case "cdREFERENCE1":
			case "cdREFERENCE2":
			case "cdFROMTYPE":
			case "cdFROMCODE":
			case "cdFROMPOS":
			case "cdSTOCKTRANSACTIONID":
			case "cdGLACCOUNTCODE":
			case "cdPUOM":
			case "cdBUNDLED":
			case "cdBATCHNO":
			case "cdBATCHNOFROMTYPE":
			case "cdBATCHNOFROMCODE":
			case "cdBATCHNOFROMPOS":
			case "cdFROMQUOTATIONCODE":
			case "cdFROMQUOTATIONREFNO":
			case "cdFROMSALESORDERCODE":
			case "cdFROMSALESORDERREFNO":
			case "cdFROMDELIVERYORDERCODE":
			case "cdFROMDELIVERYORDERREFNO":
			case "cdSERIALNO":
			case "cdSERIALNOBYLINE":
			case "cdSALESTYPECODE":
			case "cdTAGCODE":
			case "cdSUBITEMS":
			case "cdSTOCKBUNDLEDPOS":
			case "cdGSTTYPE":
			case "cdREFERENCE3":
			case "cdREFERENCE4":
			case "cdREFERENCE5":
			case "cdREFERENCE6":
			case "cdREFERENCE7":
			case "cdREFERENCE8":
			case "cdREFERENCE9":
			case "cdREFERENCE10":
			case "cdWTAXTYPECODE":
			case "cdGSTTAXCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true' class='bg-warning'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "csCASHSALESDATE":
			case "csSALESTAXEXPIRYDATE":
			case "csCASHSALESDATETIME":
			case "csFIRSTCREATEDDATE":
			case "csLASTMODIFIEDDATE":
			case "csLASTPRINTEDDATE":
			case "csNIGHTAUDITDATE":
			case "cdBATCHNOEXPIRYDATE":
			case "cdFROMQUOTATIONDATE":
			case "cdFROMSALESORDERDATE":
			case "cdFROMDELIVERYORDERDATE":
			case "cdBNMANUFACTURINGDATE":		
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center bg-warning'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "csFRATE":
			case "csDISCOUNT":
			case "csSALESTAX":
			case "csMISCCHARGES":
			case "csTOTALAMOUNT":
			case "csLESSDEPOSIT":
			case "csBANKCHARGESAMOUNT":
			case "csLOCALTOTALAMOUNT":
			case "csGSTTAXRATE":
			case "csGSTAMOUNT":
			case "csGSTTAXAMOUNT":
			case "csGSTLAMOUNT":
			case "csGSTTAXLAMOUNT":
			case "csAMOUNTTENDERED":
			case "csCHANGED":
			case "csDISGSTAMOUNT":
			case "csDISGSTTAXAMOUNT":
			case "csSTGSTAMOUNT":
			case "csSTGSTTAXAMOUNT":
			case "csMISGSTAMOUNT":
			case "csMISGSTTAXAMOUNT":
			case "csWTAXAMOUNT":
			case "csWTAXLAMOUNT":
			case "csCURRENCYAMOUNT1":
			case "csCURRENCYRATE1":
			case "csCURRENCYAMOUNT2":
			case "csCURRENCYRATE2":
			case "csCURRENCYAMOUNT3":
			case "csCURRENCYRATE3":
			case "cdQTY":
			case "cdUNITPRICE":
			case "cdSALESTAX":
			case "cdAMOUNT":
			case "cdQTY1":
			case "cdUOM1PRICE":
			case "cdQTY2":
			case "cdUOM2PRICE":
			case "cdQTY3":
			case "cdUOM3PRICE":
			case "cdPACKING":
			case "cdPQTY":
			case "cdSERVICECOST":
			case "cdBACKORDER":
			case "cdGSTAMOUNT":
			case "cdGSTTAXAMOUNT":
			case "cdTAXABLEDSALES":
			case "cdWAMOUNT":
			case "cdWTAXAMOUNT":
			case "cdONECENTSDIFF":
			case "cdADJAMOUNT":
			case "cdADJTAXAMOUNT":
			case "cdADJTOTALAMOUNT":
			case "cdADJUNITPRICE":
			case "cdADJTAXUNITPRICE":
			case "cdADJTOTALUNITPRICE":
			case "cdLOCALONECENTSDIFF":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right bg-warning'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
			break;
			default:
			break;
		}
		return returnCol;
	}
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function writeS_analysis_by_item_summary(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "stockCode":		
			case "stockName":		
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
			break;		
			case "qty":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue) + "</td>";
			break;
			case "amount":
			case "discount":
			case "avgPrice":
			case "cogs":
			case "avgCogs":
			case "grossMargin":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
			break;
			default:
			break;
		}
		return returnCol;
	}

	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;			
			case "row":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "total":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_c_arreceipt(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "aqRECEIPTCODE":
			case "aqRECEIVEACCOUNT":
			case "aqRECEIPTREFNO":
			case "aqRECEIPTGLTRANSACTIONID":
			case "aqDEBTORACCOUNT":
			case "aqDEBTORGLTRANSACTIONID":
			case "aqBANKCHARGESACCOUNT":
			case "aqBANKCHARGESGLTRANSACTIONID":
			case "aqPROJECTCODE":
			case "aqJOBNAME":
			case "aqFCURRENCYCODE":
			case "aqRECEIVEFROM":
			case "aqNOTE":
			case "aqCANCELLED":
			case "aqDESCRIPTION":
			case "aqSALESPERSONCODE":
			case "aqATTACHMENTS":
			case "aqPDCHEQUE":
			case "aqMULTIPAYMENT":		
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true' class='bg-warning'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "aqRECEIPTDATE":
			case "aqFIRSTCREATEDUSERCODE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center bg-warning'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "aqBANKCHARGESAMOUNT":
			case "aqFRATE":
			case "aqTOTALAMOUNT":
			case "aqUNMATCHEDAMOUNT":
			case "aqLOCALTOTALAMOUNT":
			case "aqBALANCE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right bg-warning'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
			break;
			default:
			break;
		}
		return returnCol;
	}
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}

function write_c_arreceipt_detail(data)
{
	function col(th_td, colName, colValue)
	{
		var returnCol = "";
		switch(colName) {
			case "aqRECEIPTCODE":
			case "aqRECEIVEACCOUNT":
			case "aqRECEIPTREFNO":
			case "aqRECEIPTGLTRANSACTIONID":
			case "aqDEBTORACCOUNT":
			case "aqDEBTORGLTRANSACTIONID":
			case "aqBANKCHARGESACCOUNT":
			case "aqBANKCHARGESGLTRANSACTIONID":
			case "aqPROJECTCODE":
			case "aqJOBNAME":
			case "aqFCURRENCYCODE":
			case "aqRECEIVEFROM":
			case "aqNOTE":
			case "aqCANCELLED":
			case "aqDESCRIPTION":
			case "aqSALESPERSONCODE":
			case "aqATTACHMENTS":
			case "aqPDCHEQUE":
			case "aqMULTIPAYMENT":		
			case "ahARTYPE":
			case "ahARCODE":
			case "ahARPOS":
			case "ahPAYFORTYPE":
			case "ahPAYFORCODE":
			case "ahPAYFORPOS":
			case "ahCANCELLED":
			case "ahFOREXGLTRANSACTIONID":
			case "ahDEBTORGLTRANSACTIONID":
			case "ahPOSTINGACC":
			case "ahGSTTAXCODE":
			case "ahDISCOUNTACCOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-wrap='true'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-wrap='true'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-wrap='true' class='bg-warning'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;		
			case "aqRECEIPTDATE":
			case "aqFIRSTCREATEDUSERCODE":
			case "ahFOREXPOSTINGDATE":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='center' class='text-center'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center'>" + (colValue == null ? "" : colValue) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='center' class='text-center bg-warning'><del>" + (colValue == null ? "" : colValue) + "</del></td>";
			break;
			case "aqBANKCHARGESAMOUNT":
			case "aqFRATE":
			case "aqTOTALAMOUNT":
			case "aqUNMATCHEDAMOUNT":
			case "aqLOCALTOTALAMOUNT":
			case "aqBALANCE":
			case "ahAMOUNT":
			case "ahLOCALARAMOUNT":
			case "ahLOCALPAYFORAMOUNT":
			case "ahDISCOUNT":
				if(th_td == "th")
					returnCol = "<th data-a-v='center' data-a-h='right' class='text-right'>" + colValue + "</th>";
				else if (th_td == "td")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
				else if (th_td == "td_x")
					returnCol = "<td data-a-v='center' data-a-h='right' class='text-right bg-warning'>" + (colValue == null ? "" : colValue.format(2, 3)) + "</td>";
			break;
			default:
			break;
		}
		return returnCol;
	}
	var head = [];
	var body = [];

	var tmp = "",
	colKey = "",
	colValue = "",
	flagText = "",
	flag = "";

	for (var i in data) {		
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "nodata":
				body.push("<tr><td data-f-bold='true' data-f-sz='14' " + data[i].html + " data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></td></tr>");
				break;
			case "head":
				tmp = "";
				var headerText = data[i].flagText.split(",");
				for(var l in Object.keys(data[i]))
				{
					colKey = Object.keys(data[i])[l];
					colValue = headerText[l];
					tmp += col("th", colKey, colValue);
				}
				head.push("<tr>" + tmp + "</tr>");
				break;			
			case "group":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-wrap='true' colspan=100% class='text-left'>"+ flagText + "</td>" +
					"</tr>");
				break;
			case "rowF":
			case "rowT":			
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col((flag == "rowF"? "td": "td_x"), colKey, colValue);
				}				
				body.push("<tr>" + tmp + "</tr>");
				break;
			case "groupTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-light'>" + tmp + "</tr>");				
				break;
			case "grandTotal":
				tmp = "";
				for(var l in Object.keys(data[i]) )
				{
					colKey = Object.keys(data[i])[l];
					colValue = data[i][colKey];
					tmp += col("td", colKey, colValue);
				}
				body.push("<tr class='font-weight-bold bg-success text-white'>" + tmp + "</tr>");
				break;
			default:
				break;
		}
	}

	$('#tblData thead').html(head.join(""));
	$('#tblData tbody').html(body.join(""));

	setTimeout(function () {
		$("#divLoader").toggleClass('d-none');
	}, 500);
}