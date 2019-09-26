import React from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import { Loader, RefreshControl } from '~/UI'
import { View, Colors, Typography, Spacing } from '~/newUI'
import R from 'ramda'
import withNeighborhoodSimilarity from '~/utils/withNeighborhoodSimilarity'
import resolveLink from '~/services/resolveLink'
import NotificationItem from '../../components/NotificationItem'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import { NotificationListProps } from '../../types'
import { Notice } from '~/store/notices/types'

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20
  },
  container: {
    flexGrow: 1,
    paddingTop: Spacing.s8,
    paddingHorizontal: Spacing.s6,
    backgroundColor: Colors.white,
    alignItems: 'center'
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    flex: 1,
    backgroundColor: 'white'
  },
  backRightBtn: {
    top: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 160,
    backgroundColor: Colors.secondary,
  },
  trash: {
    height: 25,
    width: 25
  }
})

const sortByCreatedAt = R.sort(R.comparator((a, b) => a.createdAt > b.createdAt))
const withNeighboringCategories = withNeighborhoodSimilarity((notice, noticeNeighbor) =>
  noticeNeighbor.category === notice.category && noticeNeighbor.highlightColor === notice.highlightColor
)

export default class NotificationList extends React.PureComponent<NotificationListProps> {
  state = {
    listType: 'FlatList'
  }

  componentDidMount () {
    const { fetchNoticesByStatus, status } = this.props
    if(status === 'total'){
      fetchNoticesByStatus(status, true)
    }
  }

  onPressNotice = (_id) => {
    const { notices, registerView, status, screenProps } = this.props
    const notice = notices.filter(n => n._id === _id)[0]
    const { link } = notice
    
    if(!notice.viewedAt){
      registerView(_id, status)
    }

    if (link) {
      resolveLink(screenProps.navigation, link)
    }
  }

  onEndReached = () => {
    const { endReached, fetchNoticesByStatus, status, loading } = this.props
    !endReached && fetchNoticesByStatus(status)
  }

  renderItem = (rowData, rowMap) => {
    const { allNoticesRead } = this.props
    const item = rowData.item
    return (
      <SwipeRow
        disableRightSwipe
        disableLeftSwipe={!!item.viewedAt || allNoticesRead}
        rightOpenValue={-160}
      >
        <View style={styles.rowBack}>
          <TouchableWithoutFeedback onPress={() => this.markNotificationAsRead(rowMap[item._id], item._id)}>
            <View style={styles.backRightBtn}>
              <Typography.T1 color={Colors.white}>Marcar como lido</Typography.T1>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <NotificationItem
          onPress={() => this.onPressNotice(item._id)}
          key={item._id}
          allNoticesRead={allNoticesRead}
          {...item}
        />
      </SwipeRow>
    )
  }

  markNotificationAsRead = (row, notificationId) => {
    const { registerView, status } = this.props
    registerView(notificationId, status)
    row.closeRow()
  }

  onRowDidClose = (rowKey, rowMap) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].swipeInitialX = 0
    }
  }

  render () {
    const { loading, notices, resetting, status, fetchNoticesByStatus } = this.props
    const sortedNotices = sortByCreatedAt(notices)
    const noticesWithNeighboringCategories = sortedNotices.map(withNeighboringCategories)
    const emptyComponent = loading
      ? null
      : (
        <View style={styles.container}>
          <Typography.H6>Você não possui novas notificações</Typography.H6>          
        </View>
      )
    
    return (
      <SwipeListView
        data={noticesWithNeighboringCategories}
        renderItem={this.renderItem}
        refreshControl={(
          <RefreshControl
            refreshing={loading}
            onRefresh={() => fetchNoticesByStatus(status, true)}
          />
        )}
        ListEmptyComponent={emptyComponent}
        keyExtractor={(notice: Notice) => notice._id}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={!resetting && loading && <Loader.Footer style={styles.footer} />}
        onRowDidClose={this.onRowDidClose}
      />
    )
  }
}
