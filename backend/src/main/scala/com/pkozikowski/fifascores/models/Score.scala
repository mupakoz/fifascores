package com.pkozikowski.fifascores.models

import com.mongodb.casbah.Imports.ObjectId
import com.pkozikowski.fifascores.models.MatchResult.MatchResult

import scala.collection.mutable

object MatchResult extends Enumeration {
  type MatchResult = Value
  val HomeTeamWon, GuestTeamWon, Draw = Value
}

object PlayerType extends Enumeration {
  type PlayerType = Value
  val Home, Guest = Value
}

case class TeamScore(
                      players: Seq[String],
                      team: String,
                      score: Int)

case class Score(
                  _id: ObjectId = new ObjectId,
                  date: String,
                  homeTeamScore: TeamScore,
                  guestTeamScore: TeamScore) {
  lazy val result: MatchResult = {
    if (homeTeamScore.score > guestTeamScore.score) {
      MatchResult.HomeTeamWon
    } else if (homeTeamScore.score == guestTeamScore.score) {
      MatchResult.GuestTeamWon
    } else {
      MatchResult.Draw
    }
  }
}

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