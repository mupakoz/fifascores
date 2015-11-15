package com.pkozikowski.fifascores.models

import com.pkozikowski.fifascores.models.PlayerType.PlayerType

case class TableDTO(
                     playerRows: Seq[PlayerTableRowDTO]
                     )

object PlayerTableRowDTO {
  def from(player: String, score: Score, playerType: PlayerType): PlayerTableRowDTO = {
    val teamScore = playerType match {
      case PlayerType.Guest => score.guestTeamScore
      case PlayerType.Home => score.homeTeamScore
    }

    val goalsAgainst = playerType match {
      case PlayerType.Guest => score.homeTeamScore.score
      case PlayerType.Home => score.guestTeamScore.score
    }

    val goalsDiff = GoalsDiffDTO(teamScore.score, goalsAgainst)

    val won = if (goalsDiff.scored > goalsDiff.against) 1 else 0
    val draw = if (goalsDiff.scored == goalsDiff.against) 1 else 0
    val lost = if (goalsDiff.scored < goalsDiff.against) 1 else 0
    val points = if (won == 1) 3 else if (draw == 1) 1 else 0

    PlayerTableRowDTO(player, 1, won, draw, lost, points, goalsDiff)
  }

  def empty(nickname: String): PlayerTableRowDTO = {
    PlayerTableRowDTO(nickname, 0, 0, 0, 0, 0, GoalsDiffDTO(0, 0))
  }
}

case class PlayerTableRowDTO(
                              nickname: String,
                              matches: Int,
                              won: Int,
                              draw: Int,
                              lost: Int,
                              points: Int,
                              goalsDiff: GoalsDiffDTO
                              ) {
  def +(rowToAdd: PlayerTableRowDTO): PlayerTableRowDTO = {
    PlayerTableRowDTO(nickname,
      matches + rowToAdd.matches,
      won + rowToAdd.won,
      draw + rowToAdd.draw,
      lost + rowToAdd.lost,
      points + rowToAdd.points,
      goalsDiff + rowToAdd.goalsDiff)
  }
}

case class GoalsDiffDTO(
                         scored: Int,
                         against: Int
                         ) {
  def +(goalsDiff: GoalsDiffDTO): GoalsDiffDTO = {
    GoalsDiffDTO(scored + goalsDiff.scored, against + goalsDiff.against)
  }
}

