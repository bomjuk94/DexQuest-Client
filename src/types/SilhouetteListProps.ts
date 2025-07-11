import { type SetStateAction } from "react";
import { type Silhouette } from "./models";

export interface SilhouetteListProps {
    silhouettes: Silhouette[],
    silhouette: Silhouette,
    silhouettePage: number,
    setSilhouettes: React.Dispatch<SetStateAction<Silhouette[]>>,
}