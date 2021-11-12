import { gql, GraphQLClient } from 'graphql-request';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Section from '../components/Section';


export const getStaticProps = async () => {
  const url = process.env.GRAPH_CMS_ENDPOINT;

  const GraphQLClientLocal = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  });

  const query = gql`
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

  const data = await GraphQLClientLocal.request(query);
  console.log(data);

  return {
    props: {
      "videos": data.videos
    }
  }
}

export const test = () => {
  console.log("Here we are testing");
}




export default function Home({ videos }) {

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
  )
}
