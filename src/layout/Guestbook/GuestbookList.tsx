import { useState } from 'react';
import styled from '@emotion/styled';
import type { GuestbookEntry } from '@/types/guestbook.ts';

const PAGE_SIZE = 5;

interface GuestbookListProps {
  entries: GuestbookEntry[];
  onRequestDelete: (entry: GuestbookEntry) => void;
}

const GuestbookList = ({ entries, onRequestDelete }: GuestbookListProps) => {
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  if (entries.length === 0) {
    return <Empty>첫 번째 축하 메시지를 남겨주세요. 💌</Empty>;
  }

  const visible = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;

  return (
    <ListWrapper>
      {visible.map((entry) => (
        <Card key={entry.id}>
          <CardHeader>
            <Sender>{entry.sender}</Sender>
            <DeleteButton
              type="button"
              onClick={() => onRequestDelete(entry)}
              aria-label="삭제">
              ×
            </DeleteButton>
          </CardHeader>
          <Message>{entry.message}</Message>
          <DateText>{entry.date}</DateText>
        </Card>
      ))}
      {hasMore && (
        <MoreButton
          type="button"
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
          더보기 ({entries.length - visibleCount})
        </MoreButton>
      )}
    </ListWrapper>
  );
};

export default GuestbookList;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Card = styled.div`
  text-align: left;
  background-color: #f4f7f0;
  border-radius: 12px;
  padding: 14px 16px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const Sender = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #2f2120;
`;

const DeleteButton = styled.button`
  border: none;
  background: none;
  font-size: 1.2rem;
  line-height: 1;
  color: #b7bbb2;
  cursor: pointer;
  padding: 0 4px;
`;

const Message = styled.p`
  margin: 0 0 8px;
  font-size: 0.92rem;
  line-height: 1.6;
  color: #44484d;
  white-space: pre-line;
  word-break: break-word;
`;

const DateText = styled.p`
  margin: 0;
  font-size: 0.72rem;
  color: #9a9e96;
`;

const MoreButton = styled.button`
  align-self: center;
  margin-top: 4px;
  padding: 8px 20px;
  border: 1px solid #dfdfdf;
  border-radius: 20px;
  background-color: #ffffff;
  font-size: 0.85rem;
  color: #44484d;
  font-family: inherit;
  cursor: pointer;
`;

const Empty = styled.p`
  font-size: 0.9rem;
  color: #9a9e96;
  padding: 24px 0;
`;
