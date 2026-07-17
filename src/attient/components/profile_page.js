/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_profile_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
                 --- oOo ---
                   Profile
===============================================

`;

const ProfilePage = {
  template: `<div class="profile-page"><div class="profile-page-inner">{{ profile_page_text }}
<br/><br/>- Username ----------|_|- (Read-Only) ---------<br/>
<input type="text" class="profile-text" v-model="username" /><br/>-----------------------------------------------<br/><br/>
<br/>- Password (New) ----|_|-----------------------<br/>
<input type="password" class="profile-text" v-model="password" /><br/>-----------------------------------------------<br/><br/>
<br/>- Name --------------|_|-----------------------<br/>
<input type="text" class="profile-text" v-model="name" /><br/>-----------------------------------------------<br/><br/>
<br/>- Email -------------|_|-----------------------<br/>
<input type="text" class="profile-text" v-model="email" /><br/>-----------------------------------------------<br/><br/>
<br/>- Phone -------------|_|-----------------------<br/>
<input type="text" class="profile-text" v-model="phone" /><br/>-----------------------------------------------<br/><br/>
<br/>- Demo User ---------|_|- (Info-Only) ---------<br/>
<input type="text" class="profile-text" v-model="demo" /><br/>-----------------------------------------------<br/><br/>

<div v-show="message != ''" class="profile-result"><br/>- Results -----------|_|-----------------------<br/>
{{ message }}<br/>-----------------------------------------------<br/><br/></div>

<input type="button" class="profile-button" value="Update" v-on:click="doUpdate" /> &nbsp; <input type="button" class="profile-button-2" value="Canel" v-on:click="doCancel" />
  </div></div>
`,
  emits: [ 'go_page', 'set_token' ],
  data() {
    return {
      profile_page_text: gv_profile_page_text,
      token: "",
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      demo: "yes",
      message: ""
    };
  },
  methods: {
    doPrepare(token) {
      this.token = token;
      this.username = '';
      this.password = '';
      this.name = '';
      this.email = '';
      this.phone = '';
      this.demo = 'yes';
      this.message = '';
      let v_this = this;
      gj_text_get( '/airespaker/?method=current_user&token=' + encodeURIComponent(this.token), 'n', function( text ) {
        if ( text.indexOf('Success:') >= 0 ) {
          let data = text.substring(8).trim();
          let lines = data.split("\n");
          let list = [];
          for ( var i = 1; i < lines.length; i++ ) {
            let ln = lines[i];
            let fields = ln.split("\t");
            v_this.username = fields[1];
            v_this.name = fields[2];
            v_this.email = fields[3];
            v_this.phone = fields[4];
            if (fields[5] + '' === '1' ) {
              v_this.demo = 'yes';
            } else {
              v_this.demo = 'no';
            }
            break;
          }
        }
      });      
    },
    doUpdate() {
      let v_this = this;
      if ( this.password !== '' ) {
        gj_text_get( '/airespaker/?method=chpwd&token=' + encodeURIComponent(this.token) + '&password=' + encodeURIComponent(this.password), 'n', function( text ) {
          if ( text.indexOf('Success:') >= 0 ) {
            v_this.message = "\n" + 'Password has been changed!' + "\n";
          }
        });
      } else {
        gj_text_post( '/airespaker/?method=update_user', { 'token': gj_escape(this.token), 'name':  gj_escape(this.name), 'email': gj_escape(this.email), 'phone': gj_escape(this.phone) }, 'n', function( text ) {
          if ( text.indexOf('Success:') >= 0 ) {
            v_this.message = "\n" + 'Profile has been updated!' + "\n";
          } else if ( text.indexOf('Error:') >= 0) {
            let msg = text.substring(6).trim();
            v_this.message = "\n" + msg + "\n";
          } else {
            v_this.message = "\n" + 'Failed to update profile!' + "\n";        
          }
        });
      }
    },
    doCancel() {
      this.$emit( 'go_page', 'dashboard' );
    }
  }
};
