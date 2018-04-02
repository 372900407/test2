/**
 * Created by OO on 2015/8/20.
 */

require.config({
	baseUrl: '',
	paths: {
		'jquery': 'js/jquery.min',
		'layer': 'js/layer',
	},
	shim: {
		 'velocity': {
            deps: ['jquery']
        }
	}
});

require(['jquery', 'layer', 'velocity'], function($, layer, velocity) {
	$(function() {
		//显示修改内容
		
	});
});