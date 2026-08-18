import styled from '@emotion/styled';
import data from 'data.json';
import Host from '../Contact/Host.tsx';
import RoundButton from '@/components/RoundButton.tsx';
import { Caption, Paragraph } from '@/components/Text.tsx';

const toGCalDate = (iso: string) => iso.replace(/[-:]/g, '');

const buildGoogleCalendarUrl = (event: typeof data.event) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toGCalDate(event.start)}/${toGCalDate(event.end)}`,
    ctz: 'Asia/Seoul',
    details: event.details,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const Invitation = () => {
  const { greeting, event } = data;
  return (
    <InvitationWrapper>
      <Paragraph>{greeting.message}</Paragraph>
      <Host />
      <Caption textAlign={'center'}>{greeting.eventDetail}</Caption>
      <RoundButton
        target="_blank"
        href={buildGoogleCalendarUrl(event)}
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
