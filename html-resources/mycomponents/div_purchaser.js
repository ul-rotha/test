document.write(`
    <!--Purchaser-->
    <div class="form-group row mb-1">
    <label for="txtPurchaser" class="col-form-label col-form-label-sm col-5">Purchaser:</label>
    <div class="input-group input-group-sm col-7">
    <input type="text" id="txtPurchaser" readonly class="form-control" data-toggle="modal" data-target="#modalPurchaser">
    <div class="input-group-append">
    <button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalPurchaser">
    <i class="fas fa-bars"></i>
    </button>
    </div>
    </div>
    </div>
`);