	    <style type="text/css">
	    	/* bird.css */
			.birdImg {
			    width: 100%;

			    position: relative;
			    z-index: 20;

			    box-shadow: 0px 5px 5px rgba( 0, 0, 0, .25 );
			}

			.butCont {
			    width: 100%;
			    display: flex;
			    justify-content: space-around;
			    align-content: center;
			    align-items: center;
			    height: 3rem;
			    /* padding-top: 20px; */
			    /* padding-bottom: 20px; */
			    border-bottom-left-radius: 10px;
			    border-bottom-right-radius: 10px;

			    position: relative;
			    top: -10px;
			    z-index: 10;
			}

			.butCont button {
			    height: 24px;
			    position: relative;
			    top: 5px;
			}

			.descriptDisp {
			    padding: 15px;
			}

			.descriptDisp h1 {
			    margin-top: 10px;
			    margin-bottom: 10px;
			}

			.descriptDisp h2, p {
			    margin-bottom: 10px;
			}

			/* base.css */
			@import url('https://fonts.googleapis.com/css?family=Comfortaa|Lato');

			* {
			    box-sizing: border-box;
			    margin: 0;
			}

			body {
			    display: flex;
			    flex-direction: column;
			    justify-content: center;
			    align-items: center;

			    background: #96DB92;

			    font-family: 'Lato', sans-serif;
			}

			input {
			    /* max-width: 75%; */

			    border-radius: 100px;
			    border-style: none;
			    width: 100%;
			    outline: none;
			    padding: 5px;
			}

			button, select {
			    outline: none;
			    border: none;
			    background: transparent;
			    padding: 0;
			}

			header {
			    display: flex;
			    justify-content: center;
			    width: 100vw;

			    padding-top: .75rem;
			    padding-bottom: .75rem;

			    position: fixed;
			    top: 0;
			    left: 0;
			    z-index: 10;

			    border-bottom: 1px solid rgb(97, 134, 83);
			    filter: drop-shadow( 0px 3px 5px rgba( 0, 0, 0, .25 ));
			}

			.menuBut {
			    position: absolute;
			    left: 5px;
			    /* float: left; */
			    top: 50%;
			    transform: translateY(-50%);
			}

			.searchCont {
			    width: 80vw;
			    height: 2rem;
			    display: flex;
			    align-content: stretch;
			    align-items: stretch;

			    position: relative;

			    /* filter: drop-shadow( 0px 3px 5px rgba( 0, 0, 0, .25 )); */
			}

			.searchBar {
			    display: inline;
			    text-indent: 1rem;
			    /* width: 100%; */
			}

			.searchOpt {
			    width: 65px;
			    border-bottom-left-radius: 100px;
			    border-top-left-radius: 100px;
			    padding-left: 10px;
			}

			.headFont {
			    font-family: 'comfortaa', serif;
			    color: #ae003d;
			}

			.gpsBut {
			    background: none;
			    border: none;
			    outline: none;
			    right: 80px;

			    position: absolute;
			    right: 5px;

			    top: 50%;
			    transform: translateY(-45%);
			}

			.searchBut {
			    right: 2rem;
			}

			.resultDisp {
			    margin: 10px;
			    margin-top: 4.25rem;
			    width: 90%;

			    overflow: hidden;

			    filter: drop-shadow( 0px 3px 5px rgba( 0, 0, 0, .25 ));
			}


			.menuDisp {
			    height: calc( 100vh - 3.5rem );
			    width: 75vw;
			    position: fixed;
			    top: 3.5rem;
			    left: -75%;
			    /* display: none; */
			    z-index: 20;
			    transition: left .5s ease-in-out;
			}

			#menuToggle:checked + .menuDisp {
			    /* display: initial; */
			    left: 0;
			}

			.menu {
			    list-style-type: none;
			    padding: 0;
			}

			.menu > *:last-child {
			    position: absolute;
			    bottom: 0; 
			}

			.menuItem {
			    padding: 1rem;
			    border-bottom: 1px solid #678D58;
			}

			.red {
			    color: #fd393e;
			}

			.white {
			    color: white;
			}

			.black {
			    color: black;
			}

			.gray {
			    color: #444;
			}

			.whiteFill {
			    fill: white;
			}

			.blueFill {
			    fill: dodgerblue;
			}

			.whiteBkg {
			    background: white;
			}

			.darkGreenBkg {
			    background: #678D58;
			}

			.greenBkg {
			    background: #96DB92;
			}

			.headFont {
			    font-family: 'comfortaa', serif;
			    color: #ae003d;
			}

			.bodyFont {
			    font-family: 'Lato', sans-serif;
			}

			.italics {
			    font-style: italic;
			}

			.invisible {
			    display:none;
			}

			.roundCorners {
			    border-radius: 10px;
			    overflow: hidden;
			}

			/* base.css */
			/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */

			/* Document
			   ========================================================================== */

			/**
			 * 1. Correct the line height in all browsers.
			 * 2. Prevent adjustments of font size after orientation changes in iOS.
			 */

			html {
			  line-height: 1.15; /* 1 */
			  -webkit-text-size-adjust: 100%; /* 2 */
			}

			/* Sections
			   ========================================================================== */

			/**
			 * Remove the margin in all browsers.
			 */

			body {
			  margin: 0;
			}

			h1 {
			  font-size: 2em;
			  margin: 0.67em 0;
			}

			/* Grouping content
			   ========================================================================== */

			/**
			 * 1. Add the correct box sizing in Firefox.
			 * 2. Show the overflow in Edge and IE.
			 */

			hr {
			  box-sizing: content-box; /* 1 */
			  height: 0; /* 1 */
			  overflow: visible; /* 2 */
			}

			pre {
			  font-family: monospace, monospace; /* 1 */
			  font-size: 1em; /* 2 */
			}

			/* Text-level semantics
			   ========================================================================== */

			/**
			 * Remove the gray background on active links in IE 10.
			 */

			a {
			  background-color: transparent;
			}

			/**
			 * 1. Remove the bottom border in Chrome 57-
			 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
			 */

			abbr[title] {
			  border-bottom: none; /* 1 */
			  text-decoration: underline; /* 2 */
			  text-decoration: underline dotted; /* 2 */
			}

			/**
			 * Add the correct font weight in Chrome, Edge, and Safari.
			 */

			b,
			strong {
			  font-weight: bolder;
			}

			code,
			kbd,
			samp {
			  font-family: monospace, monospace; /* 1 */
			  font-size: 1em; /* 2 */
			}

			/**
			 * Add the correct font size in all browsers.
			 */

			small {
			  font-size: 80%;
			}

			sub,
			sup {
			  font-size: 75%;
			  line-height: 0;
			  position: relative;
			  vertical-align: baseline;
			}

			sub {
			  bottom: -0.25em;
			}

			sup {
			  top: -0.5em;
			}

			/* Embedded content
			   ========================================================================== */

			/**
			 * Remove the border on images inside links in IE 10.
			 */

			img {
			  border-style: none;
			}

			/* Forms
			   ========================================================================== */

			/**
			 * 1. Change the font styles in all browsers.
			 * 2. Remove the margin in Firefox and Safari.
			 */

			button,
			input,
			optgroup,
			select,
			textarea {
			  font-family: inherit; /* 1 */
			  font-size: 100%; /* 1 */
			  line-height: 1.15; /* 1 */
			  margin: 0; /* 2 */
			}

			/**
			 * Show the overflow in IE.
			 * 1. Show the overflow in Edge.
			 */

			button,
			input { /* 1 */
			  overflow: visible;
			}

			/**
			 * Remove the inheritance of text transform in Edge, Firefox, and IE.
			 * 1. Remove the inheritance of text transform in Firefox.
			 */

			button,
			select { /* 1 */
			  text-transform: none;
			}

			/**
			 * Correct the inability to style clickable types in iOS and Safari.
			 */

			button,
			[type="button"],
			[type="reset"],
			[type="submit"] {
			  -webkit-appearance: button;
			}

			/**
			 * Remove the inner border and padding in Firefox.
			 */

			button::-moz-focus-inner,
			[type="button"]::-moz-focus-inner,
			[type="reset"]::-moz-focus-inner,
			[type="submit"]::-moz-focus-inner {
			  border-style: none;
			  padding: 0;
			}

			/**
			 * Restore the focus styles unset by the previous rule.
			 */

			button:-moz-focusring,
			[type="button"]:-moz-focusring,
			[type="reset"]:-moz-focusring,
			[type="submit"]:-moz-focusring {
			  outline: 1px dotted ButtonText;
			}

			/**
			 * Correct the padding in Firefox.
			 */

			fieldset {
			  padding: 0.35em 0.75em 0.625em;
			}

			legend {
			  box-sizing: border-box; /* 1 */
			  color: inherit; /* 2 */
			  display: table; /* 1 */
			  max-width: 100%; /* 1 */
			  padding: 0; /* 3 */
			  white-space: normal; /* 1 */
			}

			/**
			 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
			 */

			progress {
			  vertical-align: baseline;
			}

			/**
			 * Remove the default vertical scrollbar in IE 10+.
			 */

			textarea {
			  overflow: auto;
			}

			/**
			 * 1. Add the correct box sizing in IE 10.
			 * 2. Remove the padding in IE 10.
			 */

			[type="checkbox"],
			[type="radio"] {
			  box-sizing: border-box; /* 1 */
			  padding: 0; /* 2 */
			}

			/**
			 * Correct the cursor style of increment and decrement buttons in Chrome.
			 */

			[type="number"]::-webkit-inner-spin-button,
			[type="number"]::-webkit-outer-spin-button {
			  height: auto;
			}

			/**
			 * 1. Correct the odd appearance in Chrome and Safari.
			 * 2. Correct the outline style in Safari.
			 */

			[type="search"] {
			  -webkit-appearance: textfield; /* 1 */
			  outline-offset: -2px; /* 2 */
			}

			/**
			 * Remove the inner padding in Chrome and Safari on macOS.
			 */

			[type="search"]::-webkit-search-decoration {
			  -webkit-appearance: none;
			}

			::-webkit-file-upload-button {
			  -webkit-appearance: button; /* 1 */
			  font: inherit; /* 2 */
			}

			/* Interactive
			   ========================================================================== */

			/*
			 * Add the correct display in Edge, IE 10+, and Firefox.
			 */

			details {
			  display: block;
			}

			/*
			 * Add the correct display in all browsers.
			 */

			summary {
			  display: list-item;
			}

			/* Misc
			   ========================================================================== */

			/**
			 * Add the correct display in IE 10+.
			 */

			template {
			  display: none;
			}

			/**
			 * Add the correct display in IE 10.
			 */

			[hidden] {
			  display: none;
			}

	    </style>