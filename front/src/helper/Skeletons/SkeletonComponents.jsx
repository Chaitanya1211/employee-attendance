import './SkeletonCss.css';

export function SkeletonComponent({type}){
    console.log("type :", type);
    const skeletonType = `skeleton ${type}`;
    return (
        <div className={skeletonType}>
        </div>
    )
}