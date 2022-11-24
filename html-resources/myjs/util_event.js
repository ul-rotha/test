var _DATE_FORMAT = "dd-M-yyyy";  /*format for DatePicker*/
var _DATE_FORMAT_MM = "DD-MMM-YYYY"; /*format for Moment*/

$('.mymodal-filter table').on('click', 'tr', function (event) {
    if (event.target.type !== 'checkbox') {
        $(':checkbox', this).trigger('click');
    }
});


function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

$('.mymodal-filter input').keyup(delay(function (e) {
    var modal = $(this).closest('.modal');
    var searchText = $(this).val().toLowerCase();
    $.each($('#' + modal.attr('id') + ' table tbody tr'), function () {
        if ($(this).text().toLowerCase().indexOf(searchText) === -1)
            $(this).hide();
        else
            $(this).show();
    });
}, 700));

$(".mymodal-filter .btn").click(function () {
    var modal = $(this).closest('.modal');
    var selectedCode = [];
    $('#' + modal.attr('id') + ' table tr').not('thead tr').each(function (i) {
        var $chkbox = $(this).find('input[type="checkbox"]');
        //if ($chkbox.length) {
        if ($chkbox.prop('checked'))
            selectedCode.push($(this).attr("val"));
        //}        
    });
    $('#' + $(this).attr('resultto')).val(selectedCode.join(', '));
    $(this).closest('.modal').modal('toggle');
});

$('#selectPeriod0').on('change', function (e) {
    var option = this.value;
    var period = selectPeriod(option);

    if (option != 0) {
        $('.input-group.datefrom0')
            .datepicker({
                format: _DATE_FORMAT,
                weekStart: 1,
                todayBtn: true,
                clearBtn: true,
                disableTouchKeyboard: true,
                autoclose: true,
                todayHighlight: true,
                orientation: "bottom right"
            }).datepicker('update', period.from.format("DD-MM-YYYY"))
            .on('changeDate', function (e) {
                $('#selectPeriod0 option')[0].selected = true;
            });

        $('.input-group.dateto0')
            .datepicker({
                format: _DATE_FORMAT,
                weekStart: 1,
                todayBtn: true,
                clearBtn: true,
                disableTouchKeyboard: true,
                autoclose: true,
                todayHighlight: true,
                orientation: "bottom right"
            }).datepicker('update', period.to.format("DD-MM-YYYY"))
            .on('changeDate', function (e) {
                $('#selectPeriod0 option')[0].selected = true;
            });
    }
});

$('#selectPeriod1').on('change', function (e) {
    var option = this.value;
    var period = selectPeriod(option);

    if (option != 0) {
        $('.input-group.datefrom1')
            .datepicker({
                format: _DATE_FORMAT,
                weekStart: 1,
                todayBtn: true,
                clearBtn: true,
                disableTouchKeyboard: true,
                autoclose: true,
                todayHighlight: true,
                orientation: "bottom right"
            }).datepicker('update', period.from.format("DD-MM-YYYY"))
            .on('changeDate', function (e) {
                $('#selectPeriod1 option')[0].selected = true;
            });

        $('.input-group.dateto1')
            .datepicker({
                format: _DATE_FORMAT,
                weekStart: 1,
                todayBtn: true,
                clearBtn: true,
                disableTouchKeyboard: true,
                autoclose: true,
                todayHighlight: true,
                orientation: "bottom right"
            }).datepicker('update', period.to.format("DD-MM-YYYY"))
            .on('changeDate', function (e) {
                $('#selectPeriod1 option')[0].selected = true;
                $('#txtTitle1').val(moment($(".input-group.dateto1").datepicker('getDate')).format("MMM-YYYY"));
            });
        $('#txtTitle1').val(moment($(".input-group.dateto1").datepicker('getDate')).format("MMM-YYYY"));
    }
});

$('#selectPeriod2').on('change', function (e) {
    var option = this.value;
    var period = selectPeriod(option);
    if (option != 0) {
        $('.input-group.datefrom2')
            .datepicker({
                format: _DATE_FORMAT,
                weekStart: 1,
                todayBtn: true,
                clearBtn: true,
                disableTouchKeyboard: true,
                autoclose: true,
                todayHighlight: true,
                orientation: "bottom right"
            })
            .datepicker('update', period.from.format("DD-MM-YYYY"))
            .on('changeDate', function (e) {
                $('#selectPeriod2 option')[0].selected = true;
            });

        $('.input-group.dateto2')
            .datepicker({
                format: _DATE_FORMAT,
                weekStart: 1,
                todayBtn: true,
                clearBtn: true,
                disableTouchKeyboard: true,
                autoclose: true,
                todayHighlight: true,
                orientation: "bottom right"
            })
            .datepicker('update', period.to.format("DD-MM-YYYY"))
            .on('changeDate', function (e) {
                $('#selectPeriod2 option')[0].selected = true;
                $('#txtTitle2').val(moment($(".input-group.dateto2").datepicker('getDate')).format("MMM-YYYY"));
            });

        $('#txtTitle2').val(moment($(".input-group.dateto2").datepicker('getDate')).format("MMM-YYYY"));
    }
});

$("#modalReportTemplate").on("click", "#btnSave", function () {
    var name = $("#modalReportTemplate #name").val();
    var pos = $("#modalReportTemplate #pos").val();
    var remark = $("#modalReportTemplate #remark").val();
    var action = $("#modalReportTemplate #action").val();

    jsObject.saveReportTemplate(name, pos, remark, action);
});

$("#modalReportTemplate").on("keyup", "#remark", function (e) {
    if (e.keyCode === 13)
        $("#modalReportTemplate #btnSave").click();
});


$("#reportCenter").on("click", ".open, .fav, .edit, .copy, .del", function () {
    var name = $(this).closest('.report').attr('name');
    var pos = $(this).closest('.report').attr('pos');
    var title = $(this).closest('.report').attr('title');
    var remark = $(this).closest('.report').attr('remark');


    if ($(this).hasClass('open')) {
        jsObject._report(name, pos, title, remark);
    }
    else if ($(this).hasClass('edit')) {
        $("#modalReportTemplate .modal-title").text("Edit");
        $("#modalReportTemplate #name").val(name);
        $("#modalReportTemplate #pos").val(pos);
        $("#modalReportTemplate #title").val(title);
        $("#modalReportTemplate #remark").val(remark);
        $("#modalReportTemplate #action").val("edit");

        $("#modalReportTemplate").modal('show');
        $("#modalReportTemplate #remark").trigger('focus');
    }
    else if ($(this).hasClass('copy')) {
        $("#modalReportTemplate .modal-title").text("Copy");
        $("#modalReportTemplate #name").val(name);
        $("#modalReportTemplate #pos").val(pos);
        $("#modalReportTemplate #title").val(title);
        $("#modalReportTemplate #remark").val("");
        $("#modalReportTemplate #action").val("copy");

        $("#modalReportTemplate").modal('show');
        $("#modalReportTemplate #remark").trigger('focus');
    }
    else if ($(this).hasClass('del')) {
        $("#modalReportTemplate .modal-title").text("Delete");
        $("#modalReportTemplate #name").val(name);
        $("#modalReportTemplate #pos").val(pos);
        $("#modalReportTemplate #title").val(title);
        $("#modalReportTemplate #remark").val(remark);
        $("#modalReportTemplate #action").val("del");

        $("#modalReportTemplate").modal('show');
    }

    //alert(reportName);
    //var val = $("#modalReportTemplate input").val();
    //
});


$(".clearer").click(function () {
    $(this).parent().siblings('input[type="text"]').val('').focus();
});


