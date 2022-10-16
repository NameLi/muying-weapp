import { getCategories } from "../../../../../api/api";

Component({

  behaviors: [wx.computedBehavior],

  properties: {
    scrollTop: {
      type: Number,
      value: 0,
      observer(val) {
        this.handleScroll(val)
      }
    }
  },

  data: {
    loading: false,
    categories: [],
    countries: [],
    years: [],
    form: {
      category: "电影",
      genre: "全部",
      country: "全部",
      year: "全部",
    },
    navGroupH: 0,
    isFixed: false,
    isShowMenu: false,
  },

  computed: {
    genres(data) {
      const category = data.categories.find(
        (item) => item.name === data.form.category
      );
      return [{
        name: "全部"
      }, ...(category?.children || [])];
    },
    checkedMenus(data) {
      const genre = data.form.genre === "全部" ? "" : data.form.genre;
      const country = data.form.country === "全部" ? "" : data.form.country;
      const year = data.form.year === "全部" ? "" : data.form.year;

      return `${data.form.category}${genre ? "-" + genre : ""}${country ? "-" + country : ""
        }${year ? "-" + year : ""}`;
    },
  },

  ready() {
    const query = this.createSelectorQuery()
    query.select('.nav-group-wrapper').boundingClientRect()
    query.exec((res) => {
      this.data.navGroupH = res[0].height;
    })

    this.getCategories();
  },

  methods: {
    async getCategories() {
      this.setData({ loading: true });
      const { code, data } = await getCategories();
      this.setData({ loading: false });

      if (code === 200) {
        this.setData({
          navList: data,
          categories: data.categories,
          countries: [{
            name: "全部"
          }, ...data.countries],
          years: [{
            name: "全部"
          }, ...data.years],
        })
      }
    },

    typeChange(e) {
      const type = e.currentTarget.dataset.type;
      const name = e.detail;
      const key = `form.${type}`;

      if (type === 'category') {
        this.setData({
          ['form.genre']: '全部'
        })
      }

      this.setData({
        [key]: name
      }, () => {
        this.triggerEvent("on-change", this.data.form);
      })
    },

    handleScroll(scrollTop) {
      const curIsShowMenu = this.data.isShowMenu;
      let isShowMenu = null;

      if (scrollTop > this.data.navGroupH) {
        isShowMenu = true
      } else {
        isShowMenu = false
      }

      if (curIsShowMenu === isShowMenu && this.data.isFixed === false) {
        return
      } else {
        this.setData({
          isShowMenu,
          isFixed: false
        })
      }
    },

    // 显示菜单
    showGroupMenu() {
      this.setData({
        isFixed: true
      })
    }
  }
})