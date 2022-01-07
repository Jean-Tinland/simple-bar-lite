export const get = async () => {
  const [bareArchitecture, bareSystem] = await Promise.all([Uebersicht.run('uname -a'), Uebersicht.run('uname -m')])
  const architecture = cleanupOutput(bareArchitecture)
  const system = cleanupOutput(bareSystem)
  if (system.startsWith('arm64') || (system.startsWith('x86_64') && architecture.includes('ARM64'))) {
    return 'arm64'
  }
  return 'x86_64'
}
