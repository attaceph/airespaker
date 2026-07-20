/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_take_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
                 --- oOo ---
              Take AI Response
===============================================

`;

const TakePage = {
  template: `<div class="take-page"><div class="take-page-inner">{{ take_page_text }}
<br/>- AI ----------------|_|-----------------------<br/>
<select v-on:change="aiChanged" style="width: 395px" class="take-text" v-model="machine"><option value="" disabled>Select an AI</option><option v-for="item in ais_list" :key="item.slug" :value="item.slug">{{ item.name }}</option></select><br/>-----------------------------------------------<br/><br/>
<div v-show="guide_video != ''" class="take-guide"> Take Response Guide |_|-----------------------<br/>
<div class='embed-container'><iframe :src="guide_video_url" frameborder='0' allowfullscreen></iframe></div><br/>-----------------------------------------------<br/></div>
<br/>- AI Response -------|_|-----------------------<br/>
<textarea style="height: 200px;" class="take-text" v-model="query" /><br/>-----------------------------------------------<br/>
<br/>- Tags --------------|_|-( Separated by ',' )--<br/>
<input type="text" class="take-text" v-model="tags" /><br/>-----------------------------------------------<br/><br/>

<div v-show="message != ''" class="take-result"><br/>- Results -----------|_|-----------------------<br/>
{{ message }}<br/>-----------------------------------------------<br/><br/></div>

<input type="button" class="take-button" value="Save" v-on:click="doTake" /> &nbsp; <input type="button" class="take-button-2" value="Canel" v-on:click="doCancel" />
  </div></div>
`,
  emits: [ 'go_page', 'set_token' ],
  data() {
    return {
      take_page_text: gv_take_page_text,
      query: "",
      machine: "",
      tags: "",
      token: "",
      message: "",
      ais_list_text: '',
      ais_list: [],
      guide_video: '',
      guide_video_url: 'https://www.youtube.com/watch?v=MIzoECcgcK0'
    };
  },
  methods: {
    doPrepare( token ) {
      this.token = token;
      this.machine = 'google-ai-search';
      this.query = '';
      this.tags = '';
      this.message = '';
      
      let v_this = this;
      gj_text_get( '/airespaker/?method=ais_list&token=' + encodeURIComponent(this.token), 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          let data = text.substring(8).trim();
          v_this.ais_list_text = data;
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
          v_this.aiChanged();
        } else if ( text.indexOf('Error:') >= 0) {
          let msg = text.substring(6).trim();
          v_this.message = "\n" + msg + "\n";
        } else {
          v_this.message = "\n" + 'Failed to get AI list! ' + "\n";
        }
      });      
    },
    aiChanged() {
      let ai = this.machine;
      for ( var i = 0; i < this.ais_list.length; i++ ) {
        let item = this.ais_list[i];
        if ( ai == item.slug ) {
          this.guide_video = item.guide_video;
          this.guide_video_url = 'https://www.youtube.com/embed/' + this.guide_video;
          return;
        }
      }
      this.guide_video = '';
      this.guide_video_url = 'https://www.youtube.com/watch?v=MIzoECcgcK0';
    },
    doTake() {
      let v_this = this;
      let ai = 'Other AIs';
      if (this.machine == 'google-ai-search') {
        ai = 'Google AI Search';
      } else if (this.machine == 'bing-copilot-search') {
        ai = 'Bing Copilot Search';
      } else if (this.machine == 'chatgpt') {
        ai = 'ChatGPT';
      }
      v_this.message = "\n" + 'Saving AI response from [ ' + ai + ' ] ...' + "\n";
      gj_text_post( '/airespaker/?method=take', {'token': this.token, 'machine': this.machine, 'query': this.query, 'tags': this.tags}, 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          let data = text.substring(8).trim();
          //v_this.message = "\n" + data + "\n";
          //v_this.$emit( 'set_token', token );
          v_this.message = '';
          v_this.$emit( 'go_page', 'dashboard' );
        } else if ( text.indexOf('Error:') >= 0) {
          let msg = text.substring(6).trim();
          v_this.message = "\n" + msg + "\n";
        } else {
          v_this.message = "\n" + 'Failed to take AI response! ' + "\n";
        }
      });
    },
    doCancel() {
      this.$emit( 'go_page', 'dashboard' );
    }
  }
};
