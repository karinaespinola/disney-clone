import Image from 'next/image';


const Card = ({ thumbnail }) => {
    console.log(thumbnail);
    return (
        <img 
            src={thumbnail.url}
            alt="Show Thumbnail"
        />
    )
}

export default Card;