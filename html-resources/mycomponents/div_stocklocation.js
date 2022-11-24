document.write(`
    <!--Location-->
    <div class="form-group row mb-1">
    <label for="txtStockLocation" class="col-form-label col-form-label-sm col-5">Stock Location:</label>
    <div class="input-group input-group-sm col-7">
    <input type="text" id="txtStockLocation" readonly class="form-control" data-toggle="modal" data-target="#modalStockLocation">
    <div class="input-group-append">
    <button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalStockLocation">
    <i class="fas fa-bars"></i>
    </button>
    </div>
    </div>
    </div>
`);