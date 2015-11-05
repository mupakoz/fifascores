package com.pkozikowski.fifascores.models

import com.mongodb.casbah.Imports.ObjectId

case class TeamScore(players: Seq[String], team: String, score: Int)

case class Score(_id: ObjectId = new ObjectId, date: String, homeTeamScore: TeamScore, guestTeamScore: TeamScore)

case class ScoreDTO(id: String, date: String, homeTeamScore: TeamScore, guestTeamScore: TeamScore) {
  def this(score: Score) = this(score._id.toString, score.date, score.homeTeamScore, score.guestTeamScore)
}

case class NewScoreDTO(score: String,
                       date: String,
                       guestTeamName: String,
                       guestTeamPlayers: Seq[String],
                       homeTeamName: String,
                       homeTeamPlayers: Seq[String]) {
  def toScore: Score = {
    val homeTeamScore = Integer.valueOf(score.split('-').head)
    val guestTeamScore = Integer.valueOf(score.split('-')(1))
    Score(date = date,
      homeTeamScore = TeamScore(homeTeamPlayers, homeTeamName, homeTeamScore),
      guestTeamScore = TeamScore(guestTeamPlayers, guestTeamName, guestTeamScore))
  }
}