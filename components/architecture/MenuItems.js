export default [
  {
    name: 'home',
    link: '/',
    submenu: []
  },
  {
    name: 'about',
    link: '/about',
    submenu: [
      {
        name: 'the project',
        link: '/about'
      },
      {
        name: 'the artists',
        link: '/artist?slug=wes',
        alias: '/artists/wes'
      }
    ]
  },
  {
    name: 'shop',
    link: '/shop',
    submenu: []
  }
]
