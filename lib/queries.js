import gql from 'graphql-tag'

export const allCountdowns = gql`
  query allCountdowns { 
    allCountdowns(first: 1) {
      remaining
    }
  }
`
export const allShiftingMessages = gql`
  query allShiftingMessages { 
    allShiftingMessages {
      headline
    }
  }
`

export const allFadeColors = gql`
  query allFadeColors { 
    allFadeColors {
      color
      lightColor
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
export const allArtists = gql`
  query allArtists {
    allArtists{
      id
      name
      bio
      personalPhotos {
        url
      }
      bodiesOfWork {
        title
        images {
          url
        }
        description
      }
      backgroundColor
      slug
    }
  }
`
export const allProjectInfoes = gql`
  query allProjectInfoes {
    allProjectInfoes(first: 1) {
      projectDescription
    }
  }
`
