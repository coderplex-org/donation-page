export function fetchRecords(table, slug) {
  return fetch(`/api/${table}${slug ? `?slug=${slug}` : ''}`, {
    method: 'GET',
  }).then(res => res.json());
}
