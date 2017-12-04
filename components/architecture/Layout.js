import Link from 'next/link'
import Head from '../Head'
import Header from './Header'
import Footer from './Footer'
import globalStyles from '../../styles/index.scss'

export default ({ children, title, colors, reasons }) => (
  <div className='layout-wrapper'>
    <Head title={title} />
    <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
    <Header reasons={reasons} colors={colors} />
    <hr />
    <main>{ children }</main>
    <Footer />
    <style jsx global>{`
      :root{
        --title-font: Fredoka One, cursive;
        --cursive-font: Lobster, cursive;
      }
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
      .loader-hidden {display:none;}
      .loader-active {
        display:block;
      }
      .line-spin-fade-loader div {
        background-color: red;
        left: 5vw;
        top: 5vw;
      }
      .loader {
        min-width:100vw;
        min-height:100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
)
