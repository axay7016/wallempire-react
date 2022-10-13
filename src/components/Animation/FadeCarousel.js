import React, { useState, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'

export default function FadeCarousel({ images, imageStyle }) {
    const [index, set] = useState(0)

    const transitions = useTransition(index, {
        key: index,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 2000 },
    })

    useEffect(() => {
        const t = setInterval(() => set(state => (state + 1) % images.length), 4000)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className="flex fill center">
            {transitions((style, i) => (
                <animated.div
                    style={{
                        position: 'absolute',
                        backgroundImage: `url(${images[i]})`,
                        backgroundSize: 'contain',
                        willChange: 'opacity',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        ...style,
                    }}
                    className={imageStyle}
                />
            ))}
        </div>
    )
}