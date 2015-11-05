package com.pkozikowski.fifascores.models

import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoURI
import com.novus.salat.dao.SalatDAO
import com.typesafe.config.ConfigFactory
import com.novus.salat.global._

class PlayerDAO extends SalatDAO[Player, ObjectId](collection = DBUtils.db("players"))

object PlayerDAO {
  val playerDAO = new PlayerDAO
  
  def insert(newPlayer: NewPlayerDTO) = playerDAO.insert(newPlayer.toPlayer)
  def allDtos(): Seq[PlayerDTO] = playerDAO.find(MongoDBObject.empty).map(s => new PlayerDTO(s)).toSeq
}
