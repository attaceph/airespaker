/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_online_page_text = `  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
===============================================


---------------------\|_\|-----------------------
                  Overview
-----------------------------------------------

[airespaker] AI Response Taker is a platform that helps collect
responses from well-known AIs and manage that responses for
retrieval, reference, and storage purposes.

+ Well-known AIs include
  o Google AI Search, Bing Copilot Search, ChatGPT

`;

const OnlinePage = {
  template: `<div v-show="online && page == 'home'" class="online-page"><div class="online-page-inner">=======_==========================<span v-on:click="hide=false">_</span>============<br/>{{ online_page_text }}
<div v-show="!hide">---------------------\|_\|-----------------------
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Getting Started
<br/>-----------------------------------------------<br/>

<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Demo Account
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
<br/>+ Username: (cannot change profile) demoa1, demoa2, demoa3
<br/>+ Username: (can change profile)    demob1, demob2, demob3
<br/>+ Password: rzutomqahegpnyx<br/>

<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Entrance
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/><br/>
<input v-show="!hide" type="button" class="online-button-2" @click="go_page('login')" value="Login" /> &nbsp; <input  v-show="!hide" type="button" class="online-button-2" @click="go_page('register')" value="Register" /> &nbsp; <input  v-show="!hide" type="button" class="online-button-2" @click="go_page('aircache')" value="AIRCache" />
</div>
<div v-show="hide">---------------------\|_\|-----------------------
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comming Soon
<br/>-----------------------------------------------<br/><br/>
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/attaceph/airespaker/blob/main/brd/icon-96.png?raw=true" v-on:click="hide=false" style="cursor: pointer; cursor: hand; margin-top: -8px; width: 20px; height: 20px; " />&nbsp;Launching on 04 Aug 2026&nbsp;<img src="https://github.com/attaceph/airespaker/blob/main/brd/icon-96.png?raw=true" v-on:click="hide=false" style="cursor: pointer; cursor: hand; margin-top: -8px; width: 20px; height: 20px; " />
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
<br/><a href="https://www.producthunt.com/p/airespaker-ai-response-taker" target="_blank" rel="noopener noreferrer"><img alt="[airespaker] AI Response Taker - Notes keeper for AI responses | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1198843&amp;theme=light&amp;t=1784279627210"></a><br/>

<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Features Review
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
<div class="take-guide" v-show="hide"><div class='embed-container'><iframe src="https://www.youtube.com/embed/REesvvuEidE" frameborder='0' allowfullscreen></iframe></div></div>

<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Initial Review
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>

<input v-show="hide" type="button" class="online-button-2" @click="go_page('aircache')" value="AIRCache" />
</div>

  </div></div>
  <login_page v-show="online && page == 'login'" ref="login_page" @go_page="go_page" @set_token="set_token"></login_page>  
  <dashboard_page v-show="online && page == 'dashboard'" ref="dashboard_page" @go_page="go_page" @set_token="set_token"></dashboard_page>  
  <take_page v-show="online && page == 'take'" ref="take_page" @go_page="go_page" @set_token="set_token"></take_page>  
  <profile_page v-show="online && page == 'profile'" ref="profile_page" @go_page="go_page" @set_token="set_token"></profile_page>  
  <register_page v-show="online && page == 'register'" ref="register_page" @go_page="go_page" @set_token="set_token"></register_page>  
  <aircache_page v-show="online && page == 'aircache'" ref="aircache_page" @go_page="go_page" @set_token="set_token"></aircache_page>  
`,
  emits: [ 'update_online' ],
  data() {
    return {
      page: 'home',
      token: '',
      online_page_text: gv_online_page_text,
      online: false,
      hide: go_enable_prelaunch
    };
  },
  methods: {
    update_online( value ) {
      this.online = value;
      
      let uri = location + '';
      uri = uri.replaceAll('https://airespaker.is-best.net', '').replaceAll('http://airespaker.is-best.net', '');
      let qry = '';
      let lidx = uri.lastIndexOf('/');
      if (lidx >= 0) {
        lidx = uri.indexOf('q=', lidx + 1);
        if (lidx >= 0) {
          qry = uri.substring(lidx + 2);
          lidx = qry.indexOf('&');
          if (lidx >= 0) {
            qry = qry.substring(0, lidx);
          }
          qry = decodeURIComponent(qry);
        }
      }
      let idx = uri.indexOf('/c/');
      if (idx === 0) {
        uri = uri.substring(3);
        let username = 'airespaker';
        idx = uri.indexOf('/');
        if (idx >= 0) {
          username = uri.substring(0, idx);
        }
        if (this.page !== 'aircache') {
          this.go_page('aircache');
          this.$refs.aircache_page.setUsername(username);   
          if (qry.length > 0) {
            this.$refs.aircache_page.setQuery(qry);   
          }
        }
      }
    },
    set_token( value ) {
      if (value === '' && this.token !== '') {
        gj_text_post( '/airespaker/?method=logout', {'token': this.token}, 'n', function( text ) {
        });      
      }
      this.token = value;
    },
    go_page( value ) {
      if ( value == 'login' ) {
        this.$refs.login_page.doPrepare();
      } else if ( value == 'take' ) {
        this.$refs.take_page.doPrepare(this.token);      
      } else if ( value == 'register' ) {
        this.$refs.register_page.doPrepare();      
      } else if ( value == 'profile' ) {
        this.$refs.profile_page.doPrepare(this.token);      
      } else if ( value == 'dashboard' ) {
        this.$refs.dashboard_page.doPrepare(this.token);      
      } else if ( value == 'aircache' ) {
        this.$refs.aircache_page.doPrepare(this.token);      
      }
      this.page = value;
    },
    doLogout() {
      gj_text_post( '/airespaker/?method=logout', {'token': this.token}, 'n', function( text ) {
      });      
      this.token = '';
    }
  }
};
