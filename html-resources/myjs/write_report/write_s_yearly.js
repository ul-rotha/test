
function write_s_yearly(data) {
	var stockCode;
	var stockName;
	var jan;
	var feb;
	var mar;
	var apr;
	var may;
	var jun;
	var jul;
	var aug;
	var sep;
	var oct;
	var nov;
	var dec;
	var total;
	var flagText;
	var flag;

	var head = [];
	var body = [];

	for (var i in data) {
		stockCode = data[i].stockCode;
		stockName = data[i].stockName;
		jan = data[i].jan;
		feb = data[i].feb;
		mar = data[i].mar;
		apr = data[i].apr;
		may = data[i].may;
		jun = data[i].jun;
		jul = data[i].jul;
		aug = data[i].aug;
		sep = data[i].sep;
		oct = data[i].oct;
		nov = data[i].nov;
		dec = data[i].dec;
		total = data[i].total;
		flagText = data[i].flagText;
		flag = data[i].flag;

		switch (flag) {
			case "company":
				head.push("<tr><th data-f-bold='true' data-f-sz='24' colspan=15 data-a-h='center' class='border-0 m-0 p-0'><h2 class='text-center'>" + flagText + "</h2></th></tr>");
				break;
			case "title":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=15 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center' id='reportTitle'>" + flagText + "</h6></th></tr>");
				break;
			case "subtitle":
				head.push("<tr><th data-f-bold='true' data-f-sz='14' colspan=15 data-a-h='center' class='border-0 m-0 p-0'><h6 class='text-center'>" + flagText + "</h6></th></tr>");
				break;
			case "header":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-a-v='center' data-a-h='left' class='text-left'>" + stockCode + "</td>" +
					"<td data-a-v='center' data-a-h='left' class='text-left'>" + stockName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + jan + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + feb + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + mar + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + apr + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + may + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + jun + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + jul + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + aug + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + sep + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + oct + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + nov + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + dec + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + total + "</td>" +
					"</tr>");
				break;	
			case "gb0":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-fill-color='17a2b8' data-f-color='FFFFFE' data-f-bold='true' data-f-sz='16' colspan=15>" + flagText + "</td>" +					
					"</tr>");
				break;			
			case "gb1":
				body.push(
					"<tr class='font-weight-bold'>" +
					"<td data-f-bold='true' colspan=15>" + "&nbsp;".repeat(5) + flagText + "</td>" +					
					"</tr>");
				break;
			case "row":
				body.push(
					"<tr>" +
					"<td data-a-v='center' data-a-h='left' class='text-left'>" + "&nbsp;".repeat(5) + stockCode + "</td>" +
					"<td data-a-v='center' data-a-h='left' class='text-left'>" + stockName + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + jan + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + feb + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + mar + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + apr + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + may + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + jun + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + jul + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + aug + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + sep + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + oct + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + nov + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + dec + "</td>" +
					"<td data-a-v='center' data-a-h='right' class='text-right'>" + total + "</td>" +
					"</tr>");
				console.log(stockCode + stockName);
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
