import QueenImage from "./QueenImage";
import styled from "styled-components";

const QueenInfoCard = ({ queen }: any) => {
  return (
    <>
      <Container>
        <ImageContainer>
          <QueenImage queen={queen} />
        </ImageContainer>
        <QueenName>{queen.name}</QueenName>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

const QueenName = styled.div`
  font-weight: 600;
`;

const ImageContainer = styled.div`
  position: relative;
  height: var(--queen-image-height);
  min-width: var(--queen-image-height);
  max-width: var(--queen-image-height);
  object-fit: contain;
  margin-right: 1rem;

  img {
    max-width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;
export default QueenInfoCard;
