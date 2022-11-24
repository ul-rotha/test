document.write(
    '<!--write stock item-->' +
    '<div class="form-group row mb-1">' +
	 '<div class="col-5">' +
    '<div class="form-check form-check-inline">' +
    '<input class="form-check-input" type="checkbox" id="chkIncludeStockItem" checked>' +
    '<label class="form-check-label" for="chkIncludeStockItem">Stock Item</label>' +
    '</div>' +
    '</div>' +
	'<div class="input-group input-group-sm col-7">' +
    '<input type="text" id="txtStockItem" readonly class="form-control" data-toggle="modal" data-target="#modalStockItem">' +
    '<div class="input-group-append">' +
    '<button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalStockItem">' +
    '<i class="fas fa-bars"></i>' +
    '</button>' +
    '</div>' +
    '</div>' +
    '</div>'
);