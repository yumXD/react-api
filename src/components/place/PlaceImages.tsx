import React from 'react';
import '../../styles/PlaceImages.css';
import {useRecoilState} from "recoil";
import {currentIndexState, isModalOpenState} from "../../recoil/modalState";

interface PlaceImagesProps {
    images: string[];
}

function PlaceImages({images}: PlaceImagesProps) {
    const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="slider">
                <button className="slider-button prev-button" onClick={prevSlide}>
                    &#10094;
                </button>
                <div className="slider-images" onClick={openModal}>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index}`}
                            className={`slider-image ${
                                index === currentIndex ? 'active' : ''
                            }`}
                        />
                    ))}
                </div>
                <button className="slider-button next-button" onClick={nextSlide}>
                    &#10095;
                </button>
                <div className="dots-container">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${
                                index === currentIndex ? 'active' : ''
                            }`}
                        ></span>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-background" onClick={closeModal}>
                    <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                        <span className="close-modal" onClick={closeModal}>&times;</span>
                        <button className="modal-button prev-button" onClick={prevSlide}>
                            &#10094;
                        </button>
                        <img
                            className="modal-content"
                            src={images[currentIndex]}
                            alt={`Original Slide ${currentIndex}`}
                        />
                        <button className="modal-button next-button" onClick={nextSlide}>
                            &#10095;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlaceImages;