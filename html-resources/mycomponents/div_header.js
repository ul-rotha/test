document.write(`
<div class=" d-print-none border-bottom p-1 my-formhead fixed-top" style="cursor:pointer" >
	<div class="container col-sm-12 col-md-12 col-lg-12 col-xl-10">
		<div class="row flex-nowrap justify-content-between align-items-center text-white">
			<div class="col-3">			
				<i class="fas fa-arrow-left mr-2" onclick="jsObject.back();"></i>
				<a onclick="$('.util-sidebar').toggleClass('d-none');"><i class="fas fa-filter fa-sm mr-2"></i></a>
				<!--<i class="fas fa-desktop fa-sm mr-2"></i>-->
				<i class="fas fa-download mr-2" onclick="ExportToExcel();"></i>		
			</div>
			<div class="col-6 text-center">
				<a class="font-weight-bold" onclick="$('.util-sidebar').toggleClass('d-none');" id="headerTitle"></a>
			</div>
			<div class="col-3 text-right">
				<i class="fas fa-code fa-sm mr-2" onclick="jsObject.showDevTools();"></i>
				<i class="fas fa-step-backward fa-sm mr-2"></i>
				<a class="prev"><i class="fas fa-chevron-left fa-sm mr-2"></i></a>
				<a class="next"><i class="fas fa-chevron-right fa-sm mr-2"></i></a>
				<i class="fas fa-step-forward fa-sm"></i>
			</div>
		</div>
	</div>
</div>
`);


/*
<div class="d-print-none border-bottom my-formhead text-white fixed-top">
	<div class="col-4">
        <i class="fas fa-filter fa-sm float-left"></i>
		</div>

	<div class="col-4 text-center">
        <a href="#">UTil-Soft</a>
    </div>
	<div class="col-4 d-flex justify-content-end align-items-center">
        <div class="btn-group btn-group-sm" role="group" aria-label="First group">
			<button type="button" class="btn btn-secondary"><i class="fas fa-filter fa-sm float-left"></i></button>
			<button type="button" class="btn btn-secondary">2</button>
			<button type="button" class="btn btn-secondary">3</button>
			<button type="button" class="btn btn-secondary">4</button>
		</div>
    </div>
</div>

document.write(
    '<div id="skippy" class="d-print-none border-bottom p-1 my-formhead fixed-top" style="cursor:pointer" onclick="$(\'.util-sidebar\').toggleClass(\'d-none\');">' +
    '<div class="container">' +
    '<h6 class="m-1 text-center text-white">' +
    '<i class="fas fa-filter fa-sm float-left"></i>UTil-Soft' +
    '</h6>' +
    '</div>' +
    '</div>'
);

*/

/*
document.write(
    '<div class="d-print-none border-bottom p-1 my-formhead" style="cursor:pointer" onclick="$(\'.util-sidebar\').toggleClass(\'d-none\');">' +
    '<div class="d-print-none border-bottom p-1 my-formhead" style="cursor:pointer">' +
    '<div class="container">' +
    '<h6 class="m-1 text-center text-white">' +
    '<i class="fas fa-filter fa-sm float-left"></i>UTil-Soft' +
    '<i class="fas fa-filter fa-sm float-left" onclick="$(\'.util-sidebar\').toggleClass(\'d-none\');"></i>' +
    '<span onclick="$(\'.util-sidebar\').toggleClass(\'d-none\');">UTil - Soft</span>' +
    '<i class="fas fa-desktop fa-sm float-right" onclick="switchView()" id="viewstyle"></i>' +
    '</h6>' +
    '</div>' +
    '</div>'
);
*/