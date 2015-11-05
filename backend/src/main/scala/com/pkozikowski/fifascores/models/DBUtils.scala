package com.pkozikowski.fifascores.models

import com.mongodb.casbah.Imports._
import com.typesafe.config.ConfigFactory

object DBUtils {
  lazy val db = MongoClient(MongoClientURI(ConfigFactory.load().getString("mongodb.uri")))("heroku_q44s29r9")
}
