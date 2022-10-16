const app = getApp()

Component({
  externalClasses: ['actor-class', 'actor-name-class', 'actor-extra-class'],

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
