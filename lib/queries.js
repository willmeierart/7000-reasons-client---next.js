import gql from 'graphql-tag'

export const allFadeColors = gql`
  query allFadeColors { 
    allFadeColors {
      color
    }
  }
`
export const allPaintings = gql`
  query allPaintings {
    allPaintings(orderBy: number_DESC) {
      number
      image {
        url
      }
      fadeColors {
        color
      }
    }
  }
`
