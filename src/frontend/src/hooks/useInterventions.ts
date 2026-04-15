import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InterventionCreate, InterventionUpdate } from "../backend";
import { createActor } from "../backend";
import {
  type AdvisorStats,
  type Intervention,
  type RiskDistribution,
  type TrendPoint,
  normalizeAdvisorStats,
  normalizeIntervention,
  normalizeRiskDistribution,
  normalizeTrendPoint,
} from "../types";

export function useInterventions() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Intervention[]>({
    queryKey: ["interventions"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getInterventions();
      return result.map(normalizeIntervention);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useStudentInterventions(studentId: number | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Intervention[]>({
    queryKey: ["interventions", "student", studentId],
    queryFn: async () => {
      if (!actor || studentId === null) return [];
      const result = await actor.getStudentInterventions(BigInt(studentId));
      return result.map(normalizeIntervention);
    },
    enabled: !!actor && !actorFetching && studentId !== null,
  });
}

export function useCreateIntervention() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: InterventionCreate) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createIntervention(payload);
      return normalizeIntervention(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interventions"] });
      queryClient.invalidateQueries({ queryKey: ["advisorStats"] });
    },
  });
}

export function useUpdateIntervention() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      update,
    }: {
      id: number;
      update: InterventionUpdate;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updateIntervention(BigInt(id), update);
      return result ? normalizeIntervention(result) : null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interventions"] });
      queryClient.invalidateQueries({ queryKey: ["advisorStats"] });
    },
  });
}

export function useAdvisorStats() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<AdvisorStats>({
    queryKey: ["advisorStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.getAdvisorStats();
      return normalizeAdvisorStats(result);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useRiskDistribution() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<RiskDistribution>({
    queryKey: ["riskDistribution"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.getRiskDistribution();
      return normalizeRiskDistribution(result);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useRiskTrend() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<TrendPoint[]>({
    queryKey: ["riskTrend"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getRiskTrend();
      return result.map(normalizeTrendPoint);
    },
    enabled: !!actor && !actorFetching,
  });
}
