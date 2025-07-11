import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProtectedProfile } from "../hooks/useProtectedProfile";
import { usePagination } from "../hooks/usePagination";
import { capitalizeName } from "../utilities/capitalizeName";
import PokeballSpinner from "../components/PokeballSpinner";
import { useFetchFavourites } from "../hooks/useFetchFavourites";
import { useFetchTeams } from "../hooks/useFetchTeams";
import { type Teams } from "../types/models";
import { useFetchSilhouette } from "../hooks/useFetchSilhouette";
import { useFetchComparisons } from "../hooks/useFetchComparison";
import FavouritesMini from "../components/FavouritesMini";
import TeamsMini from "../components/TeamsMini";
import SilhouetteMini from "../components/SilhouetteMini";
import ComparisonsMini from "../components/ComparisonsMini";
import { useCommonTypes } from "../hooks/useCommonTypes";
import { Helmet } from 'react-helmet'

const Dashboard = () => {
    const { profile, token, error } = useProtectedProfile();
    const navigate = useNavigate();

    useEffect(() => {
        if (error === "sessionExpired") {
            navigate("/login?error=sessionExpired");
        }
    }, [error, navigate]);

    const [loading, setLoading] = useState(true);
    const [favouritesSearchTerm, setFavouritesSearchTerm] = useState("");
    const [favouritesCommonTypes, setFavouritesCommonTypes] = useState<string[]>([]);
    const [favouritesTypes, setFavouritesTypes] = useState<string[]>([]);
    const [favouritesTypesSelectTerm, setFavouritesTypesSelectTerm] = useState("");
    const [teams, setTeams] = useState<Teams | null>([]);
    const [nameInputs, setNameInputs] = useState<Record<string, string>>({});

    const { favouritesList, setFavouritesList } = useFetchFavourites()
    useFetchTeams(setTeams, setNameInputs)
    const { silhouettes, setSilhouettes, silhouetteHighScore, silhouetteAverageScore } = useFetchSilhouette()
    const { comparisons, comparisonNameInputs, setComparisons, setComparisonNameInputs } = useFetchComparisons()

    const filteredFavourites = favouritesList.filter((poke) => {
        const nameMatch = poke.name.toLowerCase().includes(favouritesSearchTerm.trim().toLowerCase());
        const typeMatch = favouritesTypesSelectTerm
            ? poke.types.some((t) => t.type.name.toLowerCase() === favouritesTypesSelectTerm.trim().toLowerCase())
            : true;
        return nameMatch && typeMatch;
    });

    const { currentPage: favouritesPage, totalPages: favouritesTotalPages, currentItems: currentFavourites, goToNextPage: goToNextFavouritesPage, goToPreviousPage: goToPrevFavouritesPage } = usePagination(filteredFavourites, 4);
    const { currentPage: teamsPage, totalPages: teamsTotalPages, currentItems: currentTeams, goToNextPage: goToNextTeamsPage, goToPreviousPage: goToPrevTeamsPage } = usePagination(teams, 1);
    const { currentPage: silhouettePage, totalPages: silhouetteTotalPages, currentItems: currentSilhouette, goToNextPage: goToNextSilhouettePage, goToPreviousPage: goToPrevSilhouettePage } = usePagination(silhouettes, 1);
    const { currentPage: comparisonsPage, totalPages: comparisonsTotalPages, currentItems: currentComparisons, goToNextPage: goToNextComparisonsPage, goToPreviousPage: goToPrevComparisonsPage } = usePagination(comparisons, 1);

    useEffect(() => {
        if (favouritesList && teams && silhouettes && comparisons) {
            setLoading(false)
        }
    }, [token, comparisons, favouritesList, silhouettes]);

    useCommonTypes(favouritesList, setFavouritesCommonTypes, setFavouritesTypes)

    if (loading) return <PokeballSpinner />
    if (error && error !== "sessionExpired") return <p>Error: {error}</p>;
    if (!profile) return null;

    return (
        <>
            <Helmet>
                <title>Dashboard - DexQuest</title>
                <meta name="description" content="View your activity in a user-friendly and easily accessible format." />
            </Helmet>
            <div className="bg-primary">
                <div className="flex flex-col gap-20 items-center my-0 mx-auto py-20 px-4 max-w-desktop">
                    <div className="bg-primary flex flex-col w-full gap-16">
                        <section className="flex flex-col gap-9">
                            <h2 className="text-4xl text-primary">Dashboard</h2>
                            <div className="flex flex-col gap-1">
                                <p>Welcome back {capitalizeName(profile.username)}</p>
                                <p>Here is your overview so far</p>
                            </div>
                        </section>

                        <div className="flex flex-col gap-20 sm:grid sm:grid-cols-2 sm:gap-y-32">

                            <FavouritesMini
                                favouritesList={favouritesList}
                                favouritesCommonTypes={favouritesCommonTypes}
                                favouritesSearchTerm={favouritesSearchTerm}
                                setFavouritesSearchTerm={setFavouritesSearchTerm}
                                setFavouritesTypesSelectTerm={setFavouritesTypesSelectTerm}
                                favouritesTypes={favouritesTypes}
                                currentFavourites={currentFavourites}
                                favouritesTotalPages={favouritesTotalPages}
                                setFavouritesList={setFavouritesList}
                                goToPrevFavouritesPage={goToPrevFavouritesPage}
                                favouritesPage={favouritesPage}
                                goToNextFavouritesPage={goToNextFavouritesPage}
                            />

                            <TeamsMini
                                teams={teams}
                                currentTeams={currentTeams}
                                teamsTotalPages={teamsTotalPages}
                                goToPrevTeamsPage={goToPrevTeamsPage}
                                teamsPage={teamsPage}
                                goToNextTeamsPage={goToNextTeamsPage}
                                nameInputs={nameInputs}
                                setNameInputs={setNameInputs}
                                setTeams={setTeams}
                            />

                            <SilhouetteMini
                                silhouettes={silhouettes}
                                silhouetteHighScore={silhouetteHighScore}
                                silhouetteAverageScore={silhouetteAverageScore}
                                currentSilhouette={currentSilhouette}
                                silhouetteTotalPages={silhouetteTotalPages}
                                goToPrevSilhouettePage={goToPrevSilhouettePage}
                                silhouettePage={silhouettePage}
                                setSilhouettes={setSilhouettes}
                                goToNextSilhouettePage={goToNextSilhouettePage}
                            />

                            <ComparisonsMini
                                comparisons={comparisons}
                                currentComparisons={currentComparisons}
                                comparisonNameInputs={comparisonNameInputs}
                                setComparisonNameInputs={setComparisonNameInputs}
                                setComparisons={setComparisons}
                                comparisonsTotalPages={comparisonsTotalPages}
                                goToPrevComparisonsPage={goToPrevComparisonsPage}
                                comparisonsPage={comparisonsPage}
                                goToNextComparisonsPage={goToNextComparisonsPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
