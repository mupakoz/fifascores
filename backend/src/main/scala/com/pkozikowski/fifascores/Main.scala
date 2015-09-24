package com.pkozikowski.fifascores

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.marshalling.ToResponseMarshallable
import spray.json.DefaultJsonProtocol._
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
  }

  val bindingFuture = Http().bindAndHandle(route, "localhost", 8080)

  println(s"Server online at http://localhost:8080/\nPress RETURN to stop...")
}