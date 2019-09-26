import status from '~/constants/accountStatuses'

export const isAnalysisStatus = receivedStatus => [status.fraudAnalysis, status.fraudSuspect, status.pendingBackOffice].includes(receivedStatus)
