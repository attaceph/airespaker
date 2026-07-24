/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_login_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
                 --- oOo ---
                    Login
===============================================

`;

const LoginPage = {
  template: `<div class="login-page"><div class="login-page-inner">{{ login_page_text }}
<div v-show="premium == ''"><br/><br/>- Username ----------|_|-----------------------<br/>
<input type="text" class="login-text" v-model="username" /><br/>-----------------------------------------------<br/><br/></div>
<div v-show="premium != ''"><br/><br/>- Username ----------|_|-----------------------<br/>
<input type="text" class="login-text" v-model="username" readonly="yes" /><br/>-----------------------------------------------<br/><br/></div>
<br/>- Password ----------|_|-----------------------<br/>
<input type="password" class="login-text" v-model="password" /><br/>-----------------------------------------------<br/><br/>
<div v-show="message != ''" class="login-result"><br/>- Results -----------|_|-----------------------<br/>
{{ message }}<br/>-----------------------------------------------<br/><br/></div>

<input type="button" class="login-button" value="Login" v-on:click="doLogin" /> &nbsp; <input type="button" class="login-button-2" value="Register" onclick="location='/register/';" /> &nbsp; <input type="button" class="login-button-2" value="Canel" v-on:click="doCancel" />
  </div></div>
`,
  emits: [ 'go_page', 'set_token', 'set_username' ],
  data() {
    return {
      premium: go_premium,
      login_page_text: gv_login_page_text,
      username: go_premium,
      password: "",
      message: ""
    };
  },
  methods: {
    doPrepare() {
      this.username = '';
      this.password = '';
      this.message = '';
      if (this.premium !== '') {
        this.username = this.premium;
      }
    },
    doLogin() {
      let v_this = this;
      this.message = "\n" + 'Logging in ...' + "\n";
      gj_text_get( '/airespaker/?method=login&username=' + encodeURIComponent(this.username) + '&password=' + encodeURIComponent(this.password), 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          v_this.message = '';
          let token = text.substring(8).trim();
          v_this.$emit( 'set_token', token );
          v_this.$emit( 'set_username', v_this.username );
          v_this.$emit( 'go_page', 'dashboard' );
        } else if ( text.indexOf('Error:') >= 0) {
          let msg = text.substring(6).trim();
          v_this.message = "\n" + msg + "\n";
        } else {
          v_this.message = "\n" + 'Failed to login! ' + "\n";
        }
      });
    },
    doCancel() {
      this.$emit( 'go_page', 'home' );
    }
  }
};
