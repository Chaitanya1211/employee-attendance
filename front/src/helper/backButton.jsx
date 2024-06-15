import { useNavigate } from 'react-router-dom';

export function BackBtn() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // This navigates back in the history stack
    };

    return <>
        <i class="fa-solid fa-arrow-left me-3" onClick={handleBackClick}></i>
    </>
}