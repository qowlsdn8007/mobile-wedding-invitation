import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { onValue, ref, remove } from 'firebase/database';
import { realtimeDb } from '../../firebase.ts';
import CommentForm from './CommentForm.tsx';
import GuestbookList from './GuestbookList.tsx';
import Modal from '@/components/Modal.tsx';
import { Heading2 } from '@/components/Text.tsx';
import { sha256Hex } from '@/utils/hash.ts';
import type { GuestbookEntry } from '@/types/guestbook.ts';

const guestbookRef = ref(realtimeDb, 'guestbook');

const Guestbook = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [writeOpen, setWriteOpen] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<GuestbookEntry | null>(null);
  const [deletePassword, setDeletePassword] = useState<string>('');
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onValue(guestbookRef, (snapshot) => {
      const value = snapshot.val() as Record<
        string,
        Omit<GuestbookEntry, 'id'>
      > | null;
      const list: GuestbookEntry[] = value
        ? Object.entries(value).map(([id, v]) => ({ id, ...v }))
        : [];
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setEntries(list);
    });
    return () => unsubscribe();
  }, []);

  const closeDelete = () => {
    setDeleteTarget(null);
    setDeletePassword('');
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!deleteTarget || !deletePassword) return;
    try {
      setDeleting(true);
      const hash = await sha256Hex(deletePassword);
      if (hash !== deleteTarget.password) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      await remove(ref(realtimeDb, `guestbook/${deleteTarget.id}`));
      closeDelete();
    } catch {
      alert('삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <GuestBookWrapper>
      <Heading2>
        메시지를 남겨주세요.
        <br />
        결혼식 하루 뒤, 신랑 신부에게 전달됩니다.
      </Heading2>

      <GuestbookList entries={entries} onRequestDelete={setDeleteTarget} />

      <WriteButton type="button" onClick={() => setWriteOpen(true)}>
        작성하기
      </WriteButton>

      <Modal
        isOpen={writeOpen}
        onClose={() => setWriteOpen(false)}
        title="방명록 작성">
        <CommentForm onSuccess={() => setWriteOpen(false)} />
      </Modal>

      <Modal
        isOpen={deleteTarget !== null}
        onClose={closeDelete}
        title="방명록 삭제">
        <DeleteForm onSubmit={handleDelete}>
          <DeleteGuide>비밀번호를 입력하면 삭제됩니다.</DeleteGuide>
          <PasswordInput
            placeholder="비밀번호"
            type="password"
            autoFocus
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
          <DeleteConfirmButton type="submit" disabled={deleting}>
            {deleting ? '삭제 중...' : '삭제'}
          </DeleteConfirmButton>
        </DeleteForm>
      </Modal>
    </GuestBookWrapper>
  );
};

export default Guestbook;

const GuestBookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 50px;
`;

const WriteButton = styled.button`
  padding: 10px 28px;
  border: 1px solid #e88ca6;
  border-radius: 24px;
  background-color: #ffffff;
  color: #e88ca6;
  font-size: 0.95rem;
  font-family: inherit;
  cursor: pointer;
`;

const DeleteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DeleteGuide = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #6b6f68;
`;

const PasswordInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.95rem;
  outline: none;
  border: 1px solid #ccc;
  font-family: inherit;
`;

const DeleteConfirmButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 1rem;
  border: none;
  background-color: #e88ca6;
  color: #ffffff;
  font-family: inherit;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
