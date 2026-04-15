import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import {
  type StudentDetail,
  type StudentSummary,
  normalizeStudentDetail,
  normalizeStudentSummary,
} from "../types";

export function useStudents() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<StudentSummary[]>({
    queryKey: ["students"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getStudents();
      return result.map(normalizeStudentSummary);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useStudent(id: number | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<StudentDetail | null>({
    queryKey: ["student", id],
    queryFn: async () => {
      if (!actor || id === null) return null;
      const result = await actor.getStudent(BigInt(id));
      return result ? normalizeStudentDetail(result) : null;
    },
    enabled: !!actor && !actorFetching && id !== null,
  });
}

export function useSeedSampleData() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      await actor.seedSampleData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["advisorStats"] });
      queryClient.invalidateQueries({ queryKey: ["riskDistribution"] });
      queryClient.invalidateQueries({ queryKey: ["riskTrend"] });
    },
  });
}
