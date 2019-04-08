$('#datatables').DataTable({
	"pagingType": "full_numbers",
	"lengthMenu": [
		[10, 25, 50, -1],
		[10, 25, 50, "All"]
	],
	responsive: true,
	language: {
		search: "_INPUT_",
		searchPlaceholder: "Search records",
	},
	initComplete: function () {
		this.api().columns().every(function (index) {
			var column = this;
			if ($(column.header()).attr('class') === 'disabled-sorting text-right sorting') {
				$(column.footer()).empty();
				return;
			}

			var select = $('<select class="form-control"><option value="">---All---</option></select>')
				.appendTo($(column.footer()).empty())
				.on('change', function () {
					var val = $.fn.dataTable.util.escapeRegex(
						$(this).val()
					);

					column
						.search(val ? '^' + val + '$' : '', true, false)
						.draw();
				});

			column.data().unique().sort().each(function (d, j) {
				select.append('<option value="' + d + '">' + d + '</option>')
			});
		});
	}
});

var table = $('#datatables').DataTable();

$('#catchChange').on("DOMSubtreeModified DOMNodeInserted DOMNodeRemoved", function () {
	// table.clear()
	table.rows().invalidate().draw()
	// table.cells().invalidate('dom').draw()
	console.log(table.rows().data())

	// $('#datatables').dataTable().api().columns().every(function (index) {
	// 	var column = this;
	// 	if ($(column.header()).attr('class') === 'disabled-sorting text-right sorting') {
	// 		$(column.footer()).empty();
	// 		return;
	// 	}
	// 	var select = $('<select class="form-control"><option value="">---All---</option></select>')
	// 		.appendTo($(column.footer()).empty())
	// 		.on('change', function () {
	// 			var val = $.fn.dataTable.util.escapeRegex(
	// 				$(this).val()
	// 			);

	// 			column
	// 				.search(val ? '^' + val + '$' : '', true, false)
	// 				.draw();
	// 		});

	// 	column.data().unique().sort().each(function (d, j) {
	// 		select.append('<option value="' + d + '">' + d + '</option>')
	// 	});
	// });
});

// Edit record
table.on('click', '.edit', function () {
	$tr = $(this).closest('tr');

	var data = table.row($tr).data();
	alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
});

// Delete a record
table.on('click', '.remove', function (e) {
	$tr = $(this).closest('tr');
	table.row($tr).remove().draw();
	e.preventDefault();
});

//Like record
table.on('click', '.like', function () {
	alert('You clicked on Like button');
});
// $(".card .material-datatables label").removeClass();
// $('.card .material-datatables label').addClass('form-group');
