"use client"
import Image, { StaticImageData } from "next/image";
import Fancybox from "@/components/common/Fancybox";
import { useTranslation } from "@/contexts/TranslationContext";
import { useEffect, useState } from "react";

import bigCarousel_1 from "@/assets/images/listing/img_43.jpg"
import bigCarousel_2 from "@/assets/images/listing/img_44.jpg"
import bigCarousel_3 from "@/assets/images/listing/img_45.jpg"
import bigCarousel_4 from "@/assets/images/listing/img_46.jpg"

import smallCarousel_1 from "@/assets/images/listing/img_43_s.jpg"
import smallCarousel_2 from "@/assets/images/listing/img_44_s.jpg"
import smallCarousel_3 from "@/assets/images/listing/img_45_s.jpg"
import smallCarousel_4 from "@/assets/images/listing/img_46_s.jpg"

const largeThumb: string[] = ["1", "2", "3"];

interface DataType {
  big_carousel: StaticImageData[];
  small_carousel: StaticImageData[];
}

const gallery_data: DataType = {
  big_carousel: [bigCarousel_1, bigCarousel_2, bigCarousel_3, bigCarousel_4],
  small_carousel: [smallCarousel_1, smallCarousel_2, smallCarousel_3, smallCarousel_4],
}

const { big_carousel, small_carousel } = gallery_data;

interface GalleryImage {
  url: string;
  alt: string;
}

const MediaGallery = ({ style, images = [] }: { style?: boolean; images?: GalleryImage[] }) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const hasDirectusImages = images.length > 0;
  const largeImages = hasDirectusImages ? images : big_carousel.map((image, index) => ({ url: image, alt: `Property image ${index + 1}` }));
  const thumbImages = hasDirectusImages ? images : small_carousel.map((image, index) => ({ url: image, alt: `Property thumbnail ${index + 1}` }));
  const activeImage = largeImages[activeIndex] || largeImages[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? largeImages.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % largeImages.length);
  };

  if (!activeImage) return null;

  return (
    <div className="media-gallery mt-100 xl-mt-80 lg-mt-60">
      <div id="media_slider" className="row">
        <div className="col-lg-10">
          <div className={` bg-white border-20 md-mb-20 ${style ? "" : "shadow4 p-30"}`}>
            <div className="position-relative z-1 overflow-hidden border-20">
              <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark">
                {t("listingDetails.gallery.view")} {largeImages.length} {t("listingDetails.gallery.photos")}
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: true,
                    },
                  }}
                >
                  {largeImages.map((image, index) => (
                    <a key={index} className="d-block" data-fancybox="img2" href={typeof image.url === "string" ? image.url : ""}></a>
                  ))}
                </Fancybox>
              </div>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <Image
                    src={activeImage.url}
                    alt={activeImage.alt}
                    className="w-100 border-20"
                    width={1060}
                    height={700}
                    priority={activeIndex === 0}
                  />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" onClick={goToPrevious} aria-label="Previous image">
                <i className="bi bi-chevron-left"></i>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" onClick={goToNext} aria-label="Next image">
                <i className="bi bi-chevron-right"></i>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-2">
          <div className={`media-gallery__thumbs p-15 w-100 h-100 ${style ? "" : "border-15 bg-white shadow4"}`}>
            {thumbImages.slice(0, 8).map((image, i) => (
              <button key={i} type="button" onClick={() => setActiveIndex(i)} className={i === activeIndex ? "active" : ""}
                aria-current={i === activeIndex ? "true" : undefined} aria-label={`Slide ${i + 1}`}>
                <Image src={image.url} alt={image.alt} className="border-10" width={190} height={135} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .media-gallery__thumbs {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 760px;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .media-gallery__thumbs button {
          display: block;
          width: 100%;
          min-height: 94px;
          padding: 0;
          border: 2px solid transparent;
          border-radius: 12px;
          background: transparent;
          overflow: hidden;
          opacity: 0.78;
          transition: border-color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
        }
        .media-gallery__thumbs button:hover,
        .media-gallery__thumbs button.active {
          border-color: #c8a96b;
          opacity: 1;
          transform: translateY(-1px);
        }
        .media-gallery__thumbs :global(img) {
          display: block;
          width: 100%;
          height: 112px;
          object-fit: cover;
        }
        .carousel-inner :global(img) {
          aspect-ratio: 1060 / 700;
          object-fit: cover;
        }
        @media (max-width: 991px) {
          .media-gallery__thumbs {
            flex-direction: row;
            height: auto !important;
            max-height: none;
            overflow-x: auto;
            padding: 12px !important;
          }
          .media-gallery__thumbs button {
            flex: 0 0 128px;
            min-height: 86px;
          }
          .media-gallery__thumbs :global(img) {
            height: 86px;
          }
        }
      `}</style>
    </div>
  )
}

export default MediaGallery
