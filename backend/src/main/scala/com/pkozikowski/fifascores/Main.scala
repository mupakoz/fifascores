package com.pkozikowski.fifascores

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import com.pkozikowski.fifascores.models._
import com.typesafe.config.ConfigFactory
import spray.json._

case class HelloObject(hello: String)

trait Protocols extends DefaultJsonProtocol {
  implicit val ipInfoFormat = jsonFormat1(HelloObject)
  implicit val newScoreDTOFormat = jsonFormat6(NewScoreDTO)
  implicit val teamScoreFormat = jsonFormat3(TeamScore)
  implicit val scoreFormat = jsonFormat3(ScoreDTO)
  implicit val playerFormat = jsonFormat2(PlayerDTO)
  implicit val newPlayerFormat = jsonFormat1(NewPlayerDTO)
}

object Main extends App with Protocols {
  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()

  val route = pathPrefix("api") {
    path("hello") {
      get {
        complete {
          HelloObject("API Test message")
        }
      }
    } ~
      pathPrefix("scores") {
        path("add") {
          (post & entity(as[NewScoreDTO])) { newScore =>
            ScoreDAO.insert(newScore)
            complete(201, "OK")
          }
        } ~
          get {
            complete {
              ScoreDAO.allDtos()
            }
          }
      } ~
      pathPrefix("players") {
        get {
          complete {
            PlayerDAO.allDtos()
          }
        } ~
        post {
          entity(as[NewPlayerDTO]) { newPlayer =>
            PlayerDAO.insert(newPlayer)
            complete(201, "OK")
          }
        }
      }
  } ~
    getFromResourceDirectory("webapp") ~
    path("") {
      getFromResource("webapp/index.html")
    }

  lazy val serverHost: String = ConfigFactory.load().getString("server.host")
  lazy val serverPort: Int = ConfigFactory.load().getInt("server.port")
  lazy val mongoUri: String = ConfigFactory.load().getString("mongodb.uri")

  val bindingFuture = Http().bindAndHandle(route, serverHost, serverPort)


  println(s"Database at: " + mongoUri)
  println(s"Server online at http://$serverHost:$serverPort/\nPress RETURN to stop...")
}