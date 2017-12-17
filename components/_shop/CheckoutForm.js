import React, { Component } from 'react'
import { Steps, Icon } from 'antd'
import antStyles from 'antd/dist/antd.css'
import { getRandomColor } from '../../lib/_utils'

export default class CheckoutForm extends Component {
  render () {
    const { Step } = Steps
    const darkColors = this.props.colors.filter((color) => !color.light)
    const randomDark = getRandomColor(darkColors)
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: antStyles }} />
        <h1>CHECKOUT</h1>
        <div className='outer'>
          <div className='progress-bar'>
            <Steps size='small'>
              <Step status='finish' title='Read Instructions' icon={<Icon style={{ color: randomDark }} type='file-text' />} />
              <Step status='process' title='Submit Payment' icon={<Icon style={{ color: randomDark }} type='shop' />} />
              <Step status='wait' title='Upload Images' icon={<Icon style={{ color: randomDark }} type='upload' />} />
              <Step status='wait' title='Finished' icon={<Icon style={{ color: randomDark }} type='smile-o' />} />
            </Steps>
          </div>
        </div>
        <style jsx>{`
          .outer {
            text-align: justify;
          }
        `}</style>
      </div>
    )
  }
}
