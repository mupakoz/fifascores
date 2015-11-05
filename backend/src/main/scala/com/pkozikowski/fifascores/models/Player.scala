package com.pkozikowski.fifascores.models

import com.mongodb.casbah.Imports._

case class Player(_id: ObjectId = new ObjectId, nickname: String, status: String)

case class PlayerDTO(id: String, nickname: String) {
  def this(p: Player) = this(p._id.toString, p.nickname)
}

case class NewPlayerDTO(nickname: String) {
  def toPlayer: Player = Player(nickname = nickname, status = "ACTIVE")
}