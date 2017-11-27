import Link from 'next/link'
import Head from '../Head'
import Header from './Header'
import Footer from './Footer'
// import globalStyles from '../../styles/index.scss'

export default ({ children, title, colors}) => (
  <div className='layout-wrapper'>
    <Head title={title} />
    {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
    <Header colors={colors} />
    <hr />
    { children }
    <Footer />
    <style jsx global>{`
      hr{
        width:90vw;
      }
      .layout-wrapper{
        width:100%;
      }
      body {
        margin:0!important;
        width:100vw;
      }
    `}</style>
  </div>
)
