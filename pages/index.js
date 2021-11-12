import { gql, GraphQLClient } from 'graphql-request';
import styles from '../styles/Home.module.css';
import Image from 'next/image'

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

  return (
    <div className="app">
      <div className="main-video">
      <Image
        src={randomVideo(videos).thumbnail.url}
        alt={randomVideo(videos).title}
        layout="fill"
      />
      </div>
    </div>
  )
}
