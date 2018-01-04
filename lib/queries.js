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
    }
  }
`
export const allArtists = gql`
  query allArtists {
    allArtists {
      id
      name
      slug
      professionalBio
      personalBio
      website
      personalPhotos {
        url
      }
      headerPhoto {
        url
      }
      workPhotos {
        url
      }
    }
  }
`
export const allProjectInfoes = gql`
  query allProjectInfoes {
    allProjectInfoes(first: 1) {
      projectDescription
      descriptionPhotos {
        url
      }
    }
  }
`
export const allFontses = gql`
  query allFontses {
    allFontses(first: 1) {
      headerFont
      secondaryDisplayFont
      bodyFont
    }
  }
`
export const allCheckoutPages = gql`
  query allCheckoutPages {
    allCheckoutPages(first: 1) {
      introParagraph
      priceofPainting
      instructions
      contactEmail
      badPortraitExamples {
        url
      }
      goodPortraitExamples {
        url
      }
      instagram
    }
  }
`
