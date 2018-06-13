import _ from 'lodash';
import currency from 'currency.js';
import numeral from 'numeral';

const defaultPercentages = [
  0.15, 0.18, 0.20
];
const roundUp = true;
const roundDown = true;


function calculateTipAmounts(subtotal) {
  const defaultTotals = defaultPercentages.map(p => subtotal * (1 + p));
  const roundedTotals = _.flatMap(defaultTotals, total =>
    [
      roundUp   ? Math.ceil(total) : null,
      roundDown ? Math.floor(total) : null,
    ].filter(v => v) // remove nulls
  );

  const totals = _([...defaultTotals, ...roundedTotals])
    .filter(total => total > subtotal)
    .sort()
    .sortedUniq()
    .value();

  return totals.map(total => ({
    total,
    tipTotal: total - subtotal,
    tipPercent: (total - subtotal) / subtotal,
  }));
}


function formatPercent(value) {
  return numeral(value).format('0.00 %');
}

function formatCurrency(value) {
  return currency(value).format(true);
}

export function getFormattedTips(subtotal) {
  return calculateTipAmounts(subtotal).map(({total, tipTotal, tipPercent}) => ({
    total: formatCurrency(total),
    tipTotal: formatCurrency(tipTotal),
    tipPercent: formatPercent(tipPercent),
  }));
}

