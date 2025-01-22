import loadCSV from "../../../services/csvService.js";

const getLegislatorsStats = async () => {
  try {
    const legislatorsCsvPath = process.env.LEGISLATORS_CSV;
    const voteResultsCsvPath = process.env.VOTE_RESULTS_CSV;
    const votesCsvPath = process.env.VOTES_CSV;

    const legislators = await loadCSV(legislatorsCsvPath);
    const voteResults = await loadCSV(voteResultsCsvPath);
    const votes = await loadCSV(votesCsvPath);

    // Criando Map para acesso rápido a dados
    const voteResultsMap = new Map(
      voteResults.map((result) => [result.vote_id, result])
    );
    const votesMap = new Map(votes.map((vote) => [vote.id, vote]));

    const stats = legislators.map((legislator) => {
      // Filtrando os resultados de votos relacionados ao legislador
      const legislatorVoteResults = voteResults.filter(
        (result) => result.legislator_id === legislator.id
      );

      // Contando votos "a favor" e "contra" de forma eficiente
      let supportedCount = 0;
      let opposedCount = 0;

      legislatorVoteResults.forEach((result) => {
        const vote = votesMap.get(result.vote_id);
        if (vote) {
          // Conta votos "a favor" e "contra"
          if (result.vote_type === "1") {
            supportedCount++;
          } else if (result.vote_type === "2") {
            opposedCount++;
          }
        }
      });

      return {
        name: legislator.name,
        supportedBills: supportedCount,
        opposedBills: opposedCount,
      };
    });

    return stats;
  } catch (error) {
    console.error("Error in getLegislatorsStats:", error);
    return error;
  }
};

export default getLegislatorsStats;
