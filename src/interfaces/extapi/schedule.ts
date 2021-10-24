export type ScheduleStore = {
  taskId: number | null,
  taskName: string | null,
  detail: string | null,
  startAt: Date | null,
  importance: number | null
  toBeDone: Date | null,
  doneAt: Date | null,
}