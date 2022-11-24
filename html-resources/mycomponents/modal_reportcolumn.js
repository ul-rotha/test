document.write(
	`<div class="modal" data-modal-index="2" tabindex="-1" aria-labelledby="myLargeModalLabel" id="modalReportColumn">
    <div class="modal-dialog modal-sm-12 modal-md-12 modal-lg-6">
        <div class="modal-content pl-2 pr-2">
            <div class="modal-header-sm text-center">
                <h5 class="modal-title">Report Column</h5>				
			</div>
            <div class="input-group col-12 mt-1 mb-1 pl-1 pr-1">
                <ul id="listReportColumn" class="list-group list-group-sm w-100"></ul> 
            </div>
            <div class="modal-footer p-1 mt-0">				
                <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modalReportColumn" onclick="saveReportColumn();" >Save</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
    </div>`
	);