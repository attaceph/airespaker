/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

function gj_md2html( md ) {
  md = gj_md2html_latex_doc( md );
  md = gj_md2html_code_perl( md );
  md = gj_md2html_code_python( md );
  md = gj_md2html_code_php( md );
  md = gj_md2html_code_csharp( md );
  md = gj_md2html_code_rust( md );
  md = gj_md2html_code_ruby( md );
  md = gj_md2html_code_cmd( md );
  md = gj_md2html_code_r( md );
  md = gj_md2html_code_cpp( md );
  md = gj_md2html_code_ada( md );
  md = gj_md2html_code_jsp( md );
  md = gj_md2html_code_css( md );
  md = gj_md2html_code_c( md );
  md = gj_md2html_code_bash( md );
  md = gj_md2html_code_zsh( md );
  md = gj_md2html_code_sh( md );
  md = gj_md2html_code_asm( md );
  md = gj_md2html_code_abnf( md );
  md = gj_md2html_code_json( md );
  md = gj_md2html_code_sql( md );
  md = gj_md2html_code_vue( md );
  md = gj_md2html_code_kotlin( md );
  md = gj_md2html_code_applescript( md );
  md = gj_md2html_code_osascript( md );
  md = gj_md2html_code_actionscript( md );
  md = gj_md2html_code_apacheconf( md );
  md = gj_md2html_code_apache( md );
  md = gj_md2html_code_javascript( md );
  md = gj_md2html_code_typescript( md );
  md = gj_md2html_code_arcade( md );
  md = gj_md2html_code_asciidoc( md );
  md = gj_md2html_code_adoc( md );
  md = gj_md2html_code_java( md );
  md = gj_md2html_code_jsx( md );
  md = gj_md2html_code_1c( md );
  md = gj_md2html_code_html( md );
  md = gj_md2html_code_xml( md );
  md = gj_md2html_code_xhtml( md );
  md = gj_md2html_code_rss( md );
  md = gj_md2html_code_atom( md );
  md = gj_md2html_code_xjb( md );
  md = gj_md2html_code_xsd( md );
  md = gj_md2html_code_xsl( md );
  md = gj_md2html_code_plist( md );
  md = gj_md2html_code_exec_svg( md );
  md = gj_md2html_code_svg( md );
  md = gj_md2html_code_aspectj( md );  
  md = gj_md2html_code_unknown( md );
  md = md.trim();
  let ret = gj_md2html_clnk( md );
  let fpos = ret['fpos'];
  let lnks = ret['lnks'];
  md = ret['html'];
  let html = '';
  let lines = md.split( "\n" );
  for ( var i = 0; i < lines.length; i++ ) {
    let ln = lines[i];
    if ( i == fpos ) {
      break;
    }
    if ( html != '' ) html += "\n";
    html += gj_md2html_line(ln, lnks);
  }
  html = gj_md2html_table( html );
  html = html.replaceAll('_._lt_._', '<').replaceAll('_._gt_._', '>').replaceAll('_._dl_._', '$').replaceAll('_._as_._', '*').replaceAll('_._sh_._', '#');
  return html;
}

function gj_md2html_latex_doc( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```ltx', start );
  while (idx >= 0) {
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      tag += src.substring( start, idx ) + gj_md2html_latex_2( src.substring(idx + 6, idx_2 ) );
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```ltx', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_python( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```python', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }  
    let idx_2 = src.indexOf('```', idx + 9);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 9;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'python' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-python">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```python', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_csharp( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```csharp', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 9);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 9;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'csharp' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-csharp">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```csharp', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_kotlin( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```kotlin', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 9);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 9;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'kotlin' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-kotlin">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```kotlin', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_bash( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```bash', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'bash' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-bash">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```bash', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_abnf( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```abnf', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'abnf' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-bash">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```abnf', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_sql( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```sql', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'sql' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-sql">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```sql', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_jsx( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```jsx', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'jsx' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-jsx">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```jsx', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_sh( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```sh', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    } 
    let idx_2 = src.indexOf('```', idx + 5);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 5;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'sh' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-sh">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```sh', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_1c( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```1c', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 5);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 5;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: '1c' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-1c">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```1c', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_zsh( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```zsh', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'zsh' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-zsh">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```zsh', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_vue( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```vue', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'html' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-vue">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```vue', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_jsp( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```jsp', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'jsp' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-jsp">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```jsp', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_cmd( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```cmd', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'powershell' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-cmd">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```cmd', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_c( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```c', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    } 
    let idx_2 = src.indexOf('```', idx + 4);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 4;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'c' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-c">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```c', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_r( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```r', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 4);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 4;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'r' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-r">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```r', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_cpp( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```cpp', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'cpp' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-c">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```cpp', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_php( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```php', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    } 
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'php' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-php">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('$', '_._dl_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```php', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_asm( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```asm', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'armasm' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-asm">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('$', '_._dl_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```asm', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_ada( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```ada', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'ada' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-ada">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('$', '_._dl_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```ada', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_java( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```java', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'java' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-java">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```java', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_json( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```json', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'json' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-json">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```json', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_perl( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```perl', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'perl' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-perl">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('$', '_._dl_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```perl', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_rust( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```rust', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'rust' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-rust">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```rust', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_ruby( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```ruby', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'ruby' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-ruby">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```ruby', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_html( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```html', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'html' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-html">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```html', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_javascript( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```javascript', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 13);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 13;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'javascript' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-javascript">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```javascript', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_asciidoc( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```asciidoc', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 11);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 11;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'asciidoc' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-asciidoc">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```asciidoc', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_adoc( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```adoc', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'asciidoc' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-adoc">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```adoc', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_aspectj( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```aspectj', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 10);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 10;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'aspectj' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-aspectj">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```aspectj', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_arcade( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```arcade', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 9);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 9;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'arcade' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-arcade">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```arcade', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_actionscript( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```actionscript', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 15);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 15;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'actionscript' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-actionscript">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```actionscript', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_apacheconf( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```apacheconf', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 13);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 13;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'apacheconf' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-apacheconf">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```apacheconf', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_apache( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```apache', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'apacheconf' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-apache">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```apache', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_typescript( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```typescript', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 13);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 13;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'typescript' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-typescript">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```typescript', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_applescript( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```applescript', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 14);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 14;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'applescript' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-applescript">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```applescript', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_osascript( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```osascript', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 12);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 12;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'applescript' }
      ).value + '';
      tag += src.substring( start, idx ) + '<pre><code class="language-osascript">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```osascript', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_css( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```css', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'css' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-css">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```css', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_xml( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```xml', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'xml' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-xml">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```xml', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_rss( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```rss', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'xml' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-rss">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```rss', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_xjb( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```xjb', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'xml' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-xjb">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```xjb', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_xsd( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```xsd', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'xml' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-xsd">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```xsd', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_xsl( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```xsl', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'xml' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-xsl">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```xsl', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_svg( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```svg', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 6);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 6;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'xml' }
      ).value;
      let svg_src = src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<').trim();
      if (svg_src.indexOf('<svg') < 0) {
        svg_src = '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">' + svg_src + '</svg>';
      }
      let svg_div = '<div class="language-exec-svg"><iframe frameborder="no" style="width: 100%; height: 100%;" sandbox="" src="data:text/html;charset=utf-8,' + encodeURIComponent(svg_src) + '"></iframe></div>';
      tag += src.substring( start, idx ) + svg_div + '<pre><code class="language-svg">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```svg', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_exec_svg( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```exec-svg', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 11);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 11;  
    } else {
      let svg_src = src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<').trim();
      if (svg_src.indexOf('<svg') < 0) {
        svg_src = '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">' + svg_src + '</svg>';
      }
      let svg_div = '<div class="language-exec-svg"><iframe frameborder="no" style="width: 100%; height: 100%;" sandbox="" src="data:text/html;charset=utf-8,' + encodeURIComponent(svg_src) + '"></iframe></div>';
      tag += src.substring( start, idx ) + svg_div;
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```exec-svg', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_plist( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```plist', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 8);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 8;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'xml' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-plist">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```plist', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_atom( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```atom', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 7);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 7;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'xml' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-atom">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```atom', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_xhtml( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```xhtml', start );
  while (idx >= 0) {
    let idx_t = src.indexOf("\n", idx);
    if (idx_t < 0 ) {
      idx_t = idx;
    } else {
      idx_t++;
    }
    let idx_2 = src.indexOf('```', idx + 8);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 8;  
    } else {
      const highlightedCode = hljs.highlight(
        src.substring(idx_t, idx_2 ).replaceAll('&gt;', '>').replaceAll('&lt;', '<'),
        { language: 'xml' }
      ).value;
      tag += src.substring( start, idx ) + '<pre><code class="language-xhtml">' + highlightedCode.replaceAll('<', '_._lt_._').replaceAll( '>', '_._gt_._').replaceAll('*', '_._as_._').replaceAll('#', '_._sh_._') + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```xhtml', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_code_unknown( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '```', start );
  while (idx >= 0) {
    let idx_b = src.indexOf("\n", idx + 3);
    if (idx_b < 0) {
      idx_b = idx + 3;
    } else {
      idx_b++;
    }
    let idx_2 = src.indexOf('```', idx_b);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx_b;  
    } else {
    /*
      const highlightedCode = hljs.highlight(
        src.substring(idx_b, idx_2 ),
        { language: 'auto' }
      ).value;
      */
      const highlightedCode = src.substring(idx_b, idx_2 );
      tag += src.substring( start, idx ) + '<pre><code class="language-unknown">' + highlightedCode + '</code></pre>';
      start = idx_2 + 3;
    }
    idx = src.indexOf( '```', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_nohtml( src ) {
  let tag = '';
  let start = 0;
  let idx = src.indexOf( '<', start );
  while (idx >= 0) {
    let idx_2 = src.indexOf('>', idx + 1);
    if (idx_2 < 0) {
      tag += src.substring( start, idx );
      start = idx + 1;  
    } else {
      tag += src.substring( start, idx );
      start = idx_2 + 1;
    }
    idx = src.indexOf( '<', start );
  }
  tag += src.substring(start);
  return tag;
}

function gj_md2html_table( md ) {
  let html = md;
  let table = [];
  let lines = md.split( "\n" );
  let in_table = false;
  let tbl_no = 0;
  for ( var i = 0; i < lines.length; i++ ) {
    let ln = lines[i];
    if (ln.indexOf('class="hljs-') >= 0) {
      in_table = false;
      table.push([0, 0]);
      continue;    
    }
    let fields = ln.split('|');
    if (fields.length < 2 && ln.indexOf('|') < 0) {
      in_table = false;
      table.push([0, 0]);
      continue;
    }
    if (in_table === false) {
      tbl_no++;
      in_table = true;
    }
    let sizes = [tbl_no, fields.length];
    for ( var j = 0; j < fields.length; j++ ) {
      sizes.push(gj_md2html_nohtml(fields[j]).length);
    }
    table.push(sizes);
  }
  let mark = 0;
  in_table = false;
  for ( var i = 0; i < lines.length; i++ ) {
    let sizes = table[i];
    if (sizes[0] === 0) {
      in_table = false;
      continue;
    }
    if (in_table === false) {
      mark = i;
      in_table = true;
      continue;
    }
    for (var j = 2; j < sizes.length; j++) {
      if (sizes[j] > table[mark][j]) {
        table[mark][j] = sizes[j];
      }
    }
  }
  html = '';
  in_table = false;
  mark = 0;
  for ( var i = 0; i < lines.length; i++ ) {
    if ( html != '' ) html += "\n";
    let ln = lines[i];
    let fields = ln.split('|');
    let sizes = table[i];
    if (sizes[0] === 0) {
      html += ln;
      in_table = false;
      continue;
    }
    if (in_table === false) {
      mark = i;
      in_table = true;
    }
    let nln = '|';
      for (var j = 0; j < fields.length; j++ ) {
        if (nln !== '|') nln += '|';
        nln += gj_md2html_pad(fields[j], table[mark][j+2], '&nbsp;');
      }
    html += nln;
  }  
  return html;
}

function gj_md2html_pad( src, size, c ) {
  let tag = src;
  for (var i = gj_md2html_nohtml(src).length; i < size; i++ ) {
    tag += c;
  }
  return tag;
}

function gj_md2html_clnk( md ) {
  let aret = {'html': '', 'lnks': {}, 'fpos': -1};
  let html = '';
  let lines = md.split( "\n" );
  for ( var i = 0; i < lines.length; i++ ) {
    let ln = lines[i];
    if ( html != '' ) html += "\n";
    let ret = gj_md2html_lnk_more( ln );
    html += ret['ln'];
    Object.entries(ret['lnks']).forEach(([key, value]) => {
      if (key + '' == '1') {
        aret['fpos'] = i;
      }
      aret['lnks'][key] = value;
    });
  }
  aret['html'] = html;
  return aret;
}

function gj_md2html_lnk_more( ln ) {
  let ret = { 'ln': '', 'lnks': {} };
  let nln = '';
  let start = 0;
  let start_2 = 0;
  let idx = ln.indexOf('[', start);
  while ( idx >= 0 ) {
    let title = '';
    let url = '';
    let idx_2 = ln.indexOf(']', idx );
    if ( idx_2 < 0 ) {
      nln += ln.substring( start, idx + 1 );
      start = idx + 1;
      idx = ln.indexOf('[', start);
      continue;
    }
    let idx_3 = ln.indexOf('(', idx_2 );
    if ( idx_3 < 0 ) {
      title = ln.substring( idx + 1, idx_2 );
      url = ln.substring( idx_2 + 1 ).trim();
      start_2 = idx_2 + 1;
    } else {
      let idx_4 = ln.indexOf(')', idx_3 );
      if ( idx_4 < 0 ) {
        start_2 = idx_3 + 1;
        title = ln.substring( idx + 1, idx_2 );
        url = ln.substring( idx_3 + 1 ).trim();
      } else {
        title = ln.substring( idx + 1, idx_2 );
        url = ln.substring( idx_3 + 1, idx_4 ).trim();
        start_2 = idx_4 + 1;
      }
    }
    if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
      let num = parseInt(title);
      if ( title.trim() == num + '' ) {
        ret['lnks'][num+''] = url;      
      }
      nln += ln.substring( start, idx ) + '<a class="md-link" target="_blank" href="' + url + '">' + title + '</a>';
      start = start_2;
      idx = ln.indexOf('[', start);
    } else {
       nln += ln.substring( start, idx + 1);
       start = idx + 1;
       idx = ln.indexOf('[', start);
    }
  }
  nln += ln.substring( start );
  ret['ln'] = nln;
  return ret;
}

function gj_md2html_line( ln, lnks ) {
  let idx = ln.indexOf('#### ');
  let idx_2 = ln.trim().indexOf('#### ');
  if ( idx >= 0 && idx_2 <= idx && idx_2 == 0 ) {
    ln = '<div class="md_h4">' + gj_md2html_line_more(ln.substring(5), lnks) + '</div>';
    return ln;
  }
  idx = ln.indexOf('### ');
  idx_2 = ln.trim().indexOf('### ');
  if ( idx >= 0 && idx_2 <= idx && idx_2 == 0 ) {
    ln = '<div class="md_h3">' + gj_md2html_line_more(ln.substring(4), lnks) + '</div>';
    return ln;
  }
  idx = ln.indexOf('## ');
  idx_2 = ln.trim().indexOf('## ');
  if ( idx >= 0 && idx_2 <= idx && idx_2 == 0 ) {
    ln = '<div class="md_h2">' + gj_md2html_line_more(ln.substring(3), lnks) + '</div>';
    return ln;
  }
  idx = ln.indexOf('* ');
  idx_2 = ln.trim().indexOf('* ');
  if ( idx >= 0 && idx_2 <= idx && idx_2 == 0 ) {
    let lms = idx * 5;
    ln = '<div style="margin-left: ' + lms + 'px" class="md_bl">' + gj_md2html_line_more(ln.substring(idx + 2), lnks) + '</div>';
    return ln;
  }
  return gj_md2html_line_more(ln, lnks);
}

function gj_md2html_line_more( ln, lnks ) {
  let nln = '';
  let start = 0;
  let start_2 = 0;
  let idx = ln.indexOf('[', start);
  while ( idx >= 0 ) {
    let title = '';
    let url = '';
    let idx_2 = ln.indexOf(']', idx );
    if ( idx_2 < 0 ) {
      nln += ln.substring( start, idx + 1 );
      start = idx + 1;
      idx = ln.indexOf('[', start);
      continue;
    }
    let idx_3 = ln.indexOf('(', idx_2 );
    if ( idx_3 < 0 ) {
      title = ln.substring( idx + 1, idx_2 );
      url = ln.substring( idx_2 + 1 ).trim();
      start_2 = idx_2 + 1;
    } else {
      let idx_4 = ln.indexOf(')', idx_3 );
      if ( idx_4 < 0 ) {
        start_2 = idx_3 + 1;
        title = ln.substring( idx + 1, idx_2 );
        url = ln.substring( idx_3 + 1 ).trim();
      } else {
        title = ln.substring( idx + 1, idx_2 );
        url = ln.substring( idx_3 + 1, idx_4 ).trim();
        start_2 = idx_4 + 1;
      }
    }
    if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
      nln += ln.substring( start, idx ) + '<a class="md-link" target="_blank" href="' + url + '">' + title + '</a>';
      start = start_2;
    } else {
      nln += ln.substring( start, idx + 1 );
      start = idx + 1;
    }
    idx = ln.indexOf('[', start);
  }
  nln += ln.substring( start );
  let idx_a = nln.lastIndexOf( '[' );
  if ( idx_a >= 0 ) {
    let idx_b = nln.indexOf( ']', idx_a + 1 );
    if ( idx_b >= 0 ) {
      let tmp = nln.substring(idx_a + 1, idx_b);
      let fields = tmp.split(',');
      let ntmp = '';
      for ( var i = 0; i < fields.length; i++ ) {
        let n = fields[i].trim();
        if ( lnks[n] !== undefined ) {
          if (ntmp != '') ntmp += ' , ';
          ntmp += '<a class="md-link" target="_blank" href="' + lnks[n] + '">' + n + '</a>';
        } else {
          if (ntmp != '') ntmp += ' , ';
          ntmp += n;        
        }
      }
      ntmp = '[ ' + ntmp + ' ]';
      nln = nln.substring(0, idx_a) + ntmp + nln.substring(idx_b + 1);
    }
  }
  return gj_md2html_line_more_2( nln );
}

function gj_md2html_line_more_2( ln ) {
  let nln = '';
  let start = 0;
  let idx = ln.indexOf('**', start);
  while ( idx >= 0 ) {
    let idx_2 = ln.indexOf('**', idx + 2 );
    if ( idx_2 < 0 ) {
      nln += ln.substring( start, idx + 2 );
      start = idx + 2;
      idx = ln.indexOf('**', start);
      continue;
    }
    nln += ln.substring(start, idx ) + '<b>' + ln.substring(idx + 2, idx_2) + '</b>';
    start = idx_2 + 2;
    idx = ln.indexOf('**', start);
  }
  nln += ln.substring(start);
  return gj_md2html_line_more_3( nln );
}

function gj_md2html_line_more_3( ln ) {
  let nln = '';
  let start = 0;
  let idx = ln.indexOf('*', start);
  while ( idx >= 0 ) {
    let idx_2 = ln.indexOf('*', idx + 1 );
    if ( idx_2 < 0 ) {
      nln += ln.substring( start, idx + 1 );
      start = idx + 1;
      idx = ln.indexOf('*', start);
      continue;
    }
    nln += ln.substring(start, idx ) + '<b>' + ln.substring(idx + 1, idx_2) + '</b>';
    start = idx_2 + 1;
    idx = ln.indexOf('*', start);
  }
  nln += ln.substring(start);
  return gj_md2html_line_more_4( nln );
}

function gj_md2html_latex( text ) {
  try {
    text = text.replaceAll("\\text", "\\textrm");
    var generator = new latexjs.HtmlGenerator({ hyphenate: false })
    generator = latexjs.parse(text, { generator: generator })
    document.head.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js/dist/"))
    const tempContainer = document.createElement('div');
    tempContainer.appendChild(generator.domFragment().cloneNode(true));
    const htmlString = tempContainer.innerHTML;
    return htmlString;
  } catch (e) {
    return e + '';
  }
}

function gj_md2html_latex_2( text ) {
  try {
    var generator = new latexjs.HtmlGenerator({ hyphenate: false })
    generator = latexjs.parse(text, { generator: generator })
    document.head.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js/dist/"))
    const tempContainer = document.createElement('div');
    tempContainer.appendChild(generator.domFragment().cloneNode(true));
    const htmlString = tempContainer.innerHTML;
    return htmlString;
  } catch (e) {
    return e + '';
  }
}

function gj_md2html_line_more_4( ln ) {
  let nln = '';
  let start = 0;
  let idx = ln.indexOf('$$', start);
  while ( idx >= 0 ) {
    let idx_2 = ln.indexOf('$$', idx + 2 );
    if ( idx_2 < 0 ) {
      nln += ln.substring( start, idx + 2 );
      start = idx + 2;
      idx = ln.indexOf('$$', start);
      continue;
    }
    nln += ln.substring(start, idx ) + gj_md2html_latex( ln.substring(idx + 2, idx_2) );
    start = idx_2 + 2;
    idx = ln.indexOf('$$', start);
  }
  nln += ln.substring(start);
  return gj_md2html_line_more_5( nln );
}

function gj_md2html_line_more_5( ln ) {
  let nln = '';
  let start = 0;
  let idx = ln.indexOf('$', start);
  while ( idx >= 0 ) {
    let idx_2 = ln.indexOf('$', idx + 1 );
    if ( idx_2 < 0 ) {
      nln += ln.substring( start, idx + 1 );
      start = idx + 2;
      idx = ln.indexOf('$', start);
      continue;
    }
    nln += ln.substring(start, idx ) + gj_md2html_latex( ln.substring(idx + 1, idx_2) );
    start = idx_2 + 1;
    idx = ln.indexOf('$', start);
  }
  nln += ln.substring(start);
  return nln;
}

