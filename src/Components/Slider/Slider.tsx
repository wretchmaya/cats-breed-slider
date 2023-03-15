import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../Store/hooks';
import { addCats, selectCats } from '../../Store/rootReducer';
import { Slide } from './Slide/Slide';
import './Slider.scss';
import { useFetchCats } from '../../Store/hooks';
import { Button } from '../Button/Button';
import ProgressBar from '@ramonak/react-progress-bar';
import { CLASSES } from './constants';

export function Slider(): JSX.Element {
    const { cats } = useAppSelector(selectCats);
    const dispatch = useAppDispatch();
    const { fetchedCats } = useFetchCats();

    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(10);

    const currentProgressNumber = `${activeIndex + 1}/${cats.length}`;
    const getCurrentBarProgress = (index: number) => ((index + 1) / cats.length) * 100;

    const handlePrevClick = () => {
        const index = activeIndex === 0 ? cats.length - 1 : activeIndex - 1;
        setActiveIndex(index);
        handleProgressBar(index);
    };

    const handleNextClick = () => {
        const index = activeIndex === cats.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(index);
        handleProgressBar(index);
    };

    const handleProgressBar = (index: number) => {
        const currentBarProgress = getCurrentBarProgress(index);
        setProgress(currentBarProgress);
    };

    useEffect(() => {
        dispatch(addCats(fetchedCats));
    }, [fetchedCats]);

    return (
        <>
            <div className={CLASSES.SLIDER}>
                <div className={CLASSES.SLIDES_CONTAINER}>
                    {cats.map((cat, index) => (
                        <Slide {...cat} key={cat.id} isActive={index === activeIndex} />
                    ))}
                </div>

                <Button
                    text="Prev"
                    clickHandler={handlePrevClick}
                    className={CLASSES.BUTTON_PREVIOUS}
                />
                <Button
                    text="Next"
                    clickHandler={handleNextClick}
                    className={CLASSES.BUTTON_NEXT}
                />
            </div>
            <div className={CLASSES.PROGRESS_BAR_CONTAINER}>
                <span className={CLASSES.PROGRESS_BAR_PROGRESS}>
                    {currentProgressNumber}
                </span>
                <ProgressBar
                    completed={progress}
                    isLabelVisible={false}
                    width="300px"
                    height="7px"
                    margin="0 auto"
                    bgColor="#7e5ae1"
                />
            </div>
        </>
    );
}
