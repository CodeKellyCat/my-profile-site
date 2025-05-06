import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import "../styles/AboutPage.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper modules (you can import only the ones you need)
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

const AboutPage = () => {
    const [pageData, setPageData] = useState(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch(`${restBase}pages/35?_fields=id,title,content,acf&_embed`).then(res => res.ok ? res.json() : Promise.reject('Page not found')),
            fetch(`${restBase}media?_fields=id,source_url,caption&per_page=100`).then(res => res.ok ? res.json() : Promise.reject('Media not found'))
        ])
            .then(([pageData, mediaData]) => {
                setPageData(pageData);

                const unwantedImageId = [114, 172, 178, 183, 186,];
                const filteredImages = mediaData.filter(img => img.id !== unwantedImageId)
                    .map(img => ({
                        src: img.source_url,
                        caption: img.caption?.rendered || "",
                    }));

                setImages(filteredImages);
                setLoaded(true);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoaded(true);
            });
    }, []);

    if (!isLoaded) return <div>Loading About Page...</div>;
    if (!pageData) return <div className="error">About page not loaded</div>;

    return (
        <div className="about-page-container">
            <div className="swiper-container-wrapper">
                <main className="about-page">
                    <div className="about-content wp-content" dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />

                    {/* Swiper Carousel will go here */}
                    {images.length > 0 && (
                        <Swiper
                            className="about-page-swiper"
                            modules={[Navigation]}
                            navigation
                            slidesPerView={1}
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div className="carousel-item">
                                        <img
                                            src={img.src}
                                            alt={`Slide ${index}`}
                                            className="carousel-image"
                                        />
                                        {img.caption && <p className="image-caption" dangerouslySetInnerHTML={{ __html: img.caption }} />}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AboutPage;