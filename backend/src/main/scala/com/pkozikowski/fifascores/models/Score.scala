package com.pkozikowski.fifascores.models

import com.mongodb.casbah.Imports.ObjectId

case class TeamScore(players: Seq[String], team: String, score: Int)

case class Score(_id: ObjectId = new ObjectId, date: String, homeTeamScore: TeamScore, guestTeamScore: TeamScore)

case class ScoreDTO(date: String, homeTeamScore: TeamScore, guestTeamScore: TeamScore) {
  def this(score: Score) = this(score.date, score.homeTeamScore, score.guestTeamScore)
}

case class NewScoreDTO(score: String,
                       date: String,
                       guestTeamName: String,
                       guestTeamPlayers: String,
                       homeTeamName: String,
                       homeTeamPlayers: String) {
  def toScore: Score = {
    val homeTeamPlayersSeq = homeTeamPlayers.split(',')
    val guestTeamPlayersSeq = guestTeamPlayers.split(',')
    val homeTeamScore = Integer.valueOf(score.split('-').head)
    val guestTeamScore = Integer.valueOf(score.split('-')(1))
    Score(date = date,
      homeTeamScore = TeamScore(homeTeamPlayersSeq, homeTeamName, homeTeamScore),
      guestTeamScore = TeamScore(guestTeamPlayersSeq, guestTeamName, guestTeamScore))
  }
}