package com.pkozikowski.fifascores.models

case class ProfileDTO(pointsTable: Seq[ProfileChartPointDTO])

object ProfileChartPointDTO {
  def empty = ProfileChartPointDTO("", 0)
}

case class ProfileChartPointDTO(date: String, points: Int)
