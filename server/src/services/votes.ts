import Candidate from "../models/candidate";
import User from "../models/user";
import { VoteDto } from "../typs/dto/vote";

export const handleNewVote = async (vote: VoteDto) => {
  try {
    await Candidate.findByIdAndUpdate(vote.candidateId, {
      $inc: {
        votes: 1,
      },
    });
    await User.findByIdAndUpdate(vote.userId, {
      $set: {
        hasVoted: true,
        votedFor: vote.candidateId,
      },
    });

    return {
      status: "DONE",
    };
  } catch (err) {
    return {
      status: "ERROR",
      err: err as Error,
    };
  }
};
