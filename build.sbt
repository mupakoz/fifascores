import java.text.SimpleDateFormat
import java.util.Date

import sbt._
import Keys._

name := "fifascores"

scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

lazy val libraries = {
  val akkaStreamV = "1.0"
  val scalaTestV  = "2.2.5"
  val salatV = "1.9.9"
  Seq(
    "com.typesafe.akka" %% "akka-stream-experimental"             % akkaStreamV,
    "com.typesafe.akka" %% "akka-http-core-experimental"          % akkaStreamV,
    "com.typesafe.akka" %% "akka-http-experimental"               % akkaStreamV,
    "com.typesafe.akka" %% "akka-http-spray-json-experimental"    % akkaStreamV,
    "org.scalatest"     %% "scalatest"                            % scalaTestV % "test",
    "com.novus"         %% "salat"                                % salatV
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

def gulpTask(taskName: String) = (baseDirectory, streams) map { (bd, s) =>
  val localGulpCommand =  (bd / ".." / "frontend" / "node_modules" / ".bin" / "gulp.cmd").toString() + " " + taskName
  def buildGulp() = {
    Process(localGulpCommand, bd / ".." / "frontend").!
  }
  println("Building with Gulp.js : " + taskName)
  haltOnCmdResultError(buildGulp())
}

lazy val rootProject = (project in file("."))
  .settings(commonSettings: _*)
  .aggregate(backend)

lazy val backend: Project = (project in file("backend"))
  .settings(commonSettings)
  .settings(Revolver.settings)
  .settings(DeployToHeroku.settings)
  .settings(
    libraryDependencies ++= libraries,
    unmanagedResourceDirectories in Compile := {
      (unmanagedResourceDirectories in Compile).value ++ List(baseDirectory.value.getParentFile / frontend.base.getName / "dist")
    },
    assemblyJarName in assembly := "fifascores.jar",
    assembly <<= assembly dependsOn gulpTask("build")
  )

lazy val frontend = (project in file("frontend"))
  .settings(commonSettings: _*)

Revolver.settings