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


     -------------------------------------
          Why I built [airespaker]?
     -------------------------------------

I often copy responses from Google AI Search and paste into my 
notes keeper app on my Android smartphone. The problem I have 
is their displayed formats is not good and I have to modify 
notes many times to make it displaying well.

I built [airespaker] AI Response Taker to solve my problem and 
share it to everyone having same problem of mine. [airespaker] 
considers AI responses as notes, storing them & managing them. 
Users can add AI responses from Google AI Search, Bing Copilot 
Search, ChatGPT and other AIs. Users can not modify added AI 
responses but can delete them. Users can filter & display AI 
responses by response code, response's AI and response's tags. 
The format of AI responses are quite beautiful.

Currently, [airespaker] has minimalist interface which is mostly 
in text. My purpose is building features fastly, shipping them, 
collecting feedbacks and compositing useful & expected features. 
Then, I can build next version of [airespaker] with beautiful, 
clean UI and useful features.

I also made a feature [ AI Response Cache Chatbot ]. Users can 
take AI response from system's cache, user's cache or directly 
from AI (Google Gemma). Users can take URIs of displaying AI 
response or screenshot of it. By tapping 'C' button, URI of 
displaying AI response is copied to clipboard. By tapping 'S' 
button, URI of screenshot of AI response is copied to clipboard. 
By using AIRCache, users can save money, query more & pay less.

`;

const OnlinePage = {
  template: `<div v-show="online && page == 'home'" class="online-page"><div class="online-page-inner">=======_==========================<span v-on:click="hide=false">_</span>============<br/>{{ online_page_text }}
  
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Features Review
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/><br/>
<div class="take-guide" v-show="hide"><div class='embed-container'><iframe src="https://www.youtube.com/embed/REesvvuEidE" frameborder='0' allowfullscreen></iframe></div></div>

<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pricing
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>

<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Freemium
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---------------------------<br/>

<br/>+ Unlimited AI responses creation<br/>

<br/>+ Unlimited tags creation<br/>

<br/>+ Non-continuous connection to back-end<br/>
(Broken for each 1 hour)<br/>

<br/>+ Very limited access to AI model (Google Gemma)<br/>

<br/>+ Price: Free forever<br/>

<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---------------------------<br/>

<br/>+ Unlimited AI responses creation<br/>

<br/>+ Unlimited tags creation<br/>

<br/>+ Continuous connection to back-end (99% uptime)<br/>

<br/>+ Dedicated subdomain<br/>

<br/>+ Limited access (around 700 non-cached <br/>
<br/>query a day) to AI model (Google Gemma)<br/>

<br/>+ Price: $99.9 / year<br/>

<br/>+ <a target="_blank" href="https://airespaker.is-best.net/pay-premium.php">How to pay?</a><br/><br/><br/>

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
<input v-show="!hide" type="button" class="online-button-2" @click="go_page('login')" value="Login" /> &nbsp; <input  v-show="!hide && premium == ''" type="button" class="online-button-2" @click="go_page('register')" value="Register" /> &nbsp; <input  v-show="!hide && premium == ''" type="button" class="online-button-2" @click="go_page('aircache')" value="AIRCache" />

</div>

<div v-show="hide">---------------------\|_\|-----------------------
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:green">Comming Soon</span>
<br/>-----------------------------------------------<br/><br/>
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/attaceph/airespaker/blob/main/brd/icon-96.png?raw=true" v-on:click="hide=false" style="cursor: pointer; cursor: hand; margin-top: -8px; width: 20px; height: 20px; " />&nbsp;Launching on 04 Aug 2026&nbsp;<img src="https://github.com/attaceph/airespaker/blob/main/brd/icon-96.png?raw=true" v-on:click="hide=false" style="cursor: pointer; cursor: hand; margin-top: -8px; width: 20px; height: 20px; " />
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
<br/><a href="https://www.producthunt.com/p/airespaker-ai-response-taker" target="_blank" rel="noopener noreferrer"><img alt="[airespaker] AI Response Taker - Notes keeper for AI responses | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1198843&amp;theme=light&amp;t=1784279627210"></a><br/>

<div v-show="premium == ''"><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Try thing first
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>

<br/><input v-show="hide" type="button" class="online-button-2" @click="go_page('aircache')" value="AIRCache" /></div>

  </div>
  </div>
  </div>
  <login_page v-show="online && page == 'login'" ref="login_page" @go_page="go_page" @set_token="set_token" @set_username="set_username"></login_page>  
  <dashboard_page v-show="online && page == 'dashboard'" ref="dashboard_page" @go_page="go_page" @set_token="set_token"></dashboard_page>  
  <take_page v-show="online && page == 'take'" ref="take_page" @go_page="go_page" @set_token="set_token"></take_page>  
  <profile_page v-show="online && page == 'profile'" ref="profile_page" @go_page="go_page" @set_token="set_token"></profile_page>  
  <register_page v-show="online && page == 'register'" ref="register_page" @go_page="go_page" @set_token="set_token"></register_page>  
  <aircache_page v-show="online && page == 'aircache'" ref="aircache_page" @go_page="go_page" @set_token="set_token"></aircache_page>  
  <savecache_page v-show="online && page == 'savecache'" ref="savecache_page" @go_page="go_page" @set_token="set_token"></savecache_page>  
`,
  emits: [ 'update_online' ],
  data() {
    return {
      premium: go_premium,
      username: go_premium,
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
      
      if (this.premium === '') {
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
            if (qry.length > 0) {
              this.$refs.aircache_page.setUsername(username, false);   
              this.$refs.aircache_page.setQuery(qry);   
            } else {
              this.$refs.aircache_page.setUsername(username, true);   
            }
          }
        }
      }
    },
    set_username( username ) {
      if (this.token !== '') {
        this.username = username;
      } else {
        this.username = '';
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
        this.$refs.aircache_page.doPrepare(this.token, this.username);      
      } else if ( value == 'savecache' ) {
        this.$refs.savecache_page.doPrepare(this.token, this.username);      
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
