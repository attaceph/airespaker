/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_online_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
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


---------------------\|_\|-----------------------
               Getting Started
-----------------------------------------------

     -------------------------------------
                 Demo Account
     -------------------------------------

+ Username: (cannot change profile) demoa1, demoa2, demoa3
+ Username: (can change profile)    demob1, demob2, demob3
+ Password: rzutomqahegpnyx

     -------------------------------------
                   Entrance
     -------------------------------------

`;

const OnlinePage = {
  template: `<div v-show="online && page == 'home'" class="online-page"><div class="online-page-inner">{{ online_page_text }}

<input type="button" class="online-button-2" @click="go_page('login')" value="Login" /> &nbsp; <input type="button" class="online-button-2" @click="go_page('register')" value="Register" />

  </div></div>
  <login_page v-show="online && page == 'login'" ref="login_page" @go_page="go_page" @set_token="set_token"></login_page>  
  <dashboard_page v-show="online && page == 'dashboard'" ref="dashboard_page" @go_page="go_page" @set_token="set_token"></dashboard_page>  
  <take_page v-show="online && page == 'take'" ref="take_page" @go_page="go_page" @set_token="set_token"></take_page>  
  <profile_page v-show="online && page == 'profile'" ref="profile_page" @go_page="go_page" @set_token="set_token"></profile_page>  
  <register_page v-show="online && page == 'register'" ref="register_page" @go_page="go_page" @set_token="set_token"></register_page>  
`,
  emits: [ 'update_online' ],
  data() {
    return {
      page: 'home',
      token: '',
      online_page_text: gv_online_page_text,
      online: false
    };
  },
  methods: {
    update_online( value ) {
      this.online = value;
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
