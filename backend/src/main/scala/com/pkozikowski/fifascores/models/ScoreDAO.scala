package com.pkozikowski.fifascores.models

import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoURI
import com.novus.salat.dao.SalatDAO
import com.novus.salat.global._
import com.typesafe.config.ConfigFactory

class ScoreDAO extends SalatDAO[Score, ObjectId](collection= MongoConnection(uri = MongoURI(ConfigFactory.load().getString("mongodb.uri")))("fifascores")("scores"))

object ScoreDAO {
  def insert(newScore: NewScoreDTO) = scoreDAO.insert(newScore.toScore)

  val scoreDAO = new ScoreDAO
  def all(): Seq[Score] = scoreDAO.find(MongoDBObject.empty).toList
  def allDtos(): Seq[ScoreDTO] = all().map(s => new ScoreDTO(s))
}