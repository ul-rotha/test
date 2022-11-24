document.write(`
     <!--write stock item-->
     <div class="form-group row mb-1">
     <label for="txtStock" class="col-form-label col-form-label-sm col-5">Stock:</label>
     <div class="input-group input-group-sm col-7">
     <input type="text" id="txtStock" readonly class="form-control" data-toggle="modal" data-target="#modalStock">
     <div class="input-group-append">
     <button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalStock">
     <i class="fas fa-bars"></i>
     </button>
     </div>
     </div>
     </div>
`);