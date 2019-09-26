export const getNoticesState = (state) => state.notices

export const getBanner = (state, key) => getNoticesState(state).banner

export const getNotices = (state, key) => getNoticesState(state)[key].notices

export const getPage = (state, key) => getNoticesState(state)[key].page

export const getEndReached = (state, key) => getNoticesState(state)[key].endReached

export const getQtyNoticesNotRead = (state) => getNoticesState(state).count.notRead

export const getQtyNoticesRead = (state) => getNoticesState(state).count.read

export const getTotalQtyNotices = (state) => getNoticesState(state).count.total

export const getNoticesList = (state, key) => {
  const notices = getNotices(state, key)
  const noticesList = Object.values(notices)
  return noticesList
}

export const getAllNoticesRead = (state) => getNoticesState(state).allNoticesRead

export const getNoticesCount = (state) => getNoticesState(state).count

export const getLoading = (state) => getNoticesState(state).loading

export const getResetting = (state) => getNoticesState(state).resetting

export const getById = (state, key) => (_id) => getNotices(state, key)[_id]
