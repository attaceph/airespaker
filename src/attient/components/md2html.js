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
  let idx = ln.indexOf('[', start);
  while ( idx >= 0 ) {
    let idx_2 = ln.indexOf(']', idx );
    if ( idx_2 < 0 ) {
      nln += ln.substring( start, idx + 1 );
      start = idx + 1;
      idx = ln.indexOf('[', start);
      continue;
    }
    let idx_3 = ln.indexOf('(', idx_2 );
    if ( idx_3 < 0 ) {
      nln += ln.substring( start, idx_2 + 1 );
      start = idx_2 + 1;
      idx = ln.indexOf('[', start);
      continue;
    }
    let idx_4 = ln.indexOf(')', idx_3 );
    if ( idx_4 < 0 ) {
      nln += ln.substring( start, idx_3 + 1 );
      start = idx_3 + 1;
      idx = ln.indexOf('[', start);
      continue;
    }
    let title = ln.substring( idx + 1, idx_2 );
    let url = ln.substring( idx_3 + 1, idx_4 ).trim();
    if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
      let num = parseInt(title);
      if ( title.trim() == num + '' ) {
        ret['lnks'][num+''] = url;      
      }
      nln += ln.substring( start, idx ) + '<a class="md-link" target="_blank" href="' + url + '">' + title + '</a>';
      start = idx_4 + 1;
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
    ln = '<div class="md_bl">' + gj_md2html_line_more(ln.substring(idx + 2), lnks) + '</div>';
    return ln;
  }
  return gj_md2html_line_more(ln, lnks);
}

function gj_md2html_line_more( ln, lnks ) {
  let nln = '';
  let start = 0;
  let idx = ln.indexOf('[', start);
  while ( idx >= 0 ) {
    let idx_2 = ln.indexOf(']', idx );
    if ( idx_2 < 0 ) {
      nln += ln.substring( start, idx + 1 );
      start = idx + 1;
      idx = ln.indexOf('[', start);
      continue;
    }
    let idx_3 = ln.indexOf('(', idx_2 );
    if ( idx_3 < 0 ) {
      nln += ln.substring( start, idx_2 + 1 );
      start = idx_2 + 1;
      idx = ln.indexOf('[', start);
      continue;
    }
    let idx_4 = ln.indexOf(')', idx_3 );
    if ( idx_4 < 0 ) {
      nln += ln.substring( start, idx_3 + 1 );
      start = idx_3 + 1;
      idx = ln.indexOf('[', start);
      continue;
    }
    let title = ln.substring( idx + 1, idx_2 );
    let url = ln.substring( idx_3 + 1, idx_4 ).trim();
    if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
      nln += ln.substring( start, idx ) + '<a class="md-link" target="_blank" href="' + url + '">' + title + '</a>';
      start = idx_4 + 1;
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

