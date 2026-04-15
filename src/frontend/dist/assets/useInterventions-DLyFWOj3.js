import { c as createLucideIcon } from "./users-CS3ehMd_.js";
import { k as useQueryClient } from "./index-C9bX-I14.js";
import { e as useActor, f as useQuery, g as useMutation, n as normalizeIntervention, h as createActor, i as normalizeAdvisorStats, j as normalizeRiskDistribution, k as normalizeTrendPoint } from "./useStudents-BhSw-i5u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function useInterventions() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["interventions"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getInterventions();
      return result.map(normalizeIntervention);
    },
    enabled: !!actor && !actorFetching
  });
}
function useStudentInterventions(studentId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["interventions", "student", studentId],
    queryFn: async () => {
      if (!actor || studentId === null) return [];
      const result = await actor.getStudentInterventions(BigInt(studentId));
      return result.map(normalizeIntervention);
    },
    enabled: !!actor && !actorFetching && studentId !== null
  });
}
function useCreateIntervention() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createIntervention(payload);
      return normalizeIntervention(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interventions"] });
      queryClient.invalidateQueries({ queryKey: ["advisorStats"] });
    }
  });
}
function useUpdateIntervention() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      update
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updateIntervention(BigInt(id), update);
      return result ? normalizeIntervention(result) : null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interventions"] });
      queryClient.invalidateQueries({ queryKey: ["advisorStats"] });
    }
  });
}
function useAdvisorStats() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["advisorStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.getAdvisorStats();
      return normalizeAdvisorStats(result);
    },
    enabled: !!actor && !actorFetching
  });
}
function useRiskDistribution() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["riskDistribution"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.getRiskDistribution();
      return normalizeRiskDistribution(result);
    },
    enabled: !!actor && !actorFetching
  });
}
function useRiskTrend() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["riskTrend"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getRiskTrend();
      return result.map(normalizeTrendPoint);
    },
    enabled: !!actor && !actorFetching
  });
}
export {
  CircleCheck as C,
  useRiskDistribution as a,
  useRiskTrend as b,
  useStudentInterventions as c,
  useCreateIntervention as d,
  useInterventions as e,
  useUpdateIntervention as f,
  useAdvisorStats as u
};
