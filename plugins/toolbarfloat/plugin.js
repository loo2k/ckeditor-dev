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

'use strict';

( function() {

	CKEDITOR.plugins.add( 'toolbarfloat', {
		init: function( editor ) {
			if ( editor.elementMode == CKEDITOR.ELEMENT_MODE_INLINE )
				return;

			editor.on( 'instanceReady', function() {
				initToolbarFloat( editor );
			});
		}
	});

	function initToolbarFloat( editor ) {

		var container = editor.container.getFirst( function( node ) {
			return node.type == CKEDITOR.NODE_ELEMENT && node.hasClass('cke_inner');
		});
		var toolbar = editor.ui.space( 'top' );

		var $editor = $('.cke');
		var $toolbar = $('.cke_top');
		var initialized = false;
		var toolbarOffset = editor.config.toolbarOffset || 0;
		var toolbarHeight = 0;

		function initToolbarFloatBase() {

			// console.log('toolbar.$.offsetLeft', toolbar.$.offsetLeft);
			// console.log('toolbar.$.offsetWidth', toolbar.$.offsetWidth);
			console.log('init');
			toolbar.setStyle( 'position', 'static' );
			// console.log('toolbar.$.offsetWidth', toolbar.$.offsetWidth);
			toolbar.setStyle( 'width', container.$.offsetWidth );
			toolbar.setStyle( 'left', container.$.offsetLeft );

			// toolbar.setStyles( {
			// 	'position': 'static',
			// 	'width': toolbar.$.offsetWidth,
			// 	'left': toolbar.$.offsetLeft
			// } );

			// console.log('toolbar.$.offsetWidth', toolbar.$.offsetWidth);
			// setTimeout( function() {
				// toolbar.setStyles( {
					// 'position': '',
					// 'width': toolbar.$.offsetWidth
				// } );
			// }, 0 );

			toolbarHeight = toolbar.$.offsetHeight;

			return true;
		}

		$(window).on( 'resize.ckeditor', function() {
			if ($toolbar.length == 0) {
				return false;
			}

			initialized = initToolbarFloatBase()
		});

		$(window).on( 'scroll.ckeditor', function() {
			console.log('initialized', initialized);
			if ($toolbar.length == 0) {
				return false;
			}

			var topEdge = container.$.offsetTop;
			var bottomEdge = topEdge + container.$.offsetHeight;
			var ckeWindow = new CKEDITOR.dom.window( window );
			var scrollTop = ckeWindow.getScrollPosition().y + toolbarOffset;

			if (scrollTop <= topEdge || scrollTop >= bottomEdge) {

				toolbar.removeClass( 'cke_top--fixed' );
				toolbar.setStyle( 'position', 'static' );
				toolbar.setStyle( 'top', toolbarOffset );
				container.setStyle( 'padding-top', '' );

			} else {
				initialized = initialized ? initToolbarFloatBase() : true;

				toolbar.addClass( 'cke_top--fixed' );
				toolbar.setStyle( 'position', 'fixed' );
				container.setStyle( 'padding-top', toolbarHeight );
			}
		});

	}

})();
