import { getMovie } from "../../../../api/movie";
import { userMovieWish } from "../../../../api/user";

const app = getApp()

Page({
  behaviors: [wx.computedBehavior],

  data: {
    id: null,
    loading: true,
    isHalf: false,
    detail: false,
    movie: {
      poster: '',
      bgcolor: '',
      cast_count: 0,
      cast: [],
      review_count: 0,
      reviews: [],
      serial_count: 0,
      serials: [],
      like_movies: [],
      role_count: 0,
      roles: [],
      collection_count: 0,
      comment_count: 0,
      comments: [],
      video_count: 0,
      videos: [],
      photo_count: 0,
      photos: [],
      article_count: 0,
      articles: [],
      is_wish: false, // 是否想看
      is_collection: false,
      level_count: 0,
      dialogue_count: 0,
      knowledge_count: 0,
      company_count: 0,
      episode_count: 0,
      countries: [],
      genres: [],
      durations: [],
      languages: [],
      pubdates: [],
    },
    check: false,
    wishLoading: false,
    scrollTop: 0,
    curScrollTop: 0,
    isRateEdit: false,
    isShowSaveModal: true,
    isShowInformation: false,
    isShowRate: false,  // 我的评分
    isShowFavorite: false,  // 收藏夹
    isShowRateDetail: false,  // 评分分布
    isShowComment: false, // 评论
    isShowFavoriteCreate: false,  // 创建收藏夹

    statusBarH: app.globalData.statusBarH,
    headerBarH: app.globalData.customBarH
  },

  computed: {
    isHalf(data) {
      return app.movie?.id === data.id;
    },
    poster(data) {
      return typeof data.movie.poster === "object"
        ? data.movie.poster.small
        : data.movie.poster;
    },
    bgStyle(data) {
      return `background: linear-gradient(35deg, ${data.movie.bgcolor}, ${data.movie.bgcolor}e0);`;
    },
    hasExtra(data) {
      return (
        data.movie.level_count ||
        data.movie.dialogue_count ||
        data.movie.knowledge_count ||
        data.movie.company_count
      );
    },
    isShowHalfPage(data) {
      return data.isShowFavorite || data.isShowInformation || data.isShowRate || data.isShowRateDetail || data.isShowComment || data.isShowFavoriteCreate;
    }
  },

  onLoad(options) {
    this.data.id = Number(options.id);

    if (app.movie?.id === this.data.id) {
      this.setData({
        movie: Object.assign(this.data.movie, app.movie)
      })
    }

    this.getMovie();
  },

  // 更新收藏夹
  favoriteUpdate(e) {
    const data = e.detail;

    this.setData({
      'movie.collection_count': data.collection_count,
      'movie.is_collection': data.is_collection,
    })

    this.hideFavoritePage()
  },

  // 更新评分
  ratingChange(e) {
    this.hideRatePage();
    this.getMovie();
  },

  // 获取影视信息
  async getMovie() {
    this.setData({ loading: true })
    const { code, data } = await getMovie(this.data.id);


    if (code === 200) {
      this.setData({
        movie: Object.assign(this.data.movie, data)
      }, () => {
        this.setData({ loading: false })
      })
    } else {
      this.setData({ loading: false })
    }
  },

  // 想看
  async wishChange() {
    if (this.data.wishLoading) return;

    this.setData({ wishLoading: true });
    const { code, data, message } = await userMovieWish(this.data.id);
    this.setData({ wishLoading: false });

    if (code === 200) {
      this.setData({
        'movie.is_wish': data.is_wish,
        'movie.wish_count': data.wish_count,
      })

      wx.$message.success(message);
    }
  },

  // 半屏页进入
  halfPageEnter() {

  },

  halfPageLeave() {

  },

  // 半屏页离开
  halfPageAfterLeave() {
    if (this.data.isShowFavoriteCreate) {
      setTimeout(() => {
        this.setData({
          isShowFavorite: true
        })
      }, 10)
    }

    if (this.data.isShowInformation) {
      this.hideInformationPage()
    }

    this.setData({
      isShowRate: false,  // 我的评分
      isShowFavorite: false,  // 收藏夹
      isShowInformation: false, // 更多信息
      isShowRateDetail: false,  // 评分分布
      isShowComment: false, // 评论
      isShowFavoriteCreate: false,  // 创建收藏夹
    })
  },

  // 评分详情
  showRateDetailPage() {
    this.setData({
      isShowRateDetail: true
    })
  },

  hideRateDetailPage() {
    this.setData({
      isShowRateDetail: false
    })
  },

  // 查看我的评分
  showRatePage(e) {
    const isRateEdit = e.detail === 'edit';

    this.setData({
      isShowRate: true,
      isRateEdit
    })
  },

  hideRatePage() {
    this.setData({
      isShowRate: false
    })
  },

  // 收藏夹
  showFavoritePage() {
    this.setData({
      isShowFavorite: true
    })
  },

  hideFavoritePage() {
    this.setData({
      isShowFavorite: false
    })
  },

  // 创建收藏夹
  showFavoritCreatePage() {
    this.hideFavoritePage();

    setTimeout(() => {
      this.setData({
        isShowFavoriteCreate: true
      })
    }, 100)
  },

  hideFavoritCreatePage() {
    this.setData({
      isShowFavoriteCreate: false
    })

    setTimeout(() => {
      this.showFavoritePage()
    }, 100)
  },

  favoriteCreateSuccess() {
    this.hideFavoritCreatePage();
  },

  // 显示详情
  showInformationPage() {
    if (this.data.scrollTop > 200) {
      this.data.curScrollTop = null;
      this.setData({
        isShowInformation: true
      })
    } else {

      // 记录当前页面滚动高度
      this.data.curScrollTop = parseInt(this.data.scrollTop);

      // 为了触发header的observer
      this.setData({
        scrollTop: 200
      })

      this.setData({
        scrollTop: 201,
        isShowInformation: true
      })
    }
  },

  hideInformationPage() {
    if (this.data.curScrollTop === null) {
      this.setData({
        isShowInformation: false,
      })
    } else {
      this.setData({
        isShowInformation: false,
        scrollTop: this.data.curScrollTop,
      })

      // 为了触发header的observer
      this.setData({
        scrollTop: this.data.curScrollTop + 0.1,
      })
    }
  },

  // 评论
  showCommentPage() {
    this.setData({
      isShowComment: true
    })
  },

  hideCommentPage() {
    this.setData({
      isShowComment: false
    })
  },
  // 
  // onPageScroll: app.throttle(function ({scrollTop}) {
  //   // page-container 弹出时，会触发 scrollTop = 0，影响关闭时的header展示，
  //   // 也会导致闪屏，在此做拦截不设置为0
  //   if (this.data.isShowInformation) return;

  //   this.setData({
  //     scrollTop
  //   })
  // }),

  onPageScroll({ scrollTop }) {
    // page-container 弹出时，会触发 scrollTop = 0，影响关闭时的header展示，
    // 也会导致闪屏，在此做拦截不设置为0
    if (this.data.isShowHalfPage) return;

    this.setData({
      scrollTop
    })
  },

  onShareAppMessage() {

  }
})