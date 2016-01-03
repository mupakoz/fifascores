package com.pkozikowski.fifascores.models

case class ProfileDTO(
                       pointsTable: Seq[ProfileChartPointDTO],
                       mostFrequentPartner: PartnerDataDTO,
                        bestPartner: PartnerDataDTO,
                        worstPartner: PartnerDataDTO,
                        mostFrequentTeam: TeamDataDTO,
                        bestTeam: TeamDataDTO,
                        worstTeam: TeamDataDTO
)

object ProfileChartPointDTO {
  def empty = ProfileChartPointDTO("", 0)
}

case class PartnerDataDTO(nickname: String, times: Int, pointsPerGame: Double)

object TeamDataDTO {
  val empty = TeamDataDTO("", 0, 0)
}

case class TeamDataDTO(teamName: String, times: Int, pointsPerGame: Double)

case class ProfileChartPointDTO(date: String, points: Int)
