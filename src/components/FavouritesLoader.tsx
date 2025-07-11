import { useFetchFavourites } from "../hooks/useFetchFavourites";

export const FavouritesLoader = ({ children }: { children: React.ReactNode }) => {
    const { loading } = useFetchFavourites()

    if (loading) {
        return <div style={{ padding: "2rem" }}>Loading your favourites...</div>;
    }

    return <>{children}</>;
};
