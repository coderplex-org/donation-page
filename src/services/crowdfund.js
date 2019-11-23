export function fetchRecords(table, slug) {
  return fetch(`/api/${table}${slug ? `?slug=${slug}` : ''}`, {
    method: 'GET',
  }).then(res => res.json());
}

export function insertRecord(table, slug, data) {
  return fetch(`/api/${table}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ ...data, campaign_slug: slug }),
  }).then(res => res.json());
}
