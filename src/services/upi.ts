export async function saveUPIStatus(data: object) {
  return fetch(`/api/upi-status`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}
