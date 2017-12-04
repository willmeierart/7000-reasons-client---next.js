import React, { Component } from 'react'
import Link from 'next/link'
import MenuItems from './MenuItems'
import { getRandomColor } from '../../lib/_utils'

export default class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = { hoveredSubItems: null }
  }
  static async getInitialProps ({ colors }) {
    return colors
  }
  showSubItem (i) {
    this.setState(() => (
      {hoveredSubItems: i}
    ))
  }
  hideSubItem () {
    this.setState(() => (
      { hoveredSubItems: null }
    ))
  }
  renderMenuItems () {
    const { colors } = this.props
    const darkColors = colors.filter((color) => !color.light)
    return MenuItems.map((item, i) => {
      const hoverColor = getRandomColor(darkColors)
      return (
        <li key={item.name} className='menuItem' onMouseEnter={() => this.showSubItem(i)} onMouseLeave={() => this.hideSubItem()}>
          {(this.state.hoveredSubItems !== i || item.submenu.length === 0) &&
            <Link href={item.link}><a>{ item.name }</a></Link>
          }{ item.submenu.length > 0 && this.state.hoveredSubItems === i &&
            <ul className='submenuList'>{
              item.submenu.map((sub, i) => (
                <li key={sub.name} className='submenuItem'>
                  <Link as={sub.alias || null} href={sub.link}><a>{ sub.name }</a></Link>
                </li>
              ))
            }</ul>
          }
          <style jsx>{`
            li {
              list-style: none;
              display:flex;
              justify-content: flex-start;
              align-items: center;
            }
            a {
              font-family: var(--title-font);
              color: inherit;
              text-decoration: none;
              transition: color .5s ease;
            }
            a:hover {
              color: ${hoverColor};
            }
            .submenuList {
              display: flex;
              justify-content:space-between;
              flex-direction: row;
            }
            .submenuItem {
              display: inline-block;
              padding: 0 1em;
              {/* margin-left: 1em; */}
            }
          `}</style>
        </li>
      )
    })
  }
  render () {
    return (
      <ul>
        { this.renderMenuItems() }
        <style jsx>{`
          ul {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0;
          }
        `}</style>
      </ul>
    )
  }
}
