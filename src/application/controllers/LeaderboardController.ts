import { Get, JsonController, QueryParams } from "routing-controllers";
import { Inject } from "typedi";
import { LeaderboardQuery, LeaderboardResponse } from "../types";
import { GetLeaderboard } from "../use-cases/GetLeaderboard";

@JsonController("/api/leaderboard")
export class LeaderboradController {
	@Inject()
	private getLeaderboard: GetLeaderboard;

	@Get("/")
	public async getLeaderboardAction(
		@QueryParams() query?: LeaderboardQuery
	): Promise<LeaderboardResponse> {
		return this.getLeaderboard.execute(query);
	}
}
