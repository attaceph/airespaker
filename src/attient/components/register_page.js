/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_register_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
                 --- oOo ---
                  Register
===============================================

`;

const RegisterPage = {
  template: `<div class="register-page"><div class="register-page-inner">{{ register_page_text }}
<br/><br/>- Username ----------|_|-----------------------<br/>
<input type="text" class="register-text" v-model="username" /><br/>-----------------------------------------------<br/><br/>
<br/>- Password ----------|_|-----------------------<br/>
<input type="password" class="register-text" v-model="password" /><br/>-----------------------------------------------<br/><br/>
<br/>- Name --------------|_|-----------------------<br/>
<input type="text" class="register-text" v-model="name" /><br/>-----------------------------------------------<br/><br/>
<br/>- Email -------------|_|-----------------------<br/>
<input type="text" class="register-text" v-model="email" /><br/>-----------------------------------------------<br/><br/>
<br/>- Phone -------------|_|-----------------------<br/>
<input type="text" class="register-text" v-model="phone" /><br/>-----------------------------------------------<br/><br/>

<div v-show="message != ''" class="register-result"><br/>- Results -----------|_|-----------------------<br/>
{{ message }}<br/>-----------------------------------------------<br/><br/></div>

<input type="button" class="register-button" value="Register" v-on:click="doRegister" /> &nbsp; <input type="button" class="profile-button-2" value="Canel" v-on:click="doCancel" />
  </div></div>
`,
  emits: [ 'go_page', 'set_token' ],
  data() {
    return {
      register_page_text: gv_register_page_text,
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      message: ""
    };
  },
  methods: {
    doPrepare() {
      this.username = '';
      this.password = '';
      this.name = '';
      this.email = '';
      this.phone = '';
      this.message = '';
    },
    doRegister() {
      let v_this = this;
      gj_text_post( '/airespaker/?method=register', { 'username': gj_escape(this.username), 'password': gj_escape(this.password), 'name':  gj_escape(this.name), 'email': gj_escape(this.email), 'phone': gj_escape(this.phone) }, 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          v_this.$emit( 'go_page', 'login' );
        } else if ( text.indexOf('Error:') >= 0) {
          let msg = text.substring(6).trim();
          v_this.message = "\n" + msg + "\n";
        } else {
          v_this.message = "\n" + 'Failed to register!' + "\n";        
        }
      });
    },
    doCancel() {
      this.$emit( 'go_page', 'home' );
    }
  }
};
