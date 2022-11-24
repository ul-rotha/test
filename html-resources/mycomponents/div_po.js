document.write(`
    <!--Purchase Order Document-->
    <div class="form-group row mb-1">
    <label for="txtPo" class="col-form-label col-form-label-sm col-5">Document:</label>
    <div class="input-group input-group-sm col-7">
    <input type="text" id="txtPo" readonly class="form-control" data-toggle="modal" data-target="#modalPo">
    <div class="input-group-append">
    <button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalPo">
    <i class="fas fa-bars"></i>
    </button>
    </div>
    </div>
    </div>
`);