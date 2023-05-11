import { queenImages } from "../assets/images.js"

const Image = ({ queen }) => {

  const id = queen.id;
  const name = queen.name;
  const image = queenImages[id];
  return (
    <img src={image} alt={name} />
  )
};

export default Image;