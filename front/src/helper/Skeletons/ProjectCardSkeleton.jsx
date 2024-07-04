import {SkeletonComponent} from "./SkeletonComponents";

export function ProjectCardSkeleton() {
    return (
        <>
                <div class="card">
                    <div class="card-body">
                        <SkeletonComponent type={"thumbnail"} />
                        <SkeletonComponent type={"title"} />
                        <ul class="list-inline mb-0">
                                <SkeletonComponent type={"text"} />
                           
                            <div className="d-flex align-items-center">
                                <SkeletonComponent type={"icon"} /> 
                                <SkeletonComponent type={"text"} />
                            </div>    
                        </ul>
                        <div class="hstack gap-2">
                            <SkeletonComponent type={"button"} />
                        </div>
                    </div>
                </div>
        </>
    )
}