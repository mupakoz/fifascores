package com.pkozikowski.fifascores.models

import com.pkozikowski.fifascores.models.PlayerType.PlayerType

import scala.collection.mutable

class TableBuilder {
  val playerScores = mutable.Map[String, PlayerTableRowDTO]()

  def mergeToExistingRow(valuesToAdd: PlayerTableRowDTO) = {
    val newRow = playerScores(valuesToAdd.nickname) + valuesToAdd
    playerScores(valuesToAdd.nickname) = newRow
  }

  def addValues(valuesToAdd: PlayerTableRowDTO) = {
    if (!playerScores.contains(valuesToAdd.nickname)) {
      playerScores(valuesToAdd.nickname) = valuesToAdd
    } else {
      mergeToExistingRow(valuesToAdd)
    }
  }

  def addValuesForPlayer(player: String, score: Score, playerType: PlayerType) = {
    val valuesToAdd: PlayerTableRowDTO = PlayerTableRowDTO.from(player, score, playerType)
    addValues(valuesToAdd)
  }

  def addScore(score: Score, playersExtractor: TeamScore => Seq[String]) = {
    val matchResult = score.result

    playersExtractor(score.homeTeamScore).foreach { player =>
      addValuesForPlayer(player, score, PlayerType.Home)
    }

    playersExtractor(score.guestTeamScore).foreach { player =>
      addValuesForPlayer(player, score, PlayerType.Guest)
    }
  }

  def getTableDTO(): TableDTO = {
    TableDTO(playerScores.values.toSeq)
  }
}
