import Head from 'next/head'

export default ({ title, fonts }) => {
  return (
    <Head>
      <title key='title'>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content={`inital-scale=1.0, width=device-width`} key='viewport' />

      <link href={`https://fonts.googleapis.com/css?family=${fonts}`} rel='stylesheet' />
      <link href='https://cdn.bootcss.com/loaders.css/0.1.2/loaders.min.css' rel='stylesheet' />

      <link rel='apple-touch-icon' sizes='57x57' href='/static/favicon/apple-icon-57x57.png' />>
      <link rel='apple-touch-icon' sizes='60x60' href='/static/favicon/apple-icon-60x60.png' />
      <link rel='apple-touch-icon' sizes='72x72' href='/static/favicon/apple-icon-72x72.png' />
      <link rel='apple-touch-icon' sizes='76x76' href='/static/favicon/apple-icon-76x76.png' />
      <link rel='apple-touch-icon' sizes='114x114' href='/static/favicon/apple-icon-114x114.png' />
      <link rel='apple-touch-icon' sizes='120x120' href='/static/favicon/apple-icon-120x120.png' />
      <link rel='apple-touch-icon' sizes='144x144' href='/static/favicon/apple-icon-144x144.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/static/favicon/apple-icon-152x152.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/static/favicon/apple-icon-180x180.png' />
      <link rel='icon' type='image/png' sizes='192x192' href='/static/favicon/android-icon-192x192.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='96x96' href='/static/favicon/favicon-96x96.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon/favicon-16x16.png' />
      <link rel='manifest' href='/static/favicon/manifest.json' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='static/favicon/ms-icon-144x144.png' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  )
}
