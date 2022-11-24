document.write(`
    <!--Purchaser-->
    <div class="form-group row mb-1">
    <label for="txtSalesPerson" class="col-form-label col-form-label-sm col-5">Agent:</label>
    <div class="input-group input-group-sm col-7">
    <input type="text" id="txtSalesPerson" readonly class="form-control" data-toggle="modal" data-target="#modalSalesPerson">
    <div class="input-group-append">
    <button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalSalesPerson">
    <i class="fas fa-bars"></i>
    </button>
    </div>
    </div>
    </div>
`);