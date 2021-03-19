/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardMetrics
// ====================================================

export interface DashboardMetrics_metrics {
  __typename: "Metrics";
  openProjects: number;
  totalTasks: number;
  inProgressTasks: number;
  notStartedTasks: number;
  closedTasks: number;
}

export interface DashboardMetrics {
  metrics: DashboardMetrics_metrics | null;
}
