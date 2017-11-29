import Head from 'next/head'

const initialProps = {
  title: '7000 reasons',
  initialScale: '1.0'
}

export default (props = initialProps) => {
  const { title, initialScale } = props
  return (
    <Head>
      <title key='title'>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content={`inital-scale=${initialScale || initialProps.initialScale}, width=device-width`} key='viewport' />
      <link href='https://fonts.googleapis.com/css?family=Fredoka+One|Lobster' rel='stylesheet' />
      <link href='https://cdn.bootcss.com/loaders.css/0.1.2/loaders.min.css' rel='stylesheet' />
    </Head>
  )
}
