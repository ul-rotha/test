document.write(`
	<!--Creditor-->
	<div class="form-group row mb-1">
		<label for="txtCreditor" class="col-form-label col-form-label-sm col-5">Supplier:</label>
		<div class="input-group input-group-sm col-7">
			<input type="text" id="txtCreditor" readonly class="form-control" data-toggle="modal" data-target="#modalCreditor">
			<div class="input-group-append">
				<button class="btn btn-sm btn-outline-secondary" type="button" data-toggle="modal" data-target="#modalCreditor">
					<i class="fas fa-bars"></i>
				</button>
			</div>
		</div>
	</div>
`);