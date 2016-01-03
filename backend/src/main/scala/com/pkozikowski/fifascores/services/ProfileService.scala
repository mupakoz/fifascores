package com.pkozikowski.fifascores.services

import com.pkozikowski.fifascores.models.{ProfileChartBuilder, ScoreDAO, ProfileDTO, ProfileChartPointDTO}

object ProfileService {
  def getProfile(nickname: String): ProfileDTO = {
    val scores = ScoreDAO.getScoresForPlayer(nickname);
    val chartBuilder = new ProfileChartBuilder()
    ProfileDTO(chartBuilder.build(scores, nickname))
  }
}
