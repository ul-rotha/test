document.write(`
    <!--UserProfile-->
    <div class="form-group row mb-1">
    <label for="txtUserProfile" class="col-form-label col-form-label-sm col-5">User:</label>
    <div class="input-group input-group-sm col-7">
    <input type="text" id="txtUserProfile" readonly class="form-control" data-toggle="modal" data-target="#modalUserProfile">
    <div class="input-group-append">
    <button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalUserProfile">
    <i class="fas fa-bars"></i>
    </button>
    </div>
    </div>
    </div>
`);