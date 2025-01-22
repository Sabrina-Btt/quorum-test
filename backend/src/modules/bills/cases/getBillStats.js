import loadCSV from "../../../services/csvService.js";

const getBillsStats = async () => {
  try {
    const billsCsvPath = process.env.BILLS_CSV;
    const votesCsvPath = process.env.VOTES_CSV;
    const voteResultsCsvPath = process.env.VOTE_RESULTS_CSV;
    const legislatorsCsvPath = process.env.LEGISLATORS_CSV;

    // Carregamento dos arquivos
    const bills = await loadCSV(billsCsvPath);
    const votes = await loadCSV(votesCsvPath);
    const voteResults = await loadCSV(voteResultsCsvPath);
    const legislators = await loadCSV(legislatorsCsvPath);

    // Mapear votos por bill_id para buscas rápidas
    const votesMap = new Map();
    votes.forEach((vote) => {
      if (!votesMap.has(vote.bill_id)) {
        votesMap.set(vote.bill_id, []);
      }
      votesMap.get(vote.bill_id).push(vote);
    });

    // Mapear resultados de votos por vote_id para buscas rápidas
    const voteResultsMap = new Map();
    voteResults.forEach((result) => {
      if (!voteResultsMap.has(result.vote_id)) {
        voteResultsMap.set(result.vote_id, []);
      }
      voteResultsMap.get(result.vote_id).push(result);
    });

    // Mapear legisladores por id para buscas rápidas
    const legislatorsMap = new Map();
    legislators.forEach((legislator) => {
      legislatorsMap.set(legislator.id, legislator.name);
    });

    // Processar os projetos de lei
    const stats = bills.map((bill) => {
      const billVotes = votesMap.get(bill.id) || [];

      let supportersCount = 0;
      let opposersCount = 0;

      billVotes.forEach((vote) => {
        const billVoteResults = voteResultsMap.get(vote.id) || [];

        billVoteResults.forEach((result) => {
          if (result.vote_type === "1") {
            supportersCount++;
          } else if (result.vote_type === "2") {
            opposersCount++;
          }
        });
      });

      const primarySponsor =
        legislatorsMap.get(bill.sponsor_id) || "Unknown Legislator";

      return {
        billId: bill.id,
        title: bill.title,
        supporters: supportersCount,
        opposers: opposersCount,
        primarySponsor,
      };
    });

    return stats;
  } catch (error) {
    console.error("Error in getBillsStats:", error);
    return error;
  }
};

export default getBillsStats;
