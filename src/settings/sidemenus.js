export default [
  {
    title: "首页",
    icon: "mp-home",
    route: "/landing"
  },
  {
    title: "创作中心",
    icon: "mp-edit",
    permissions: ["PUB_IMG_TEXT"],
    children: [
      {
        name: "发布",
        route: "/publish?type=0",
        permissions: ["PUB_IMG_TEXT"]
      }
    ]
  },
  {
    title: "数据中心",
    icon: "mp-data",
    permissions: ["MP_DATA"],
    children: [
      {
        name: "数据概览",
        route: "/data/overview",
        permissions: ["MP_DATA"]
      }
    ]
  },
  {
    title: "个人中心",
    icon: "mp-center",
    permissions: ["USER_CONFIG"],
    children: [
      {
        name: "账号设置",
        route: "/user/account",
        permissions: ["USER_CONFIG"]
      }
    ]
  }
];
