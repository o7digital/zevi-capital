"use client"
import Image, { StaticImageData } from "next/image";
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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
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

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, largeImages.length]);

  if (!activeImage) return null;

  return (
    <div className="media-gallery mt-100 xl-mt-80 lg-mt-60">
      <div id="media_slider" className="row">
        <div className="col-lg-10">
          <div className={` bg-white border-20 md-mb-20 ${style ? "" : "shadow4 p-30"}`}>
            <div className="position-relative z-1 overflow-hidden border-20">
              <button type="button" className="img-fancy-btn border-10 fw-500 fs-16 color-dark" onClick={() => openLightbox(activeIndex)}>
                {t("listingDetails.gallery.view")} {largeImages.length} {t("listingDetails.gallery.photos")}
              </button>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <button type="button" className="zevi-gallery-main" onClick={() => openLightbox(activeIndex)} aria-label="Open photo gallery">
                    <Image
                      src={activeImage.url}
                      alt={activeImage.alt}
                      className="w-100 border-20"
                      width={1060}
                      height={700}
                      priority={activeIndex === 0}
                    />
                  </button>
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
          <div className={`carousel-indicators position-relative p-15 w-100 h-100 ${style ? "" : "border-15 bg-white shadow4"}`}>
            {thumbImages.slice(0, 8).map((image, i) => (
              <button key={i} type="button" onClick={() => setActiveIndex(i)} className={i === activeIndex ? "active" : ""}
                aria-current={i === activeIndex ? "true" : undefined} aria-label={`Slide ${i + 1}`}>
                <Image src={image.url} alt={image.alt} className="w-100 border-10" width={160} height={120} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="zevi-lightbox" role="dialog" aria-modal="true" aria-label="Property photo gallery">
          <button type="button" className="zevi-lightbox__backdrop" onClick={closeLightbox} aria-label="Close gallery"></button>
          <button type="button" className="zevi-lightbox__close" onClick={closeLightbox} aria-label="Close gallery">
            <i className="bi bi-x-lg"></i>
          </button>
          <button type="button" className="zevi-lightbox__arrow zevi-lightbox__arrow--prev" onClick={goToPrevious} aria-label="Previous image">
            <i className="bi bi-chevron-left"></i>
          </button>
          <div className="zevi-lightbox__stage">
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              width={1600}
              height={1050}
              className="zevi-lightbox__image"
              priority
            />
          </div>
          <button type="button" className="zevi-lightbox__arrow zevi-lightbox__arrow--next" onClick={goToNext} aria-label="Next image">
            <i className="bi bi-chevron-right"></i>
          </button>
          <div className="zevi-lightbox__thumbs" aria-label="Gallery thumbnails">
            {largeImages.map((image, i) => (
              <button
                key={i}
                type="button"
                className={`zevi-lightbox__thumb ${i === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`View photo ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <Image src={image.url} alt={image.alt} width={130} height={90} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaGallery
