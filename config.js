/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'blocks', 'list', 'indent', ['align'], 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.removeButtons =
		'Subscript,' +
		'Superscript,' +
		'Cut,' +
		'Copy,' +
		'Paste,' +
		'PasteText,' +
		'PasteFromWord,' +
		'Undo,' +
		'Redo,' +
		'Unlink,' +
		'Anchor,' +
		'About,' +
		'Iframe';

	config.format_tags = 'p;h1;h2;h3;pre';
	config.removeDialogTabs = 'image:advanced;link:advanced;link:target';

	// config.minHeight = 600;
	config.height = 'auto';
	config.autoGrow_minHeight = 600;

	config.toolbarOffset = 30;

	config.uploadUrl = '/wiki/api/file';
	config.filebrowserUploadUrl = '/wiki/api/file';

	// %REMOVE_START%
	config.plugins =
		// 'about,' +
		// 'a11yhelp,' +
		'basicstyles,' +
		// 'bidi,' +
		'blockquote,' +
		'clipboard,' +
		// 'colorbutton,' +
		// 'colordialog,' +
		// 'copyformatting,' +
		'contextmenu,' +
		// 'dialogadvtab,' +
		// 'div,' +
		// 'elementspath,' +
		'enterkey,' +
		'entities,' +
		'filebrowser,' +
		// 'find,' +
		// 'flash,' +
		'floatingspace,' +
		// 'font,' +
		'format,' +
		// 'forms,' +
		'horizontalrule,' +
		'htmlwriter,' +
		'image2,' +
		'iframe,' +
		'indentlist,' +
		'indentblock,' +
		'justify,' +
		// 'language,' +
		'link,' +
		'list,' +
		'liststyle,' +
		'magicline,' +
		'maximize,' +
		// 'newpage,' +
		// 'pagebreak,' +
		'pastefromword,' +
		'pastetext,' +
		// 'preview,' +
		// 'print,' +
		'removeformat,' +
		// 'resize,' +
		// 'save,' +
		// 'selectall,' +
		// 'showblocks,' +
		// 'showborders,' +
		// 'smiley,' +
		'sourcearea,' +
		// 'specialchar,' +
		// 'stylescombo,' +
		// 'tab,' +
		'table,' +
		'tabletools,' +
		// 'templates,' +
		'toolbar,' +
		'undo,' +
		'wysiwygarea,' +
		'ckeditortablecellsselection,' +
		'tableresize,' +
		'codesnippet,' +
		'toolbarfloat,' +
		// 'simpleuploads,' +
		'autogrow';
	// %REMOVE_END%
};

// %LEAVE_UNMINIFIED% %REMOVE_LINE%
