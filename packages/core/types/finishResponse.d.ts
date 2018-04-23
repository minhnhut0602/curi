import { Interactions } from "./types/interaction";
import { Response, Resolved } from "./types/response";
import { Match } from "./types/match";
export default function finishResponse(match: Match, interactions: Interactions, resolved: Resolved | null): Response;