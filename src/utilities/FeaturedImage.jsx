// Description: FeaturedImage component to display the featured image of a post or page.
// featuredImageObject: The featured image object from the REST API.

import { useState, useEffect } from 'react';

const FeaturedImage = ({ featuredImageObject }) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        // Handle both direct media objects and embedded media objects
        const mediaObject = featuredImageObject?.media_details
            ? featuredImageObject  // Direct media object
            : featuredImageObject;  // Embedded media object from _embedded

        if (mediaObject?.source_url) {
            setImageData({
                url: mediaObject.source_url,
                alt: mediaObject.alt_text || '',
                width: mediaObject.media_details?.width || 800,
                height: mediaObject.media_details?.height || 600,
                sizes: mediaObject.media_details?.sizes || {}
            });
        }
    }, [featuredImageObject]);

    if (!imageData) {
        return (
            <div className="featured-image-placeholder">
                <svg width="50" height="50" viewBox="0 0 24 24">
                    <path fill="#ccc" d="M8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" />
                    <path fill="none" stroke="#999" strokeWidth="2" d="M1 3h22v18H1V3zm3 3a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
            </div>
        );
    }

    const generateSrcSet = () => {
        const { sizes } = imageData;
        return [
            sizes?.full && `${sizes.full.source_url} ${sizes.full.width}w`,
            sizes?.large && `${sizes.large.source_url} ${sizes.large.width}w`,
            sizes?.medium_large && `${sizes.medium_large.source_url} ${sizes.medium_large.width}w`,
            sizes?.medium && `${sizes.medium.source_url} ${sizes.medium.width}w`
        ].filter(Boolean).join(', ');
    };

    return (
        <figure className="featured-image">
            <img
                src={imageData.url}
                width={imageData.width}
                height={imageData.height}
                alt={imageData.alt}
                srcSet={generateSrcSet()}
                sizes={`(max-width: ${imageData.width}px) 100vw, ${imageData.width}px`}
                loading="lazy"
                style={{ display: 'block', width: '100%', height: 'auto' }}
            />
        </figure>
    );
};

export default FeaturedImage;