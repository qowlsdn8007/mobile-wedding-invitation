import { Gallery, Item } from 'react-photoswipe-gallery';
import type PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';
import images from '@/layout/Gallery/Images.ts';

const PhotoGallery = () => {
  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'cover', // 전체 이미지가 보이도록 맞추고 싶을 때는 contain / 비율 유지하고 싶을 때는 cover
    width: '100px',
    height: '150px',
  };

  // 저화질 이미지 확대 시 깨져 보이므로 라이트박스 확대(핀치/더블탭/줌 버튼) 차단
  const galleryOptions = {
    zoom: false,
    initialZoomLevel: 'fit',
    secondaryZoomLevel: 'fit',
    maxZoomLevel: 'fit',
    doubleTapAction: false,
  } as const;

  // 핀치(2-finger) 시 pointerMove 를 취소해 라이트박스 확대 완전 차단
  const disablePinchZoom = (pswp: PhotoSwipe) => {
    pswp.on('pointerMove', (e) => {
      if (pswp.gestures.isMultitouch) {
        e.preventDefault();
      }
    });
  };

  return (
    <Gallery options={galleryOptions} onBeforeOpen={disablePinchZoom}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 0fr)',
          gridGap: 2,
        }}>
        {images.map((image, index) => {
          return (
            <Item
              key={index}
              cropped
              original={image.source}
              thumbnail={image.source}
              width={image.width}
              height={image.height}>
              {({ ref, open }) => (
                <img
                  style={smallItemStyles}
                  alt={image.alt}
                  src={image.source}
                  ref={ref as React.MutableRefObject<HTMLImageElement>}
                  onClick={open}
                />
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;
