import isNaN from 'lodash/isNaN';
import round from 'lodash/round';

export function calcPercentage(count) {
  let rejected = ( count.rejected / count.total ) * 100;
  rejected = isNaN(rejected) || rejected < 0 ? 0 : rejected;
  rejected = round(rejected, 0);
  rejected = `${rejected}%`;
  let verified = ( count.verified / count.total ) * 100;
  verified = isNaN(verified) || verified < 0 ? 0 : verified;
  verified = round(verified, 0);
  verified = `${verified}%`;
  let pending = count.total - (count.verified + count.rejected);
  pending = ( pending / count.total ) * 100;
  pending = isNaN(pending) || pending < 0 ? 0 : pending;
  pending = round(pending, 0);
  pending = `${pending}%`;
  return {
    rejected: rejected,
    verified: verified,
    pending: pending
  };
}
