package com.pkozikowski.fifascores

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import com.typesafe.config.ConfigFactory
import spray.json._

case class HelloObject(hello: String)

trait Protocols extends DefaultJsonProtocol {
  implicit val ipInfoFormat = jsonFormat1(HelloObject)
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
    }
  } ~
    getFromResourceDirectory("webapp") ~
    path("") {
      getFromResource("webapp/index.html")
    }

  lazy val serverHost: String = ConfigFactory.load().getString("server.host")
  lazy val serverPort: Int = ConfigFactory.load().getInt("server.port")

  val bindingFuture = Http().bindAndHandle(route, serverHost, serverPort)

  println(s"Server online at http://$serverHost:$serverPort/\nPress RETURN to stop...")
}