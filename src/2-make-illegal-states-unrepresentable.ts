// 2. Make illegal states unrepresentable

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

// export class Visit {
//   constructor(
//     public readonly id: number,
//     public readonly tenantId: TenantId,
//     public readonly estateId: EstateId,
//     public readonly visitDate: Date,
//     public readonly status: VisitStatus,
//     public readonly cancelationReason: string | undefined,
//     public readonly confirmedDemonstratorAgentId: number | undefined
//   ) {}
// }

// // all invalid visit instances
// const cancelledVisitWithoutReason = new Visit(
//   10,
//   tenantId,
//   estateId,
//   new Date(),
//   VisitStatus.CANCELLED,
//   undefined,
//   undefined
// );

// const cancelledVisitWithConfirmedAgent = new Visit(
//   10,
//   tenantId,
//   estateId,
//   new Date(),
//   VisitStatus.CANCELLED,
//   undefined,
//   100
// );

// const confirmedVisitWithoutConfirmedAgent = new Visit(
//   10,
//   tenantId,
//   estateId,
//   new Date(),
//   VisitStatus.CONFIRMED,
//   undefined,
//   undefined
// );

// const confirmedVisitWithCancelationReason = new Visit(
//   10,
//   tenantId,
//   estateId,
//   new Date(),
//   VisitStatus.CONFIRMED,
//   'Any cancelation reason',
//   100
// );

// /// etc...

// console.log('cancelledVisitWithoutReason', cancelledVisitWithoutReason);
// console.log(
//   'cancelledVisitWithConfirmedAgent',
//   cancelledVisitWithConfirmedAgent
// );
// console.log(
//   'confirmedVisitWithoutConfirmedAgent',
//   confirmedVisitWithoutConfirmedAgent
// );
// console.log(
//   'confirmedVisitWithCancelationReason',
//   confirmedVisitWithCancelationReason
// );

//###########################################################################

export class Visit {
  constructor(
    public readonly id: number,
    public readonly tenantId: TenantId,
    public readonly estateId: EstateId,
    public readonly visitDate: Date,
    public readonly stage: VisitStage
  ) {}
}

type VisitStage =
  | VisitCancalled
  | VisitConfirmed
  | VisitCompleted
  | VisitScheduled;

class VisitCancalled {
  public readonly status = VisitStatus.CANCELLED;

  constructor(public readonly reason: string) {}
}

class VisitConfirmed {
  public readonly status = VisitStatus.CONFIRMED;

  constructor(public readonly demonstratorAgentId: number) {}
}

class VisitScheduled {
  public readonly status = VisitStatus.SCHEDULED;
}

class VisitCompleted {
  public readonly status = VisitStatus.COMPLETED;
}

const visitConfirmed = new Visit(
  1,
  tenantId,
  estateId,
  new Date(),
  new VisitConfirmed(1)
);

console.log('visitConfirmed', visitConfirmed);
