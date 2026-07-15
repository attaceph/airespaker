/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_offline_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
===============================================


Connection to back-end is broken. Please wait some
minutes to re-establish connection to back-end.

`;

const OfflinePage = {
  template: `<div v-show="!online" class="offline-page"><div class="offline-page-inner">{{ offline_page_text }}

<br/>---------------------|_|-----------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="offline-time" v-html="offline_hours"></span><span class="offline-time"> : </span><span class="offline-time" v-html="offline_minutes"></span><span class="offline-time"> : </span><span class="offline-time" v-html="offline_seconds"></span><br/>-----------------------------------------------<br/>
<br/><br/>---------------------|_|-----------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Play a game while waiting<br/>-----------------------------------------------<br/><br/>
<iframe src="https://one.fserb.com/trap/" frameborder="0" id="canvas" style="width: 100mm; height: 110mm; cursor: pointer; user-select: none;"></iframe>
  </div></div>
`,
  emits: [ 'update_online' ],
  data() {
    return {
      online: false,
      offline_count: 0,
      offline_seconds: "00",
      offline_minutes: "00",
      offline_hours: "00",
      offline_page_text: gv_offline_page_text
    };
  },
  methods: {
    load() {
      this.check_online();
    },
    check_online() {
      let v_this = this;
      gj_text_get( '/ready.txt', 'n', function( text ) {
        if ( text.indexOf('Ready:') >= 0 ) {
          v_this.online = true;
          v_this.$emit( 'update_online', true );
        } else {
          if ( v_this.online === false ) {
            v_this.offline_count++;
          } else {
            v_this.offline_count = 0;
          }
          v_this.online = false;
          v_this.$emit( 'update_online', false );
          //let seconds = v_this.offline_count % 2;
          //seconds = ( v_this.offline_count - seconds ) / 2;
          let seconds = v_this.offline_count * 5;
          let minutes = seconds % 60;
          minutes = ( seconds - minutes ) / 60;
          seconds = seconds % 60;
          let hours = minutes % 60;
          hours = ( minutes - hours ) / 60;
          minutes = minutes % 60;
          if ( seconds < 10 ) {
            v_this.offline_seconds = '0' + seconds;
          } else {
            v_this.offline_seconds = '' + seconds;            
          }
          if ( minutes < 10 ) {
            v_this.offline_minutes = '0' + minutes;
          } else {
            v_this.offline_minutes = '' + minutes;            
          }
          if ( hours < 10 ) {
            v_this.offline_hours = '0' + hours;
          } else {
            v_this.offline_hours = '' + hours;            
          }
        }
      });
      setTimeout(function() {
        v_this.check_online();
      }, 5000);      
    }
  }
};
