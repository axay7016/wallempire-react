import React, { useState, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'

export default function ImageFadeIn({ images, imageStyle, onClick }) {

    const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {
        return (
            <img
                {...{ src: placeholderSrc, ...props }}
                alt={props.alt || ""}
                className="image"
            />
        );
    };

    const [index, set] = useState(0)

    const transitions = useTransition(index, {
        key: index,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        config: { duration: 1000 },
    })

    useEffect(() => {
        const t = setInterval(() => set(state => (state + 1) % images.length), 1000)
        return () => clearTimeout(t)
    }, [])


    return (
        <div className="flex fill center">
            {transitions((style, i) => (
                <ProgressiveImg
                    src={images[i]}
                    placeholderSrc={images[i]}
                    width="700"
                    height="465"
                />

            ))}
        </div>
    )
}