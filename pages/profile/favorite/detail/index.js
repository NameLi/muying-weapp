import {
  getUserFavorite,
  getUserFavoriteMovies,
  deleteUserFavoriteMovies,
} from "../../../../api/user";

Page({

  behaviors: [wx.computedBehavior, wx.getInfiniteData],

  data: {
    scrollTop: 0,
    id: null,
    favoriteLoading: false,
    visible: false,
    movie: {},
    actions: [
      {
        name: "取消收藏",
        color: "#ed3f14",
        loading: false,
      },
    ],
    favorite: {
      name: "加载中",
      count: "-",
    },
  },

  computed: {
    photos(data) {
      return data.list.filter((m, idx) => idx < 3).map((m) => m.poster);
    },
  },

  onLoad(options) {
    this.data.id = options.id;
    this.getUserFavorite();
  },

  // 获取收藏夹详情
  async getUserFavorite() {
    this.data.favoriteLoading = true;
    const { code, data } = await getUserFavorite(this.data.id);
    this.data.favoriteLoading = false;

    if (code === 200) {
      this.setData({
        favorite: data
      })
    }
  },

  // 获取收藏夹影视列表
  loadMore() {
    this.getData(getUserFavoriteMovies, this.data.id);
  },

  // 影视操作
  showMore(e) {
    const movie = e.currentTarget.dataset.movie;

    this.setData({
      movie,
      visible: true
    })
  },

  // 点击取消收藏
  async handleClickItem(e) {
    const index = e.detail.index;

    if (index === 0) {
      this.setData({
        'actions[0].loading': true
      })
      const { code, data, message } = await deleteUserFavoriteMovies(this.data.id, this.data.movie.union_id);
      this.setData({
        'actions[0].loading': false
      })

      if (code === 200) {
        wx.$toast(message);

        const index = this.data.list.findIndex(
          (m) => m.union_id === this.data.movie.union_id
        );
        if (index > -1) {
          this.data.list.splice(index, 1);

          this.setData({
            'favorite.count': --this.data.favorite.count,
            list: this.data.list
          })
        }

        this.setData({
          visible: false
        })
      }
    }
  },

  handleCancel() {
    this.setData({
      visible: false
    })
  },

  // 显示编辑
  showEditPage() {
    this.setData({
      isShowEdit: true
    })
  },

  hideEditPage() {
    this.setData({
      isShowEdit: false
    })
  },

  updateSuccess(e) {
    this.hideEditPage();
    this.setData({
      'favorite.name': e.detail.name,
      'favorite.brief': e.detail.brief
    })
  },

  onPageScroll({ scrollTop }) {
    this.setData({
      scrollTop
    })
  },
})