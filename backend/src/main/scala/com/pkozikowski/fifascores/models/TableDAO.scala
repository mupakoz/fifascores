package com.pkozikowski.fifascores.models

object TableDAO {
  def getTable(): TableDTO = {
    val allScores = ScoreDAO.all()
    calculateTable(allScores, TeamScoreHelpers.singlePlayerExtractor, ScoreHelpers.allTrueFilter)
  }

  def getMonthSingleTable(): TableDTO = {
    val allScores = ScoreDAO.all()
    calculateTable(allScores, TeamScoreHelpers.singlePlayerExtractor, ScoreHelpers.thisMonthFilter)
  }

  def getPairsTable(): TableDTO = {
    val allScores = ScoreDAO.all()
    calculateTable(allScores, TeamScoreHelpers.pairExtractor, ScoreHelpers.allTrueFilter)
  }

  private def calculateTable(scores: Seq[Score], playersExtractor: TeamScore => Seq[String], scoreFilter: Score => Boolean): TableDTO = {
    val tableHelper = new TableBuilder()

    scores
      .filter(scoreFilter)
      .foreach { score =>
        tableHelper.addScore(score, playersExtractor)
      }

    tableHelper.getTableDTO()
  }
}
