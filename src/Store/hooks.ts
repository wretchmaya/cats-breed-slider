import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState, useEffect } from 'react';

export const useFetchCatImage = (id: string) => {
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [newImageRequest, setNewImageRequest] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let didCancel = false;
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`
                );
                const data = await response.json();
                const url = data[0].url;

                if (!didCancel) {
                    url === currentImageUrl ? fetchImage() : setCurrentImageUrl(url);
                }
            } catch (error: any) {
                setError(error);
            }
        };

        fetchImage();

        return () => {
            setNewImageRequest(false);
            didCancel = true;
        };
    }, [newImageRequest]);

    return { currentImageUrl, setNewImageRequest };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
