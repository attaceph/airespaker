/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_savecache_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
                 --- oOo ---
                 Build Cache
===============================================
`;

const SaveCachePage = {
  template: `<div class="aircache-page"><div class="aircache-page-inner">{{ savecache_page_text }}
    
<br/><input v-show="token != ''" type="button" class="aircache-button-2" @click="doDashboard" value="Dashboard" /><br/>

<br/>- Query -------------|_|-----------------------<br/>
<textarea class="aircache-text" v-model="query" style="height: 200px !important;"></textarea>
<br/>-----------------------------------------------<br/>

<br/>- Reply -------------|_|-----------------------<br/>
<textarea class="aircache-text" v-model="reply" style="height: 200px !important;"></textarea>&nbsp;<input type="button" class="aircache-button" @click="doSave" value="Save" />
<br/>-----------------------------------------------<br/>

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
      savecache_page_text: gv_savecache_page_text,
      token: '',
      username: 'airespaker',
      message: '',
      fullable: false,
      query: '',
      reply: '',
      air_list_ai: [],
      air_list_ai_slug: '',
      air_list_ai_tag: '',
      air_list_ai_show: 'no',
      air_list_ai_page_no: 1,
      air_list_ai_page_size: 5
    };
  },
  methods: {
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
    doSave() {
      let ai = 'Other AIs';
      let machine = 'others';
      let nmachine = prompt( "Enter AI [ 'google-ai-search', 'bing-copilot-search', 'chatgpt', 'others' ]:", machine );      
      if (nmachine == 'google-ai-search') {
        ai = 'Google AI Search';
        machine = nmachine;
      } else if (nmachine == 'bing-copilot-search') {
        ai = 'Bing Copilot Search';
        machine = nmachine;
      } else if (nmachine == 'chatgpt') {
        ai = 'ChatGPT';
        machine = nmachine;
      } else {
        ai = 'Other AIs';
        machine = 'others';
      }
      let v_query = this.reply;
      v_query = "```aiq\n" + this.query + "\n```\n" + v_query;
      let v_tags = 'pattern';
      let v_this = this;
      v_this.message = "\n" + 'Saving AI response from [ ' + ai + ' ] ...' + "\n";
      gj_text_post( '/airespaker/?method=take', {'token': this.token, 'machine': machine, 'query': v_query, 'tags': v_tags}, 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          v_this.message = "\n" + 'AI response from [ ' + ai + ' ] has been saved ...' + "\n";
          v_this.doFilter();
          v_this.query = '';
          v_this.reply = '';
        } else if ( text.indexOf('Error:') >= 0) {
          let msg = text.substring(6).trim();
          v_this.message = "\n" + msg + "\n";
        } else {
          v_this.message = "\n" + 'Failed to save AI response! ' + "\n";
        }
      });        
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
      this.fullable = false;
      this.username = 'airespaker';
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
      gj_text_post( '/airespaker/?method=aircache', { 'page_no': v_page_no, 'page_size': v_page_size,  'code': this.query, 'username': this.username, 'token': this.token, 'cache': 'query-only' }, 'n', function( text ) {
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
    }
  }
};
