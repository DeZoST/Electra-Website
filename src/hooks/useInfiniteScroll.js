"use client";

import { useState, useEffect, useRef } from "react";
import fetchPaginatedData from "@/utils/fetchPaginatedData";

export const useInfiniteScroll = (jsonUrl, limit = 5) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const fetchMoreData = async () => {
        if (!hasMore || isLoading) return;

        setIsLoading(true);
        try {
            const newData = await fetchPaginatedData(
                jsonUrl,
                currentPage,
                limit
            );

            if (newData.length < limit) {
                // If fetched data is less than limit, we assume no more data is available
                setHasMore(false);
            }

            setData((prevData) => {
                const filteredData = newData.filter(
                    (item) =>
                        !prevData.some(
                            (prevItem) => prevItem.title === item.title
                        )
                );
                return [...prevData, ...filteredData];
            });

            if (newData.length > 0) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setData([]);
        setCurrentPage(1);
        setHasMore(true);
        fetchMoreData();
    }, [jsonUrl]);

    const lastElementRef = (node) => {
        if (isLoading || !hasMore) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMoreData();
            }
        });

        if (node) observer.current.observe(node);
    };

    return { data, isLoading, hasMore, lastElementRef };
};
