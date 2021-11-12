import { gql, GraphQLClient } from 'graphql-request';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Section from '../components/Section';
import Navbar from '../components/Navbar';


export const getStaticProps = async () => {
  const url = process.env.GRAPH_CMS_ENDPOINT;

  const GraphQLClientLocal = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  });

  const videosQuery = gql`
  query {
    videos{
      createdAt,
      id,
      title,
      description,
      seen,
      slug,
      tags,
      thumbnail {
        url
      },
      mp4 {
        url
      }
    }
  }
`;

 const accountQuery = gql`
    query {
      account(where: {id:"ckv8m2e6wojmz0b734c2v9e2b"}) {
        username
        avatar {
          url
        }
      }
    }
 `; 

  const data = await GraphQLClientLocal.request(videosQuery);
  const accountData = await GraphQLClientLocal.request(accountQuery);

  return {
    props: {
      "videos": data.videos,
      "account": accountData.account
    }
  }
}

export default function Home({ videos, account }) {

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  }

  const userSeenVideos = (videos) => {
    return videos.filter(video => video.seen === false || video.seen == null)
  }

  return (
    <>
      <Navbar account={account} /> 
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}
          />
        </div>
        <div className="videos-section">
          <Section genre="Recommended for you" videos={userSeenVideos(videos)} />
          <Section genre="Family" videos={filterVideos(videos, 'family')} />
          <Section genre="Star Wars" videos={videos}/>
          <Section genre="Marvel" videos={videos}/>
          <Section genre="Pixar" videos={videos} />
          <Section genre="National Geographic" videos={videos} />
          <Section genre="Classic" videos={videos}/>
        </div>
      </div>
    </>
  )
}
