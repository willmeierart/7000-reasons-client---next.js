import Head from 'next/head'

export default ({ title, fonts }) => {
  return (
    <Head>
      <title key='title'>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content={`inital-scale=1.0, width=device-width`} key='viewport' />
      <link href={`https://fonts.googleapis.com/css?family=${fonts}`} rel='stylesheet' />
      <link href='https://cdn.bootcss.com/loaders.css/0.1.2/loaders.min.css' rel='stylesheet' />
    </Head>
  )
}
