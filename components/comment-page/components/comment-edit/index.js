import { createComment } from "../../../../api/common";

Component({
  properties: {
    _id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    to: {
      type: Object
    },
    content: {
      type: String
    }
  },

  data: {
    submitLoading: false,
    keyboradHeight: 0,
    hasChanged: false
  },

  ready() {
    wx.onKeyboardHeightChange(({ height }) => {
      this.setData({
        keyboradHeight: height
      })

      // 由于当前页面的键盘首次抬起时，会触发一次0高度
      // 所以做一个开关控制一下是否为首次进入
      if (this.data.hasChanged && height === 0) {
        this.back();
      }

      if (height > 0) {
        this.data.hasChanged = true;
      }
    })
  },

  methods: {
    inputFocus() {
      const height = window.innerHeight - 112;
      this.style = `max-height: ${height}px`;
    },

    inputChange(e) {
      const content = e.detail.value;
      this.triggerEvent("input", content);
    },

    // 返回上一页
    back() {
      if (this.data.submitLoading) return;
      this.triggerEvent('close')
    },

    // 提交评论
    async submit() {
      if (this.data.content.length < 2) {
        wx.$message.warning("不能少于2个字");
        return;
      }

      const params = {
        content: this.data.content,
      };

      this.data.submitLoading = true;
      const { code, data } = await createComment(this.data.type, this.data._id, params);
      this.data.submitLoading = false;

      if (code === 200) {
        wx.$toast({
          position: "top",
          message: "评论成功",
        });

        this.triggerEvent("create-success");

        this.back();
      }
    },
  }
})
