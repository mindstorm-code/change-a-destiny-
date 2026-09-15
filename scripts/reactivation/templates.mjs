// Real copy for the two SMS touchpoints in playbook/reactivation-plan.md's
// 14-day sequence. Mirrors playbook/sms-templates.md — edit both together.

export function render(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) {
      throw new Error(`Missing template variable "${key}"`);
    }
    return vars[key];
  });
}

export const SMS_DAY8 =
  "Hi {{first_name}}, it's Judah Becker. Saw you checked out the Path " +
  "Assessment — any questions I can answer? {{assessment_link}}\n" +
  "Reply STOP to opt out.";

export const SMS_DAY11 =
  "Hi {{first_name}}, the Founding Cohort closes {{close_date}} — " +
  "{{seats_remaining}} seats left. Details: {{cohort_link}}\n" +
  "Reply STOP to opt out.";

export const TOUCHPOINTS = {
  day8: { template: SMS_DAY8, requiredVars: ["first_name", "assessment_link"] },
  day11: {
    template: SMS_DAY11,
    requiredVars: ["first_name", "close_date", "seats_remaining", "cohort_link"],
  },
};
