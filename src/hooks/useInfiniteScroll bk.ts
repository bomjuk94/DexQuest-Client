import { useEffect, useRef } from 'react'
import { throttle } from '../utilities/throttle'

type UseInfiniteScrollParams = {
    hasMore: boolean
    onLoadMore: () => void
    delay?: number
}

export const useInfiniteScroll = (
    loaderRef: React.RefObject<HTMLElement>,
    { hasMore, onLoadMore, delay = 300 }: UseInfiniteScrollParams
) => {
    const throttledLoad = useRef(throttle(onLoadMore, delay))

    useEffect(() => {
        const node = loaderRef.current
        if (!node) return

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0]
                if (first.isIntersecting && hasMore) {
                    throttledLoad.current()
                }
            },
            {
                threshold: 1.0,
                rootMargin: '100px',
            }
        )

        observer.observe(node)

        return () => {
            observer.disconnect()
            throttledLoad.current.cancel()
        }
    }, [hasMore, loaderRef])
}
