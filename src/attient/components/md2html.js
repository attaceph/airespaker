/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

function gj_md2html( md ) {
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
  return html;
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
    let url = ln.substring( idx_3 + 1, idx_4 );
    let num = parseInt(title);
    if ( title.trim() == num + '' ) {
      ret['lnks'][num+''] = url;      
    }
    nln += ln.substring( start, idx ) + '<a class="md-link" target="_blank" href="' + url + '">' + title + '</a>';
    start = idx_4 + 1;
    idx = ln.indexOf('[', start);
  }
  nln += ln.substring( start );
  ret['ln'] = nln;
  return ret;
}

function gj_md2html_line( ln, lnks ) {
  let idx = ln.indexOf('## ');
  let idx_2 = ln.trim().indexOf('## ');
  if ( idx >= 0 && idx_2 <= idx ) {
    ln = '<div class="md_h2">' + gj_md2html_line_more(ln.substring(3), lnks) + '</div>';
    return ln;
  }
  idx = ln.indexOf('* ');
  idx_2 = ln.trim().indexOf('* ');
  if ( idx >= 0 && idx_2 <= idx ) {
    ln = '<div class="md_bl">' + gj_md2html_line_more(ln.substring(2), lnks) + '</div>';
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
    let url = ln.substring( idx_3 + 1, idx_4 );
    nln += ln.substring( start, idx ) + '<a class="md-link" target="_blank" href="' + url + '">' + title + '</a>';
    start = idx_4 + 1;
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
  return nln;
}
