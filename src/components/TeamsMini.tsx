import TeamsList from "./TeamsList"
import { type TeamsMiniProps } from "../types/TeamsMiniProps"
import { useEffect } from "react";

const TeamsMini = ({
    teams,
    currentTeams,
    teamsTotalPages,
    goToPrevTeamsPage,
    teamsPage,
    goToNextTeamsPage,
    nameInputs,
    setNameInputs,
    setTeams
}: TeamsMiniProps) => {

    useEffect(() => {
        if (currentTeams.length === 0 && teamsPage > 1) {
            goToPrevTeamsPage();
        }
    }, [currentTeams, teamsPage, goToPrevTeamsPage]);

    return (
        <>
            <div className="flex flex-col gap-10">
                <h3 className="text-xl">Teams</h3>
                <p>Total Teams: {teams?.length}</p>
                <div className="flex flex-col gap-4 items-center dashboard-card-bkgd py-5 px-4 rounded-xl">
                    {currentTeams?.length === 0 ? (
                        <p>No teams yet.</p>
                    ) : (
                        <ul className="flex flex-col gap-4 w-fit">
                            {currentTeams?.map((team) => (
                                <TeamsList
                                    key={team._id}
                                    teams={teams}
                                    team={team}
                                    nameInputs={nameInputs}
                                    setNameInputs={setNameInputs}
                                    setTeams={setTeams}
                                />
                            ))}
                        </ul>
                    )}

                    {teamsTotalPages > 1 && (
                        <div className="flex items-center gap-4 mt-7">
                            <button
                                onClick={goToPrevTeamsPage}
                                disabled={teamsPage === 1}
                                className="cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80 text-sm"
                            >
                                Previous
                            </button>
                            <span>{teamsPage} of {teamsTotalPages}</span>
                            <button
                                onClick={goToNextTeamsPage}
                                disabled={teamsPage === teamsTotalPages}
                                className="cursor-pointer border-none rounded-sm py-1.5 px-2.5 btn-text btn-bkgd hover:opacity-80 text-sm"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TeamsMini