/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_dashboard_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
                 --- oOo ---
                  Dashboard
===============================================

`;

const DashboardPage = {
  template: `<div class="dashboard-page"><div class="dashboard-page-inner">{{ dashboard_page_text }}
    
<input type="button" class="dashboard-button-2" @click="doLogout" value="Logout" /> &nbsp; <input type="button" class="dashboard-button-2" @click="doProfile" value="Profile" /> &nbsp; <input type="button" class="dashboard-button-2" @click="doTake" value="Take AIR" />

<br/><br/><br/>-Filtered by code ---|_|-----------------------<br/>
<input type="text" class="dashboard-text" v-model="code" />&nbsp;<input type="button" class="dashboard-button" @click="doFilterByAI('', '')" value="Enter" />
<br/>-----------------------------------------------<br/>

<br/><br/>---------------------|_|-----------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filtered by AI<br/>-----------------------------------------------<br/>
<div class="dashboard-air-list dashboard-tag-list"><div :class="all_ais_full ? 'dashboard-air-list-item dashboard-air-list-item-full' : 'dashboard-air-list-item  dashboard-air-list-item-half'">
  <div class="dashboard-air-list-item-toolbar" style="margin-bottom: 10px;"><input type="button" :class="all_ais_full ? 'dashboard-button' : 'dashboard-button-2'" value="&lt;|" v-on:click="all_ais_full = false;" />&nbsp;<input type="button" :class="all_ais_full ? 'dashboard-button-2' : 'dashboard-button'" value="|&gt;" v-on:click="all_ais_full = true;" /></div>
<input v-for="item in ais_list" type="button" class="dashboard-button-2" :value="item.name" v-on:click="doFilterByAI(item.slug)" style="margin-right: 10px; margin-bottom: 5px;" />  
</div></div>

<br/>---------------------|_|-----------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filtered by Tag<br/>-----------------------------------------------<br/>
<div class="dashboard-air-list dashboard-tag-list"><div :class="all_tags_full ? 'dashboard-air-list-item dashboard-air-list-item-full' : 'dashboard-air-list-item  dashboard-air-list-item-half'">
  <div class="dashboard-air-list-item-toolbar" style="margin-bottom: 10px;"><input type="button" :class="all_tags_full ? 'dashboard-button' : 'dashboard-button-2'" value="&lt;|" v-on:click="all_tags_full = false;" />&nbsp;<input type="button" :class="all_tags_full ? 'dashboard-button-2' : 'dashboard-button'" value="|&gt;" v-on:click="all_tags_full = true;" /></div>
<input v-for="item in all_tags" type="button" class="dashboard-button-2" :value="item" v-on:click="doFilterByAI('', item)" style="margin-right: 10px; margin-bottom: 5px;" />
</div></div>
<br/><br/>

<div class="dashboard-air-list" v-show="air_list_ai_show == 'yes'">
  <div class="dashboard-air-list-pagelist" v-show="air_list_ai_show == 'yes'">
<input type="button" class="dashboard-button-2" value="&lt;&lt;" v-on:click="doAIRListBack" /> &nbsp; [ {{ air_list_ai_page_no }} ] &nbsp; <input type="button" class="dashboard-button-2" value="&gt;&gt;" v-on:click="doAIRListNext" />
  </div>
  <div :class="item.full ? 'dashboard-air-list-item dashboard-air-list-item-full' : 'dashboard-air-list-item  dashboard-air-list-item-half'" v-for="item in air_list_ai">
  <div class="dashboard-air-list-item-toolbar"><input type="button" :class="item.full ? 'dashboard-button' : 'dashboard-button-2'" value="&lt;|" v-on:click="doAIRListItemTurnOff(item)" />&nbsp;<input type="button" :class="item.full ? 'dashboard-button-2' : 'dashboard-button'" value="|&gt;" v-on:click="doAIRListItemTurnOn(item)" />&nbsp;[ {{ item.no }} : {{ item.code }} ]&nbsp;<input type="button" class="dashboard-button" value="X" v-on:click="doDeleteAIR(item.code)" style="margin-right: 5px; margin-bottom: 5px;" /><input type="button" class="dashboard-button" value="C" v-on:click="doCopyAIR(item)" style="margin-right: 5px; margin-bottom: 5px;" /><input type="button" class="dashboard-button-2" :value="item.ai_name" v-on:click="doFilterByAI(item.ai_slug)" style="margin-right: 10px; margin-bottom: 5px;" /><input v-for="part in item.tags" type="button" class="dashboard-button-2" :value="part" v-on:click="doFilterByAI('', part)" style="margin-right: 10px; margin-bottom: 5px;" />
  </div>
  <div class="dashboard-air-list-item-text" v-html="item.reply">
  </div>
  </div>
</div>
  </div></div>
`,
  emits: [ 'go_page', 'set_token' ],
  data() {
    return {
      dashboard_page_text: gv_dashboard_page_text,
      token: '',
      code: '',
      ais_list: [],
      air_list_ai: [],
      air_list_ai_slug: '',
      air_list_ai_tag: '',
      air_list_ai_show: 'no',
      air_list_ai_page_no: 1,
      air_list_ai_page_size: 5,
      all_tags: [],
      all_tags_show: 'no',
      all_tags_full: false,
      all_ais_full: false
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
    doAIRListBack() {
      this.air_list_ai_page_no--;
      if ( this.air_list_ai_page_no < 1 ) {
        this.air_list_ai_page_no = 1;
      }
      this.doFilterByAI(this.air_list_ai_slug, this.air_list_ai_tag);
    },
    doAIRListNext() {
      this.air_list_ai_page_no++;
      this.doFilterByAI(this.air_list_ai_slug, this.air_list_ai_tag);
    },
    doPrepare(token) {
      this.token = token;
      let v_this = this;
      this.ais_list = [];
      this.air_list_ai = [];
      this.air_list_ai_show = 'no';
      this.air_list_ai_page_no = 1;
      this.air_list_ai_page_size = 5;
      this.all_tags = [];
      this.all_tags_show = 'no';
      this.all_tags_full = false;
      this.all_ais_full = false;
      gj_text_get( '/airespaker/?method=ais_list&token=' + encodeURIComponent(this.token), 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          let data = text.substring(8).trim();
          let lines = data.split("\n");
          let list = [];
          for ( var i = 1; i < lines.length; i++ ) {
            let ln = lines[i];
            let fields = ln.split("\t");
            if ( fields.length !== 3 ) continue;
            let uri = fields[2];
            let guide_video = '';
            if ( uri.indexOf( 'youtube.com' ) >= 0 ) {
              let idx = uri.indexOf('v=');
              if ( idx >= 0 ) {
                uri = uri.substring( idx + 2);
              }
              idx = uri.indexOf('&');
              if ( idx >= 0 ) {
                uri = uri.substring( 0, idx );
              }
              guide_video = uri;
            }
            let item = { 'slug': fields[0], 'name': fields[1], 'guide_url': fields[2], 'guide_video': guide_video };
            list.push( item );
          }
          v_this.ais_list = list;
        }
      });      
      gj_text_get( '/airespaker/?method=all_tags&token=' + encodeURIComponent(this.token), 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          let data = text.substring(8).trim();
          let lines = data.split(",");
          let list = [];
          for ( var i = 0; i < lines.length; i++ ) {
            let ln = lines[i].trim();
            if (ln === '') continue;
            list.push(ln);
          }
          v_this.all_tags = list;
          v_this.all_tags_show = 'yes';
        }
      });      
    },
    doFilterByAI(ai, tag = '') {
      this.air_list_ai_slug = ai;
      this.air_list_ai_tag = tag;
      let v_this = this;
      let v_page_no = this.air_list_ai_page_no;
      let v_page_size = this.air_list_ai_page_size;
      this.air_list_ai = [];
      this.air_list_ai_show = 'no';
      gj_text_get( '/airespaker/?method=air_list&token=' + encodeURIComponent(this.token) + '&ai=' + encodeURIComponent(ai) + '&page_no=' + v_page_no + '&page_size=' + v_page_size + '&tag=' + encodeURIComponent(tag) + '&code=' + encodeURIComponent(this.code), 'n', function( text ) {
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
            let parts = gj_unescape(fields[5]).split(',');
            for (var j = 0; j < parts.length; j++) {
              let pt = parts[j].trim();
              if (pt === '') continue;
              tags.push(pt);
            }
            let code = fields[6].trim();
            let item = { 'tags': tags, 'code': code, 'raw_reply': raw_reply, 'full': false, 'no': no, 'id': id, 'query': query, 'reply': reply, 'ai_slug': ai_slug, 'ai_name': ai_name };
            list.push( item );
          }
          v_this.air_list_ai = list;
          v_this.air_list_ai_show = 'yes';
        }
      });
    },
    doDeleteAIR(code) {
      let v_this = this;
      gj_text_post( '/airespaker/?method=delete_air', { 'token': this.token, 'code': code }, 'n', function( text ) {
        v_this.doFilterByAI(v_this.air_list_ai_slug, v_this.air_list_ai_tag);
      });
    },
    doLogout() {
      this.$emit( 'set_token', '' );
      this.$emit( 'go_page', 'home' );
    },
    doTake() {
      this.$emit( 'go_page', 'take' );
    },
    doProfile() {
      this.$emit( 'go_page', 'profile' );
    }
  }
};
