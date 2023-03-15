import { useFetchCatImage } from '../../../Store/hooks';
import { Cat } from '../../../Store/rootReducer';
import { Button } from '../../Button/Button';
import './Slide.scss';
import { CLASSES } from './constans';

interface SlideProps extends Cat {
    isActive: boolean;
}

export const Slide = ({
    breedId,
    name,
    description,
    id,
    isActive,
}: SlideProps): JSX.Element => {
    const { currentImageUrl, setNewImageRequest } = useFetchCatImage(breedId);
    const requestNewImage = () => {
        setNewImageRequest(true);
    };
    return (
        <div
            key={id}
            className={`${CLASSES.SLIDE} ${isActive ? `${CLASSES.ACTIVE}` : ''}`}
        >
            <h1 className={CLASSES.SLIDE_TITLE}>{name}</h1>
            <img src={currentImageUrl} alt={name} className={CLASSES.SLIDE_IMAGE} />
            <Button
                text="New image"
                className={CLASSES.BUTTON_NEW_IMAGE}
                clickHandler={requestNewImage}
            />
            <p className={CLASSES.SLIDE_DESCRIPTION}>{description}</p>
        </div>
    );
};
