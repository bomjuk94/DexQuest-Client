import { useState, useRef } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const InfiniteScroll = () => {
    const [items, setItems] = useState(Array.from({ length: 20 }));
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef<HTMLElement | null>(null);

    const fetchMoreData = () => {
        if (items.length >= 100) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setItems((prev) => [...prev, ...Array.from({ length: 20 })]);
        }, 1500);
    };

    useInfiniteScroll(loader, { hasMore, onLoadMore: fetchMoreData, delay: 500 });

    return (
        <div>
            <ul>
                {items.map((_, index) => (
                    <li key={index} style={{ padding: "20px", border: "1px solid #ccc" }}>
                        Item {index + 1}
                    </li>
                ))}
            </ul>
            {hasMore && (
                <div ref={loader} style={{ height: "50px", textAlign: "center" }}>
                    Loading...
                </div>
            )}
        </div>
    );
};

export default InfiniteScroll;
