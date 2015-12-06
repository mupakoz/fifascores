package com.pkozikowski.fifascores.models

import akka.http.scaladsl.marshalling.ToResponseMarshallable
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoURI
import com.novus.salat.dao.SalatDAO
import com.novus.salat.global._
import com.typesafe.config.ConfigFactory



class ScoreDAO extends SalatDAO[Score, ObjectId](collection = DBUtils.db("scores"))

object ScoreDAO {


  val scoreDAO = new ScoreDAO

  def getTeams(): Seq[String] = {
    val homeTeams = scoreDAO.primitiveProjections[String](MongoDBObject.empty, "homeTeamScore.team")
    val guestTeams = scoreDAO.primitiveProjections[String](MongoDBObject.empty, "guestTeamScore.team")
    (homeTeams ++ guestTeams).distinct
  }

  def insert(newScore: NewScoreDTO) = scoreDAO.insert(newScore.toScore)

  def all(): Seq[Score] = scoreDAO.find(MongoDBObject.empty).toList
  def allDtos(): Seq[ScoreDTO] = all().map(s => new ScoreDTO(s))
  def delete(id: String) = scoreDAO.removeById(new ObjectId(id))
}