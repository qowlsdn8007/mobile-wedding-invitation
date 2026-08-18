import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  box-sizing: border-box; /* border를 폭 안에 포함 → 프레임이 뷰포트 가장 바깥에 위치 */
  border: 30px solid transparent; /* 테두리의 초기 값 설정 */
  border-image-source: url('/background.png'); /* 이미지 경로 설정 */
  border-image-slice: 30% 49%; /* 이미지의 크기 설정 */
  border-image-width: 280px; /* 테두리 이미지의 너비 설정 */
  background-color: #ffffff;
  width: 100%;
  min-height: 100vh; /* 상·하 프레임도 뷰포트 끝까지 채움 */
  margin: 0 auto;
  
  @media screen and (min-width: 500px) {
      width: 500px;
  }
`;
export default Container;
