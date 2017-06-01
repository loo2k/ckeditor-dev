/*
 * Plugin developed by Luke
 *
 * LICENCE: MIT
 * NON-COMMERCIAL PLUGIN.
 *
 * Website: lukesign.com
 * Twitter: @loo2k
 *
 */

CKEDITOR.plugins.add( 'toolbarfloat', {
	init: function( editor ) {
		var toolbarOffset = editor.config.toolbarOffset || 0;
		var toolbarHeight = 0;


		function initToolbarFloat() {
			var $editor = $('.cke');
			var $toolbar = $('.cke_top');

			$toolbar.css('position', 'static');
			$toolbar.css('width', 'auto');
			$toolbar.css('width', $toolbar.outerWidth());
			$toolbar.css('left', $toolbar.offset().left);
			$toolbar.css('position', '');

			toolbarHeight = $toolbar.outerHeight();
			return true;
		}

		initialized = null
		$(window).on( 'resize.ckeditor', function() {
			initialized = initToolbarFloat()
		});

		$(window).on( 'scroll.ckeditor', function() {
			var $editor = $('.cke');
			var $toolbar = $('.cke_top');
			var $content = $('.cke_contents');

			topEdge = $editor.offset().top
			bottomEdge = topEdge + $editor.outerHeight();
			scrollTop = $(document).scrollTop() + toolbarOffset;

			if (scrollTop <= topEdge || scrollTop >= bottomEdge) {
				$toolbar.removeClass('cke_top--fixed');
				$toolbar.css('position', 'static');
				$toolbar.css('top', toolbarOffset);
				$editor.css('padding-top', '');
			} else {
				initialized = initialized ? initToolbarFloat() : true;
				$toolbar.addClass('cke_top--fixed');
				$toolbar.css('position', 'fixed');
				$editor.css('padding-top', toolbarHeight);
			}
		});
	}
});
