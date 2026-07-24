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
  template: `<div class="register-page"><div class="register-page-inner">{{ register_page_text }}<div v-show="hide">
<br/>---------------------|_|-----------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" v-on:click="hide=false">Click here to view [ Overview ]</a>
<br/>-----------------------------------------------</br>
</div><div v-show="!hide">
<br/>---------------------|_|-----------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Overview
<br/>-----------------------------------------------</br>
<br/>
<br/>[airespaker] AI Response Taker is a platform that helps collect
<br/>responses from well-known AIs and manage that responses for
<br/>retrieval, reference, and storage purposes.
<br/>
<br/>+ Well-known AIs include
<br/>  o Google AI Search, Bing Copilot Search, ChatGPT
<br/>
<br/>
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Why I built [airespaker]?
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------
<br/>
<br/>I often copy responses from Google AI Search and paste into my 
<br/>notes keeper app on my Android smartphone. The problem I have 
<br/>is their displayed formats is not good and I have to modify 
<br/>notes many times to make it displaying well.
<br/>
<br/>I built [airespaker] AI Response Taker to solve my problem and 
<br/>share it to everyone having same problem of mine. [airespaker] 
<br/>considers AI respones as notes, storing them & managing them. 
<br/>Users can add AI responses from Google AI Search, Bing Copilot 
<br/>Search, ChatGPT and other AIs. Users can not modify added AI 
<br/>responses but can delete them. Users can filter & display AI 
<br/>responses by code, query, AI and tags. The format of responses 
<br/>is quite beautiful.
<br/>
<br/>[airespaker] has free forever plan and premium plan with 
<br/>$99.9 / year.
<br/>
<br/>I also made a feature [ AI Response Cache Chatbot ]. Users can 
<br/>take AI response from system's cache, user's cache or directly 
<br/>from AI (Google Gemma). Users can take URIs of displaying AI 
<br/>response or screenshot of it. By tapping 'C' button, URI of 
<br/>displaying AI response is copied to clipboard. By tapping 'S' 
<br/>button, URI of screenshot of AI response is copied to clipboard. 
<br/>By using AIRCache, users can save money, query more & pay less.  
<br/>
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Features Review
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------------------------------<br/><br/>
<div class="take-guide"><div class='embed-container'><iframe src="https://www.youtube.com/embed/REesvvuEidE" frameborder='0' allowfullscreen></iframe></div></div>

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
</div>

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

<input type="button" class="register-button" value="Register" v-on:click="doRegister" /> &nbsp; <input type="button" class="profile-button-2" value="Login" onclick="location='/login/';" /> &nbsp; <input type="button" class="profile-button-2" value="Canel" v-on:click="doCancel" />
  </div></div>
`,
  emits: [ 'go_page', 'set_token' ],
  data() {
    return {
      hide: true,
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
