import { deleteComment } from "../../../../api/common";

Component({

  data: {
    visible: false,
    actions: [],
    comment: null,
  },

  methods: {
    show(comment) {
      this.data.comment = comment;
      this.showAction();
    },

    showAction() {
      let actions = [];

      if (this.data.comment.is_author) {
        actions = [
          {
            loading: false,
            type: "delete",
            name: "删除",
            color: "#ff0000",
          },
        ];
      } else {
        actions = [
          {
            loading: false,
            type: "report",
            name: "举报",
            icon: "jubao1",
            color: "#ff0000",
          },
        ];
      }

      this.setData({
        actions,
        visible: true
      })
    },

    handleClickItem(e) {
      const index = e.detail.index;
      const type = this.data.actions[index].type;

      if (type === "delete") {
        this.deleteComment(index);
      } else if (type === "report") {
        this.showReportModal();
      }
    },

    // 举报评论
    showReportModal() {
      this.selectComponent('#reportModal').open(this.data.comment.id, "comments");
    },

    // 举报成功回调
    reportHandle() {
      this.setData({
        visible: false
      })
    },

    // 删除评论
    async deleteComment(index) {
      const key = 'actions[' + index + '].loading';
      this.setData({
        [key]: true
      })

      const { code, data, message } = await deleteComment(this.data.comment.id);
      this.setData({
        [key]: false
      })

      if (code === 200) {
        wx.$toast({
          position: "top",
          message,
        });

        this.setData({
          visible: false
        })

        this.triggerEvent("on-delete", data);
      }
    },

    handleCancel() {
      this.setData({
        visible: false
      })
    },
  },
})
