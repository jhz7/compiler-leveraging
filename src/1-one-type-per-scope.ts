// 1. One type per scope

// export class Visit {
//   constructor(
//     public readonly id: number,
//     public readonly tenantId: string,
//     public readonly estateId: string,
//     public readonly visitDate: Date
//   ) {}
// }

// const tenantId = 'tenantId';
// const estateId = 'estateId';

// const visit = new Visit(10, tenantId, estateId, new Date());
// const malFormedVisit = new Visit(10, estateId, tenantId, new Date());

// console.log('visit', visit);
// console.log('\n');
// console.log('malFormedVisit', malFormedVisit);

//##############################################################################

class TenantId {
  public readonly _tag = 'TenantId';

  constructor(public id: string) {}
}

class EstateId {
  public readonly _tag = 'EstateId';

  constructor(public readonly id: string) {}
}

export class Visit {
  constructor(
    public readonly id: number,
    public readonly tenantId: TenantId,
    public readonly estateId: EstateId,
    public readonly visitDate: Date
  ) {}
}

const tenantId = new TenantId('tenantId');
const estateId = new EstateId('estateId');

const visit = new Visit(10, tenantId, estateId, new Date());
// const malFormedVisit = new Visit(10, estateId, tenantId, new Date());

console.log('visit', visit);
console.log('\n');
// console.log('malFormedVisit', malFormedVisit);
