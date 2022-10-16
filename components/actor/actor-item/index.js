const app = getApp()

Component({
  behaviors: [wx.computedBehavior],

  options: {
    addGlobalClass: true,
  },

  properties: {
    actor: {
      type: Object,
      required: true,
    },
    keyword: {
      type: String,
      value: ""
    },
  },

  computed: {
    name(data) {
      return data.keyword ?
        data.actor.name.replace(data.keyword, `<text>${data.keyword}</text>`) :
        data.actor.name;
    },
  },

  methods: {
    pathTo() {
      app.actor = this.data.actor;

      wx.navigateTo({
        url: `/pages/actor/detail/index?id=${this.data.actor.id}`
      })
    }
  }
})