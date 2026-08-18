import styled from '@emotion/styled';
import data from 'data.json';
import Host from '../Contact/Host.tsx';
import RoundButton from '@/components/RoundButton.tsx';
import { Caption, Paragraph } from '@/components/Text.tsx';

const Invitation = () => {
  const { greeting } = data;
  return (
    <InvitationWrapper>
      <Paragraph>{greeting.message}</Paragraph>
      <Host />
      <Caption textAlign={'center'}>{greeting.eventDetail}</Caption>
      {/* TODO: 구글캘린더 추가하기 기능을 넣는다면 링크 수정 */}
      <RoundButton
        target="_blank"
        href=""
        rel="noreferrer">
        구글 캘린더 추가하기
      </RoundButton>
      <Notice>{greeting.notice}</Notice>
    </InvitationWrapper>
  );
};

export default Invitation;

const InvitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Notice = styled.p`
  margin: 4px 0 0;
  padding: 14px 18px;
  width: 100%;
  box-sizing: border-box;
  background-color: #f4f7f0;
  border-radius: 12px;
  color: #6b6f68;
  font-size: 0.85rem;
  line-height: 1.7;
  letter-spacing: 0.01em;
  white-space: pre-line;
`;
