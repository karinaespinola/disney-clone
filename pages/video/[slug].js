import { gql, GraphQLClient } from 'graphql-request';

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

   const video = data.videos;

   return {
       props: {
           video
       }
   }
}

const Video = ({ video }) => {
    console.log(video)
    return (
        <div>

        </div>
    )
}

export default Video;