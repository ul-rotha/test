document.write(`
    <!--Ar Receipt Document-->
    <div class="form-group row mb-1">
    <label for="txtArReceipt" class="col-form-label col-form-label-sm col-5">AR Reeceipt:</label>
    <div class="input-group input-group-sm col-7">
    <input type="text" id="txtArReceipt" readonly class="form-control" data-toggle="modal" data-target="#modalArReceipt">
    <div class="input-group-append">
    <button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalArReceipt">
    <i class="fas fa-bars"></i>
    </button>
    </div>
    </div>
    </div>
`);