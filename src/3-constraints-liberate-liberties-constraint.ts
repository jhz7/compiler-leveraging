// 3. Constraints liberate, liberties onstraint

class TenantId {
  public readonly _tag = 'TenantId';

  constructor(public id: string) {}
}

class EstateId {
  public readonly _tag = 'EstateId';

  constructor(public readonly id: string) {}
}

const tenantId = new TenantId('tenantId');
const estateId = new EstateId('estateId');

enum VisitStatus {
  SCHEDULED = 'SCHEDULED',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
}

type VisitStage =
  | VisitCancalled
  | VisitConfirmed
  | VisitScheduled
  | VisitCompleted;

class VisitScheduled {
  public readonly status = VisitStatus.SCHEDULED;
}

class VisitCancalled {
  public readonly status = VisitStatus.CANCELLED;

  constructor(public readonly reason: string) {}
}

class VisitConfirmed {
  public readonly status = VisitStatus.CONFIRMED;

  constructor(public readonly demonstratorAgentId: number) {}
}

class VisitCompleted {
  public readonly status = VisitStatus.COMPLETED;
}

// export class Visit {
//   constructor(
//     public readonly id: number,
//     public readonly tenantId: TenantId,
//     public readonly estateId: EstateId,
//     public readonly visitDate: Date,
//     public readonly stage: VisitStage
//   ) {}
// }

// const VisitM = {
//   cancel: (visit: Visit, reason: string): Visit => {
//     if (VisitStatus.SCHEDULED === visit.stage.status)
//       return {
//         ...visit,
//         stage: new VisitCancalled(reason),
//       };

//     throw new Error('Visit cannot be cancelled');
//   },

//   confirm: (visit: Visit, demonstratorAgentId: number): Visit => {
//     if (VisitStatus.SCHEDULED === visit.stage.status)
//       return {
//         ...visit,
//         stage: new VisitConfirmed(demonstratorAgentId),
//       };

//     throw new Error('Visit cannot be confirmed');
//   },

//   complete: (visit: Visit): Visit => {
//     if (VisitStatus.CONFIRMED === visit.stage.status)
//       return {
//         ...visit,
//         stage: new VisitCompleted(),
//       };

//     throw new Error('Visit cannot be completed');
//   },
// };

// const cancelledVisit = new Visit(
//   1,
//   tenantId,
//   estateId,
//   new Date(),
//   new VisitCancalled('reason')
// );

// const confirmedVisit = VisitM.confirm(cancelledVisit, 1); // Runtime error

//##############################################################################

export class Visit<U> {
  constructor(
    public readonly id: number,
    public readonly tenantId: TenantId,
    public readonly estateId: EstateId,
    public readonly visitDate: Date,
    public readonly stage: U
  ) {}
}

const VisitM = {
  cancel: (
    visit: Visit<VisitScheduled | VisitConfirmed>,
    reason: string
  ): Visit<VisitCancalled> => ({
    ...visit,
    stage: new VisitCancalled(reason),
  }),

  confirm: (
    visit: Visit<VisitScheduled>,
    demonstratorAgentId: number
  ): Visit<VisitConfirmed> => ({
    ...visit,
    stage: new VisitConfirmed(demonstratorAgentId),
  }),

  complete: (visit: Visit<VisitConfirmed>): Visit<VisitCompleted> => ({
    ...visit,
    stage: new VisitCompleted(),
  }),
};

const visitConfirmed = new Visit(
  1,
  tenantId,
  estateId,
  new Date(),
  new VisitConfirmed(1)
);

// VisitM.confirm(visitConfirmed, 22); // Compilation error
