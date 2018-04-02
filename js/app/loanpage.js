/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'jquery.min'
	}
});

require(['jquery'], function($) {
	$(function() {
		$(document).on("click",".loan-close", function() {
			$(this).parents(".loan-detail").hide();
		})
		$(".loan-href").on("click", function() {
			var theId = $(this).parents("tr").attr("data-id");
			var data = {};
			data.theId = theId;
			$.ajax({
				type: 'POST',
				url: 'urls',
				data: data,
				dataType: 'json',
				success: function($res) {
					if($res.status == "success") {
						$(".loan-detail").html('<a class="loan-close" href="javascript:void(0)"></a>'+$res.content);
						$(".loan-detail").show();
					}
				},
				error: function() {}
			});
		})
	});
});