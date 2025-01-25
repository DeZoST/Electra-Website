"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import fetchPaginatedData from "@/utils/fetchPaginatedData";

export const useInfiniteScroll = (jsonUrl, limit = 24) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const fetchMoreData = useCallback(async () => {
        if (!hasMore || isLoading) return;

        setIsLoading(true);
        try {
            const newData = await fetchPaginatedData(jsonUrl, currentPage, limit);
            console.log("Fetched data:", newData);

            if (Array.isArray(newData) && newData.length > 0) {
                setData((prevData) => {
                    const filteredData = newData.filter(
                        (item) =>
                            !prevData.some((prevItem) => prevItem.title === item.title)
                    );
                    return [...prevData, ...filteredData];
                });

                if (newData.length < limit) {
                    setHasMore(false);
                } else {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [jsonUrl, currentPage, hasMore, isLoading, limit]);

    useEffect(() => {
        setData([]);
        setCurrentPage(1);
        setHasMore(true);
    }, [jsonUrl]);

    useEffect(() => {
        fetchMoreData();
    }, [currentPage]);

    const lastElementRef = useCallback(
        (node) => {
            if (isLoading || !hasMore) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    return { data, isLoading, hasMore, lastElementRef };
};
