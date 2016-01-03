package com.pkozikowski.fifascores.models


class ProfileChartBuilder {
  val chartPoints: Seq[ProfileChartPointDTO] = Seq()

  def build(scores: Seq[Score], nickname: String): Seq[ProfileChartPointDTO] = {
    scores
      .sortBy(s => s.date)
      .foldLeft(Seq(): Seq[ProfileChartPointDTO])((previous, score) =>
        previous :+ ProfileChartPointDTO(score.date,
          previous.lastOption.getOrElse(ProfileChartPointDTO.empty).points + score.getPlayerScore(nickname))
      )
  }
}
