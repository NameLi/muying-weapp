const app = getApp();

Component({
  externalClasses: ['role-class', 'role-name-class'],

  properties: {
    role: {
      type: Object,
      required: true,
    },
  },

  methods: {
    pathTo() {
      app.role = this.data.role;

      wx.navigateTo({
        url: `/pages/role/detail/index?id=${this.data.role.id}`
      })
    }
  }
})
