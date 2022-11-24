document.write(
    '<!--Select option-->' +
    '<div class="form-group row mb-1">' +
    '<label for="selectPeriod1" class="col-form-label col-form-label-sm col-5">Period #1:</label>' +
    '<div class="input-group col-7">' +
    '<select class="custom-select custom-select-sm" id="selectPeriod1">' +
    '<option value="0">Custom</option>' +
    '<option value="1">Today</option>' +
    '<option value="2">This week</option>' +
    '<option value="3">This week-to-date</option>' +
    '<option value="4">This month</option>' +
    '<option value="5">This month-to-date</option>' +
    '<option value="6">Last month</option>' +
    '<option value="7">Last month-to-date</option>' +
    '<option value="8">This year</option>' +
    '<option value="9">This year-to-date</option>' +
	'<option value="10">Last year</option>' +
    '<option value="11">Last year-to-date</option>' +
    '</select>' +
    '</div>' +
    '</div>' +

    '<!--Title-->' +
    '<div class="form-group row mb-1">' +
    '<label for="txtTitle1" class="col-form-label col-form-label-sm col-5">Title:</label>' +
    '<div class="input-group input-group-sm col-7">' +
    '<input type="text" id="txtTitle1" class="form-control">' +
    '</div>' +
    '</div>' +

    '<!--Date from-->' +
    '<div class="form-group row mb-1">' +
    '<label for="txtDateFrom1" class="col-form-label col-form-label-sm col-5">Date from:</label>' +
    '<div class="input-group date datefrom1 input-group-sm col-7">' +
    '<input type="text" id="txtDateFrom1" class="form-control">' +
    '<div class="input-group-append">' +
    '<button class="btn btn-sm btn-outline-secondary" type="button">' +
    '<i class="far fa-calendar-alt"></i>' +
    '</button>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<!--Date to-->' +
    '<div class="form-group row mb-1">' +
    '<label for="txtDateTo1" class="col-form-label col-form-label-sm col-5">Date to:</label>' +
    '<div class="input-group date dateto1 input-group-sm col-7">' +
    '<input type="text" id="txtDateTo1" class="form-control">' +
    '<div class="input-group-append">' +
    '<button class="btn btn-sm btn-outline-secondary" type="button">' +
    '<i class="far fa-calendar-alt"></i>' +
    '</button>' +
    '</div>' +
    '</div>' +
    '</div>'
);