/* stylelint-disable selector-pseudo-element-colon-notation */
/* stylelint-disable font-family-no-missing-generic-family-keyword */
@font-face {
  font-weight: normal;
  font-family: '<%= fontName %>';
  font-style: normal;
  font-display: auto;
  src: url('https://还没想好/<%= cssClass %>.woff') format('woff'),
    url('https://还没想好/<%= cssClass %>.ttf') format('truetype');
}

.yyn-icon {
  position: relative;
  display: inline-block;
  font: normal normal normal 14px/1 '<%= fontName %>';
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  &::before {
    display: inline-block;
  }
}

<% _.each(glyphs, function(glyph) { %><% if (glyph.originalFileName) { %>.yyn-icon-<%= glyph.fileName %>::before {
  content: '\<%= glyph.codePoint %>';
}

<% } %><% }); %>
