export function getTimeZone() {
  if (typeof Intl === 'undefined') {
    return 'Etc/UTC'
  }
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}
