import java.text.SimpleDateFormat
import java.util.Date

import sbt._
import Keys._

name := "fifascores"

scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

lazy val libraries = {
  val akkaStreamV = "1.0"
  val scalaTestV  = "2.2.5"
  Seq(
    "com.typesafe.akka" %% "akka-stream-experimental"             % akkaStreamV,
    "com.typesafe.akka" %% "akka-http-core-experimental"          % akkaStreamV,
    "com.typesafe.akka" %% "akka-http-experimental"               % akkaStreamV,
    "com.typesafe.akka" %% "akka-http-spray-json-experimental"    % akkaStreamV,
    "org.scalatest"     %% "scalatest"                            % scalaTestV % "test"
  )
}

// factor out common settings into a sequence
lazy val commonSettings = Seq(
  organization := "com.pkozikowski",
  version := "0.0.1",
  scalaVersion := "2.11.7",
  scalacOptions ++= Seq("-unchecked", "-deprecation")
)

def haltOnCmdResultError(result: Int) {
  if (result != 0) {
    throw new Exception("Build failed.")
  }
}

lazy val rootProject = (project in file("."))
  .settings(commonSettings: _*)
  .aggregate(backend)

lazy val backend: Project = (project in file("backend"))
  .settings(commonSettings)
  .settings(Revolver.settings)
  .settings(
    libraryDependencies ++= libraries
  )

Revolver.settings