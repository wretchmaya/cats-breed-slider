import './Button.scss';

interface ButtonProps {
    text: string;
    clickHandler: () => void;
    className: string;
}
export const Button = ({ text, clickHandler, className }: ButtonProps): JSX.Element => {
    return (
        <button onClick={clickHandler} className={`button ${className}`}>
            {text}
        </button>
    );
};
