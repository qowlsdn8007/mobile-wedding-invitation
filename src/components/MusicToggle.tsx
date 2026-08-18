import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

// ElevenLabs - A Gentle Awakening (jsDelivr CDN / GitHub repo 서빙)
// 커밋 SHA 고정으로 캐시 무효화 없이 최신 파일 서빙
const BGM_SRC =
  'https://cdn.jsdelivr.net/gh/qowlsdn8007/mobile-wedding-invitation@8bdb880/src/assets/audio/bgm.mp3';

const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 마운트 시 자동재생 시도 (브라우저 정책상 대개 차단 → 조용히 실패)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio.play().catch(() => {
      /* autoplay 차단됨: 사용자가 버튼을 눌러 재생 */
    });
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={BGM_SRC}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <ToggleButton
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? '배경음악 정지' : '배경음악 재생'}
        aria-pressed={isPlaying}
      >
        <Note isPlaying={isPlaying} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm11-2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM9 17.5V6l11-2v9.5" />
        </Note>
      </ToggleButton>
    </>
  );
};

export default MusicToggle;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 100;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid #e6ece1;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  backdrop-filter: blur(2px);
`;

const Note = styled.svg<{ isPlaying: boolean }>`
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #e88ca6;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform-origin: center;
  animation: ${(props) => (props.isPlaying ? spin : 'none')} 3s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
