document.write(
    `<div class="modal" data-modal-index="2" tabindex="-1" aria-labelledby="myLargeModalLabel" id="modalReportTemplate">
    <div class="modal-dialog modal-sm-12 modal-md-12 modal-lg-6">
        <div class="modal-content pl-2 pr-2">
            <div class="modal-header-sm text-center">
                <h5 class="modal-title">Template Name</h5>
			</div>
            <div class="modal-body">
				<form>
				  <div class="form-group">
					<input type="text" class="form-control" id="name" hidden/>
					<input type="text" class="form-control" id="pos" hidden/>
					<input type="text" class="form-control mb-2" id="title" readonly/>
					<input type="text" class="form-control" id="remark" placeholder="Remark..." />
					<input type="text" class="form-control" id="action" hidden/>
				  </div>         
				</form>
			</div>
            <div class="modal-footer p-1 mt-0">
                <button type="button" class="btn btn-success btn-sm" data-target="#modalReportTemplate" id="btnSave">Ok</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
    </div>`
);


