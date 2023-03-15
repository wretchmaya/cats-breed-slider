import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState, useEffect } from 'react';
import { Cat } from './rootReducer';

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

export const useFetchCats = () => {
	const [fetchedCats, setFetchedCats] = useState<Cat[]>([]);

	useEffect(() => {
		const fetchCats = async () => {
			const result: Cat[] = [];
			try {
				const response = await fetch(
					'https://api.thecatapi.com/v1/breeds?limit=10'
				);
				const data = await response.json();

				data.forEach((cat: any) => {
					const catObj = {
						id: cat.reference_image_id,
						breedId: cat.id,
						description: cat.description,
						name: cat.name,
					};
					result.push(catObj);
				});

				setFetchedCats(result);

			} catch (error) {
				console.log(error);
			}
		};

		fetchCats();
	}, []);

	return { fetchedCats };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
