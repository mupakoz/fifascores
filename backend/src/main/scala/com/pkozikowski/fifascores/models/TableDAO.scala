package com.pkozikowski.fifascores.models

import scala.collection.mutable

object TableDAO {
  def getTable(): TableDTO = {
    val allScores = ScoreDAO.all()
    calculateTable(allScores)
  }

  private def calculateTable(scores: Seq[Score]): TableDTO = {
    val tableHelper = new TableBuilder()

    scores.foreach{ score =>
      tableHelper.addScore(score)
    }

    tableHelper.getTableDTO()
  }
}
