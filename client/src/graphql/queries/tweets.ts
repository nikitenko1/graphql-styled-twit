import { gql } from "@apollo/client";

export const GET_HOME_TWEETS = gql`
  query getHomeTweets($variable: HomeTweets!) {
    getHomeTweets(HomeTweetsData: $variable) {
      tweets {
        text
        media
        gif
        createdAt
        id
        userRef
      }
      hasMore
    }
  }
`;

export const GET_SEARCHED_TWEETS = gql`
  query getSearchedTweets($variable: TweetSearch!) {
    getSearchedTweets(tweetSearch: $variable) {
      tweets {
        text
        media
        gif
        createdAt
        id
        userRef
      }
      hasMore
    }
  }
`;

export const GET_BOOKMARKS = gql`
  query getBookmarks($variable: TweetsLimit!) {
    getBookmarks(profileTweetsData: $variable) {
      tweets {
        text
        media
        gif
        createdAt
        id
        userRef
      }
      hasMore
    }
  }
`;

export const GET_COMMUNICATE_DATA = gql`
  query getCommunicateData($variable: String!) {
    getCommunicateData(tweetId: $variable) {
      likes
      isUserLiked
      comments
      retweets
      isUserRetweeted
      isTweetBookmarked
    }
  }
`;

export const GET_ALL_TWEETS = gql`
  query getAllTweets($variable: TweetsLimit!) {
    getAllTweets(profileTweetsData: $variable) {
      tweets {
        text
        media
        gif
        createdAt
        id
        userRef
      }
      hasMore
    }
  }
`;

export const GET_PROFILE_TWEETS = gql`
  query getProfileTweets($variable: TweetsLimit!) {
    getProfileTweets(profileTweetsData: $variable) {
      tweets {
        text
        media
        gif
        createdAt
        id
        userRef
      }
      hasMore
    }
  }
`;

export const GET_RETWEETS = gql`
  query getRetweets($variable: TweetsLimit!) {
    getRetweets(profileTweetsData: $variable) {
      tweets {
        text
        media
        gif
        createdAt
        id
        userRef
      }
      hasMore
    }
  }
`;

export const GET_TWEETS_WITH_MEDIA = gql`
  query getTweetsWithMedia($variable: TweetsLimit!) {
    getTweetsWithMedia(ProfileTweetsData: $variable) {
      tweets {
        text
        media
        gif
        createdAt
        id
        userRef
      }
      hasMore
    }
  }
`;

export const GET_LIKED_TWEETS = gql`
  query getLikedTweets($variable: TweetsLimit!) {
    getLikedTweets(pofileTweetsData: $variable) {
      tweets {
        text
        media
        gif
        createdAt
        id
        userRef
      }
      hasMore
    }
  }
`;

export const GET_TWEET_BY_ID = gql`
  query getTweetById($variable: String!) {
    getTweetById(tweetId: $variable) {
      text
      media
      gif
      createdAt
      id
      userRef
    }
  }
`;
