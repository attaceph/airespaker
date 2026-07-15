const gv_online_page_text = `=======_==========================_============
  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
===============================================

`;

const OnlinePage = {
  template: `<div v-show="online" class="online-page"><div class="online-page-inner">{{ online_page_text }}

  </div></div>
`,
  emits: [ 'update_online' ],
  data() {
    return {
      online_page_text: gv_online_page_text,
      online: false
    };
  },
  methods: {
    update_online( value ) {
      this.online = value;
    }
  }
};
