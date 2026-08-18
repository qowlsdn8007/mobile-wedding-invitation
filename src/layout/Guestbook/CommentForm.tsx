import { useState } from 'react';
import styled from '@emotion/styled';
import { push, ref, serverTimestamp } from 'firebase/database';
import { realtimeDb } from '../../firebase.ts';
import { sha256Hex } from '@/utils/hash.ts';

const guestbookRef = ref(realtimeDb, 'guestbook');

interface CommentFormProps {
  onSuccess?: () => void;
}

const CommentForm = ({ onSuccess }: CommentFormProps) => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !password || !message.trim()) {
      alert('이름, 비밀번호, 메시지를 모두 채워주세요. 🥹');
      return;
    }
    try {
      setSubmitting(true);
      const guestbookMessage = {
        sender: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
        date: new Date().toLocaleString('ko-KR'),
        password: await sha256Hex(password),
      };
      await push(guestbookRef, guestbookMessage);
      alert('메시지를 보냈습니다. 💌');
      setName('');
      setPassword('');
      setMessage('');
      onSuccess?.();
    } catch {
      alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Row>
        <NameInput
          placeholder="이름"
          type="text"
          maxLength={20}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <NameInput
          placeholder="삭제 비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Row>
      <MessageInput
        placeholder="축하 메시지를 남겨주세요."
        maxLength={500}
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SubmitButton type="submit" disabled={submitting}>
        {submitting ? '등록 중...' : '등록'}
      </SubmitButton>
    </FormWrapper>
  );
};

export default CommentForm;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: visible;
  align-items: stretch;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const NameInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.95rem;
  line-height: 1;
  outline: none;
  border: 1px solid #ccc;
  font-family: inherit;
  font-weight: 300;
`;

const MessageInput = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.95rem;
  line-height: 1.5;
  outline: none;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
  font-weight: 300;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid transparent;
  background-color: #e88ca6;
  color: #ffffff;
  font-family: inherit;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
