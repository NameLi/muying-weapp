import { createCommentLike, deleteCommentLike } from "../../../../api/user";
const app = getApp();

Component({
  behaviors: [wx.computedBehavior],

  properties: {
    comment: {
      type: Object,
    },
    type: {
      type: String,
    },
  },

  computed: {
    author(data) {
      return data.comment?.author;
    },
    created_at(data) {
      return app.dateBefore(data.article?.created_at)
    }
  },

  methods: {
    // 喜欢
    async likeClick() {
      if (this.data.comment.allow_like === 0) {
        return;
      }

      if (this.data.loading) return;

      this.setData({ loading: true });
      let { code, data } = this.data.comment.is_like
        ? await deleteCommentLike(this.data.comment.id)
        : await createCommentLike(this.data.comment.id);
      this.setData({ loading: false });

      if (code === 200) {
        this.setData({
          comment: Object.assign(this.data.comment, data)
        })
      }
    },

    // 评论操作
    showActionSheet() {
      this.triggerEvent("show-action-sheet", this.data.comment);
    },
  }
})
