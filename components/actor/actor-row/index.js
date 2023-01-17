const app = getApp()

Component({
  options: {
    virtualHost: true,
    styleIsolation: 'apply-shared'
  },

  properties: {
    actor: {
      type: Object,
      required: true,
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
