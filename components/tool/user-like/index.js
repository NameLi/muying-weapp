import { createLike, deleteLike } from "../../../api/user";

Component({

  externalClasses: ['tool-item-class'],

  properties: {
    type: {
      type: String,
      required: true,
    },
    // 数据
    data: {
      type: Object,
      required: true,
    },
    defaultCount: {
      value: "喜欢",
      type: String
    },
  },

  data: {
    loading: false
  },

  methods: {
    async likeClick() {
      if (this.data.data.allow_like === 0) return;

      if (this.data.loading) return;

      this.setData({
        loading: true
      })

      const { code, data } = this.data.data.is_like ?
        await deleteLike(this.data.type, this.data.data.id) :
        await createLike(this.data.type, this.data.data.id);

      this.setData({
        loading: false
      })

      if (code === 200) {
        // this.triggerEvent("on-change", data);
        this.setData({
          data: Object.assign(this.data.data, data)
        })
      }
    },
  }
})