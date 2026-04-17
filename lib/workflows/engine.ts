export type WorkflowEvent = {
  name: string;
  payload: Record<string, unknown>;
};

export type WorkflowRule = {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
};

export function evaluateWorkflow(event: WorkflowEvent, rules: WorkflowRule[]) {
  return rules.filter((rule) => rule.active && event.name.toLowerCase().includes(rule.trigger.toLowerCase().split(" ")[0]));
}
