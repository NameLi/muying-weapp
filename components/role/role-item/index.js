const app = getApp()

Component({
  behaviors: [wx.computedBehavior],

  options: {
    addGlobalClass: true,
  },

  properties: {
    role: {
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
        data.role.name.replace(data.keyword, `<text>${data.keyword}</text>`) :
        data.role.name;
    },
    info(data) {
      return data.role.defaults
        ?.filter((item) => item.value)
        .map((item) => item.value)
        .join(" · ");
    },
  },

  methods: {
    pathTo() {
      this.triggerEvent("on-checked", this.data.role);
      app.role = this.data.role;

      wx.navigateTo({
        url: `/pages/role/detail/index?id=${this.data.role.id}`
      })
    }
  }
})