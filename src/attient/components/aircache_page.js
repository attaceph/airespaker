/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_aircache_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
                 --- oOo ---
                  AIR Cache
===============================================
`;

const AIRCachePage = {
  template: `<div class="aircache-page"><div class="aircache-page-inner">{{ aircache_page_text }}
    
<br/><input v-show="token != '' && !username_fixed" type="button" class="aircache-button-2" @click="doDashboard" value="Dashboard" /><input v-show="token == '' && !username_fixed" type="button" class="aircache-button-2" @click="doHome" value="Home" /><br/>

<div v-show="username_fixed"><br/>- Username ----------|_|-----------------------<br/>
<input type="text" class="aircache-text" v-model="username" readonly="yes" />
<br/>-----------------------------------------------<br/></div>
<div v-show="!username_fixed"><br/>- Username ----------|_|-----------------------<br/>
<input type="text" class="aircache-text" v-model="username" />
<br/>-----------------------------------------------<br/></div>

<br/>- Query -------------|_|-----------------------<br/>
<textarea class="aircache-text" v-model="code" style="height: 200px !important;"></textarea>&nbsp;<input type="button" class="aircache-button" @click="doFilter" value="Enter" />&nbsp;<input type="button" class="aircache-button" @click="doCopyURI" value="C" />&nbsp;<input type="button" class="aircache-button" @click="doCopyShotURI" value="S" />
<br/>-----------------------------------------------<br/>

<div v-show="token != ''"><br/>- Cache Option ------|_|-----------------------<br/>
<select class="aircache-text" v-model="cache"><option value="update-cache">New AI Query & Update Cache</option><option value="query-only">New AI Query If Not In Cache</option></select>
<br/>-----------------------------------------------<br/></div>

<div v-show="message != ''" class="aircache-result"><br/>- Results -----------|_|-----------------------<br/>
{{ message }}<br/>-----------------------------------------------<br/><br/></div>

<div class="aircache-air-list" v-show="air_list_ai_show == 'yes'">
  <div class="aircache-air-list-pagelist" v-show="air_list_ai_show == 'yes'">
<input type="button" class="aircache-button-2" value="&lt;&lt;" v-on:click="doAIRListBack" /> &nbsp; [ {{ air_list_ai_page_no }} ] &nbsp; <input type="button" class="aircache-button-2" value="&gt;&gt;" v-on:click="doAIRListNext" />
  </div>
  <div :class="item.full ? 'aircache-air-list-item aircache-air-list-item-full' : 'aircache-air-list-item  aircache-air-list-item-half'" v-for="item in air_list_ai">
  <div class="aircache-air-list-item-toolbar"><input type="button" :class="item.full ? 'aircache-button' : 'aircache-button-2'" value="&lt;|" v-on:click="doAIRListItemTurnOff(item)" />&nbsp;<input type="button" :class="item.full ? 'aircache-button-2' : 'aircache-button'" value="|&gt;" v-on:click="doAIRListItemTurnOn(item)" />&nbsp;[ {{ item.no }} : {{ item.code }} ]&nbsp;<input type="button" class="aircache-button" value="C" v-on:click="doCopyAIR(item)" style="margin-right: 5px; margin-bottom: 5px;" />&nbsp;<input v-show="token != ''" type="button" class="aircache-button" value="U" v-on:click="doUpdateAIR(item)" style="margin-right: 5px; margin-bottom: 5px;" /><input type="button" class="aircache-button-2" :value="item.ai_name" v-on:click="doFilter()" style="margin-right: 10px; margin-bottom: 5px;" /><input v-for="part in item.tags" type="button" class="aircache-button-2" :value="part" v-on:click="doFilter()" style="margin-right: 10px; margin-bottom: 5px;" />
  </div>
  <div class="aircache-air-list-item-text" v-html="item.reply">
  </div>
  </div>
</div>
  </div></div>
`,
  emits: [ 'go_page', 'set_token' ],
  data() {
    return {
      aircache_page_text: gv_aircache_page_text,
      token: '',
      code: '',
      login: '',
      cache: 'query-only',
      username: 'airespaker',
      username_fixed: false,
      message: '',
      fullable: false,
      air_list_ai: [],
      air_list_ai_slug: '',
      air_list_ai_tag: '',
      air_list_ai_show: 'no',
      air_list_ai_page_no: 1,
      air_list_ai_page_size: 5
    };
  },
  methods: {
    doCopyURI() {
      let uri = 'https://airespaker.is-best.net/c/' + this.username + '/?q=' + encodeURIComponent(this.code);
      navigator.clipboard.writeText(uri);      
    },
    doCopyShotURI() {
      let uri = 'https://airespaker.is-best.net/c/' + this.username + '/?q=' + encodeURIComponent(this.code);
      let uri2 = 'https://airespaker.is-best.net/proxy/screenshot.php?uri=' + encodeURIComponent(uri);
      navigator.clipboard.writeText(uri2);      
    },
    setUsername( username, fetching = true ) {
      this.username = username;
      this.code = go_aircache_default_query;
      this.username_fixed = true;
      if (fetching) {
        this.doFilter();      
      }
    },
    setQuery( query ) {
      this.code = query;
      this.fullable = true;
      this.doFilter();
    },
    doCopyAIR( item ) {
      let reply = item['raw_reply'];
      navigator.clipboard.writeText(reply);
    },
    doAIRListItemTurnOn( item ) {
      item['full'] = true;
    },
    doAIRListItemTurnOff( item ) {
      item['full'] = false;
    },
    doUpdateAIR( item ) {
      let v_query = item.raw_reply;
      let v_tags = item.tags_raw;
      v_tags = prompt('Enter tags: ', v_tags);
      if ( v_tags + '' === 'undefined' ) {
        v_tags = '';
      }
      let v_this = this;
      let ai = 'Other AIs';
      let machine = 'others';
      v_this.message = "\n" + 'Saving AI response from [ ' + ai + ' ] ...' + "\n";
      gj_text_post( '/airespaker/?method=take', {'token': this.token, 'machine': machine, 'query': v_query, 'tags': v_tags}, 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          v_this.message = "\n" + 'AI response from [ ' + ai + ' ] has been saved ...' + "\n";
        } else if ( text.indexOf('Error:') >= 0) {
          let msg = text.substring(6).trim();
          v_this.message = "\n" + msg + "\n";
        } else {
          v_this.message = "\n" + 'Failed to save AI response! ' + "\n";
        }
      });    
    },
    doAIRListBack() {
      this.air_list_ai_page_no--;
      if ( this.air_list_ai_page_no < 1 ) {
        this.air_list_ai_page_no = 1;
      }
      this.doFilter();
    },
    doAIRListNext() {
      this.air_list_ai_page_no++;
      this.doFilter();
    },
    doPrepare(token, login) {
      this.cache = 'query-only';
      this.fullable = false;
      this.login = login;
      this.username = 'airespaker';
      this.code = go_aircache_default_query;
      //this.username_fixed = false;
      this.token = token;
      let v_this = this;
      this.ais_list = [];
      this.air_list_ai = [];
      this.air_list_ai_show = 'no';
      this.air_list_ai_page_no = 1;
      this.air_list_ai_page_size = 5;
    },
    doFilter() {
      let v_this = this;
      let v_page_no = this.air_list_ai_page_no;
      let v_page_size = this.air_list_ai_page_size;
      this.air_list_ai = [];
      this.air_list_ai_show = 'no';
      this.message = "\n" + 'Taking AI response from AIRCache or directly from AI ...' + "\n";
      gj_text_post( '/airespaker/?method=aircache', { 'page_no': v_page_no, 'page_size': v_page_size,  'code': this.code, 'username': this.username, 'token': this.token, 'cache': this.cache }, 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          let data = text.substring(8).trim();
          let lines = data.split("\n");
          let list = [];
          for ( var i = 1; i < lines.length; i++ ) {
            let ln = lines[i];
            let fields = ln.split("\t");
            if ( fields.length !== 7 ) {
              continue;
            }
            let id = fields[0];
            let query = gj_unescape(fields[1]);
            let reply = gj_unescape(fields[2]);
            let raw_reply = reply + '';
            reply = reply.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
            reply = gj_md2html( reply );
            let no = ( v_page_no - 1 ) * v_page_size + i;
            let ai_slug = gj_unescape(fields[3]);
            let ai_name = gj_unescape(fields[4]);
            let tags = [];
            if (query !== '_') {
              tags.push(query);
            }
            let parts = gj_unescape(fields[5]).split(',');
            for (var j = 0; j < parts.length; j++) {
              let pt = parts[j].trim();
              if (pt === '') continue;
              tags.push(pt);
            }
            let code = fields[6].trim();
            let item = { 'tags': tags, 'tags_raw': fields[5], 'code': code, 'raw_reply': raw_reply, 'full': v_this.fullable, 'no': no, 'id': id, 'query': query, 'reply': reply, 'ai_slug': ai_slug, 'ai_name': ai_name };
            list.push( item );
          }
          v_this.air_list_ai = list;
          v_this.air_list_ai_show = 'yes';
          v_this.message = '';
        }
      });
    },
    doDashboard() {
      this.$emit( 'go_page', 'dashboard' );
    },
    doHome() {
      this.$emit( 'go_page', 'home' );
    }
  }
};
