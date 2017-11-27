import Head from 'next/head'

const initialProps = {
  title: '7000 reasons',
  initialScale: '1.0'
}

export default (props = initialProps) => {
  const { title, initialScale } = props
  return (
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content={`inital-scale=${initialScale || initialProps.initialScale}, width=device-width`} />

      <link href='https://fonts.googleapis.com/css?family=Fredoka+One' rel='stylesheet' />
      <style jsx>{`
      `}</style>
    </Head>
  )
}
