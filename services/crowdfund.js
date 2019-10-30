export function fetchRecords(table, slug) {
  return fetch(`/api/${table}${slug ? `?slug=${slug}` : ''}`, {
    method: 'GET',
  }).then(res => res.json());
}

export function insertRecord(table, slug, data) {
  return fetch(`/api/${table}`, {
    method: 'POST',
    body: JSON.stringify({ ...data, slug: slug }),
  }).then(res => res.json());
}
