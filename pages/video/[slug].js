import { gql, GraphQLClient } from 'graphql-request';
import Link from 'next/link';
import { useState } from 'react';

export const getServerSideProps = async( pageContext ) => {
    const url = process.env.GRAPH_CMS_ENDPOINT;

    const GraphQLClientLocal = new GraphQLClient(url, {
        headers: {
          "Authorization": process.env.GRAPH_CMS_TOKEN
        }
      });
    const pageSlug = pageContext.query.slug;

    const query = gql`
        query( $pageSlug: String! ) {
            videos(where: {
                slug: $pageSlug
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

    const variables = {
        pageSlug
    }
    
   const data = await GraphQLClientLocal.request(query, variables);

   if (!data || data.videos.length == 0) {
    return {
      notFound: true,
    }
  }
   const video = data.videos;



   return {
       props: {
           video
       }
   }
}

const Video = ({ video }) => {
   const [watching, setWatching] = useState(false);

    return (
        <div>
            <img 
            src={video[0].thumbnail.url} 
            alt={video[0].title}
            className="video-image"
            />
            <div className="info">
                <p>{video[0].tags}</p>
                <p>{video[0].description}</p>
                <Link href="/">Go Back</Link>
                <button 
                    className="video-overlay"
                    onClick={() => {
                        watching ? setWatching(false) : setWatching(true);
                    }}
                >
                    PLAY
                </button>
            </div>
            {watching && (
                <video width="100%" controls>
                    <source src={video[0].mp4.url} type="video/mp4"/>
                </video>
            )
            }
        </div>
    )
}

export default Video;