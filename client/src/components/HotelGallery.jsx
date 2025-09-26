import React, { useState } from "react";
import "./HotelGallery.css";

const HotelGallery = ({ photos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) return <p>No images available</p>;

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % photos.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="hotel-gallery">
      {/* Initial preview */}
      <div className="main-image-container">
        <img
          src={photos[0].url}
          alt="Hotel"
          className="main-image"
          onClick={() => openModal(0)}
        />
      </div>

      <div className="thumbnails">
        {photos.slice(1, 7).map((photo, idx) => (
          <img
            key={idx}
            src={photo.url}
            alt={`Thumbnail ${idx + 1}`}
            className="thumbnail"
            onClick={() => openModal(idx + 1)}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
          <button className="prev-btn" onClick={prevImage}>
            &#10094;
          </button>
          <img src={photos[currentIndex].url} alt="Gallery" className="modal-image" />
          <button className="next-btn" onClick={nextImage}>
            &#10095;
          </button>

          <div className="modal-thumbnails">
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo.url}
                alt={`Modal thumb ${idx}`}
                className={`modal-thumb ${
                  idx === currentIndex ? "active-thumb" : ""
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelGallery;
