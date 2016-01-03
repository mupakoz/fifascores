package com.pkozikowski.fifascores.services

import com.pkozikowski.fifascores.models._

object ProfileService {

  def getMostFrequentPartner(coplayersTable: TableDTO): PartnerDataDTO = {
    val row = coplayersTable.playerRows.maxBy(r => r.matches)
    PartnerDataDTO(row.nickname, row.matches, row.pointsPerGame)
  }

  def getBestPlayer(coplayersTable: TableDTO): PartnerDataDTO = {
    val row = coplayersTable.playerRows.maxBy(r => r.pointsPerGame)
    PartnerDataDTO(row.nickname, row.matches, row.pointsPerGame)
  }

  def getWorstPlayer(coplayersTable: TableDTO): PartnerDataDTO = {
    val row = coplayersTable.playerRows.minBy(r => r.pointsPerGame)
    PartnerDataDTO(row.nickname, row.matches, row.pointsPerGame)
  }

  def getProfile(nickname: String): ProfileDTO = {
    val scores = ScoreDAO.getScoresForPlayer(nickname);
    val chartBuilder = new ProfileChartBuilder()
    val coplayersTable = TableDAO.calculateTable(scores,
      TeamScoreHelpers.coPlayerExtractor(nickname), ScoreHelpers.allTrueFilter)
    val mostFrequentPartner = getMostFrequentPartner(coplayersTable)
    val bestPlayer = getBestPlayer(coplayersTable)
    val worstPlayer = getWorstPlayer(coplayersTable)
    ProfileDTO(
      chartBuilder.build(scores, nickname),
      mostFrequentPartner, bestPlayer, worstPlayer,
      TeamDataDTO.empty, TeamDataDTO.empty, TeamDataDTO.empty
    )
  }
}
