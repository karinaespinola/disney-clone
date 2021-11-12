import { gql, GraphQLClient } from 'graphql-request';
import styles from '../styles/Home.module.css'

export const getStaticProps = async () => {
  const url = process.env.GRAPH_CMS_ENDPOINT;

  const GraphQLClientLocal = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  });

  const query = gql`
  query {
    videos(where: {
      slug: "mulan"
    }) {
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




export default function Home() {
  return (
    <div>Hello</div>
  )
}
