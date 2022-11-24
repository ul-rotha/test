document.write(`
	<!--write chart of account-->
	<div class="form-group row mb-1">
		<label for="txtAccount" class="col-form-label col-form-label-sm col-5">Chart code:</label>
		<div class="input-group input-group-sm col-7">
			<input type="text" id="txtAccount" readonly class="form-control" data-toggle="modal" data-target="#modalAccount">
			<div class="input-group-append">
				<button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalAccount">
					<i class="fas fa-bars"></i>
				</button>
			</div>
		</div>
	</div>
`);