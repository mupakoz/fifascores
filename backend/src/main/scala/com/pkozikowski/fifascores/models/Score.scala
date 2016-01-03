package com.pkozikowski.fifascores.models

import com.mongodb.casbah.Imports.ObjectId
import com.pkozikowski.fifascores.models.MatchResult.MatchResult

object MatchResult extends Enumeration {
  type MatchResult = Value
  val HomeTeamWon, GuestTeamWon, Draw = Value
}

object PlayerType extends Enumeration {
  type PlayerType = Value
  val Home, Guest = Value
}

object TeamScoreHelpers {
  def singlePlayerExtractor = (teamScore: TeamScore) => teamScore.players

  def pairExtractor = (teamScore: TeamScore) => if (teamScore.players.length > 1)
    Seq(teamScore.players.sorted.mkString(", "))
  else
    Seq()

  def coPlayerExtractor(nickname:String) = (teamScore: TeamScore) => if (teamScore.players.contains(nickname)) {
    teamScore.players.filterNot(p => p == nickname)
  } else {
    Seq()
  }
}

case class TeamScore(
                      players: Seq[String],
                      team: String,
                      score: Int)

object ScoreHelpers {

  import com.github.nscala_time.time.Imports._

  def allTrueFilter = (score: Score) => true

  def thisMonthFilter = (score: Score) =>
    DateTime.parse(score.date).getMonthOfYear == DateTime.now().getMonthOfYear &&
      DateTime.parse(score.date).getYear == DateTime.now().getYear
}

case class Score(
                  _id: ObjectId = new ObjectId,
                  date: String,
                  homeTeamScore: TeamScore,
                  guestTeamScore: TeamScore) {
  def getPlayerScore(nickname: String): Int = {
    if (homeTeamScore.players.contains(nickname) && result == MatchResult.HomeTeamWon ||
    guestTeamScore.players.contains(nickname) && result == MatchResult.GuestTeamWon) {
      3
    } else if (result == MatchResult.Draw) {
      1
    } else {
      0
    }
  }

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