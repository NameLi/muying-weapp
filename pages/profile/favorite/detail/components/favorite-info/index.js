import { deleteUserFavorite } from "../../../../../../api/user";

Component({
  properties: {
    loading: {
      type: Boolean,
      value: false
    },
    favorite: {
      type: Object,
    },
    images: {
      type: Array,
      value: []
    },
  },

  data: {
    visible: false,
    actions: [
      {
        name: "编辑",
      },
      {
        name: "删除",
        color: "#ed3f14",
        loading: false,
      },
    ],
  },

  methods: {
    // 显示编辑或删除
    showEditAction() {
      this.setData({
        visible: true
      })
    },

    // 取消action
    handleCancel() {
      this.setData({
        visible: false
      })
    },

    // 编辑或删除
    handleClickItem(e) {
      const index = e.detail.index;
      this.setData({
        visible: false
      })

      switch (index) {
        case 0:
          this.triggerEvent('show-edit', true)
          break;

        case 1:
          this.deleteFavorite();
          break;
      }
    },

    async deleteFavorite() {
      try {
        await wx.$modal({
          title: "警告",
          content: "确定要删除该收藏夹吗？",
          confirmTextColor: "red",
          confirmButtonText: "删除",
          asyncClose: true,
        });
        const { code, data } = await deleteUserFavorite(this.data.favorite.id);
        wx.$modal.close();

        if (code === 200) {
          wx.$message({
            content: "删除成功！",
            type: "success",
          });

          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      } catch (e) {
      }
    },
  }
})
